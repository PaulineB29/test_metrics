import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware CORS
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL
const pool = {
  query: async (queryText) => {
    // Cette fonction sera exécutée côté serveur Heroku
    const { Client } = await import('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    try {
      const result = await client.query(queryText);
      return result;
    } finally {
      await client.end();
    }
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Buffett API is running!',
    endpoints: [
      '/api/buffett-scores',
      '/api/cash-flow-momentum',
      '/api/value-trap-detector', 
      '/api/short-risk-detector',
      '/health'
    ]
  });
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

// 1. SCORE BUFFETT
app.get('/api/buffett-scores', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT ON (e.symbole)
        e.symbole,
        e.nom,
        e.secteur,
        a.roe,
        a.roic,
        a."debtToEquity" as debt_to_equity,
        a."netMargin" as net_margin,
        CASE
            WHEN a.roe > 20 AND a.roic > 15 AND a."debtToEquity" < 1.5
                 AND a."netMargin" > 15 THEN '⭐ ELITE'
            WHEN a.roe > 12 AND a.roic > 10 AND a."debtToEquity" < 2
                 AND a."netMargin" > 8 THEN '✅ STRONG'
            WHEN a.roe > 8 AND a.roic > 6 AND a."debtToEquity" < 3
                 AND a."netMargin" > 3 THEN '🟡 DECENT'
            ELSE '🔴 WEAK'
        END as buffett_rating
    FROM analyses_buffett a
    JOIN entreprises e ON a.entreprise_id = e.id
    WHERE a.roe > 0
      AND a.roe BETWEEN 1 AND 500       
      AND a.roic BETWEEN 1 AND 200        
      AND a."netMargin" BETWEEN -10 AND 80  
      AND a."debtToEquity" IS NOT NULL
      AND a."debtToEquity" < 15         
    ORDER BY e.symbole, a.roe DESC, a.roic DESC;

    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CASH FLOW MOMENTUM  
app.get('/api/cash-flow-momentum', async (req, res) => {
  try {
    const query = `
      SELECT 
        e.symbole,
        e.nom,
        e.secteur,
        df.operating_cash_flow,
        df.free_cash_flow,
        df.revenue,
        df.net_income,
        ROUND((df.free_cash_flow / NULLIF(df.revenue, 0))::numeric, 3) as fcf_margin,
        ROUND((df.free_cash_flow / NULLIF(df.market_cap, 0))::numeric, 4) as fcf_yield
      FROM donnees_financieres df
      JOIN entreprises e ON df.entreprise_id = e.id
      WHERE df.free_cash_flow > 0 
        AND df.operating_cash_flow > df.net_income
        AND (df.free_cash_flow / NULLIF(df.revenue, 0)) BETWEEN 0.05 AND 1.0
        AND (df.free_cash_flow / NULLIF(df.market_cap, 0)) BETWEEN 0.01 AND 0.25
        AND df.free_cash_flow < df.revenue * 2
        AND df.market_cap > 100000000
        AND df.revenue > 10000000
      ORDER BY fcf_yield DESC
      LIMIT 50;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. VALUE TRAP DETECTOR
app.get('/api/value-trap-detector', async (req, res) => {
  try {
    const query = `
      SELECT 
        e.symbole,
        e.nom,
        e.secteur,
        a."peRatio" as pe_ratio,
        a."pbRatio" as pb_ratio,
        a."priceToFCF" as price_to_fcf,
        a."evToEbitda",
        a.roe,
        a.roic,
        ROUND(SQRT(22.5 * a."peRatio" * a."pbRatio")::numeric, 2) as graham_multiple,
        CASE 
          WHEN a."peRatio" < 8 AND a."pbRatio" < 1 AND a.roe > 15 AND a.roic > 12 THEN '⭐ ELITE_VALUE'
          WHEN a."peRatio" < 12 AND a."pbRatio" < 1.5 AND a.roe > 12 AND a.roic > 10 THEN '✅ SOLID_VALUE'
          WHEN a."peRatio" < 6 AND a."pbRatio" < 0.8 AND a.roe < 8 THEN '⚠️ VALUE_TRAP'
          WHEN a."peRatio" < 15 AND a."pbRatio" < 2 AND a.roe > 8 THEN '📊 POTENTIAL_VALUE'
          WHEN a."peRatio" < a."pbRatio" * 10 THEN '🎯 DEEP_VALUE'
          ELSE '🚫 SPECULATIVE'
        END as value_grade,
        ROUND(
          (a.roe / NULLIF(a."peRatio", 0.1)) * 
          (1 / NULLIF(GREATEST(a."pbRatio", 0.3), 5)) * 
          CASE WHEN a.roic > a.roe * 0.8 THEN 1.2 ELSE 1 END
        , 2) as value_score
      FROM analyses_buffett a
      JOIN entreprises e ON a.entreprise_id = e.id
      WHERE a."peRatio" BETWEEN 4 AND 25
        AND a."pbRatio" BETWEEN 0.3 AND 3
        AND a.roe > 6
        AND a."priceToFCF" BETWEEN 5 AND 30
        AND a.roic > 5
      ORDER BY value_score DESC, a."peRatio" ASC
      LIMIT 50;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. SHORT RISK DETECTOR
app.get('/api/short-risk-detector', async (req, res) => {
  try {
    const query = `
      SELECT
        e.symbole,
        e.nom,
        e.secteur,
        a."debtToEquity" as debt_to_equity,
        a."interestCoverage" as interest_coverage,
        a."currentRatio" as current_ratio,
        df.net_income,
        df.operating_cash_flow,
        df.revenue,
        CASE
          WHEN a."debtToEquity" > 4 OR (e.secteur = 'Financial Services' AND a."debtToEquity" > 8) THEN '🚨 DANGEROUS_DEBT'
          WHEN a."interestCoverage" < 1 THEN '🔥 INTEREST_CRISIS'
          WHEN a."currentRatio" < 0.8 THEN '💧 LIQUIDITY_PROBLEM'
          WHEN df.net_income < 0 AND df.operating_cash_flow < 0 THEN '💰 BURNING_CASH'
          WHEN a."debtToEquity" > 2 AND a."interestCoverage" < 2 THEN '⚡ DOUBLE_TROUBLE'
          WHEN df.net_income < 0 AND df.revenue < 10000000 THEN '📉 MICRO_CAP_DISTRESS'
          ELSE '👀 WATCH'
        END as short_signal,
        (CASE WHEN a."debtToEquity" > 3 THEN 3 WHEN a."debtToEquity" > 2 THEN 2 ELSE 0 END +
         CASE WHEN a."interestCoverage" < 1 THEN 3 WHEN a."interestCoverage" < 1.5 THEN 2 ELSE 0 END +
         CASE WHEN a."currentRatio" < 0.8 THEN 3 WHEN a."currentRatio" < 1 THEN 2 ELSE 0 END +
         CASE WHEN df.net_income < 0 THEN 2 ELSE 0 END +
         CASE WHEN df.operating_cash_flow < 0 THEN 2 ELSE 0 END) as risk_score
      FROM analyses_buffett a
      JOIN entreprises e ON a.entreprise_id = e.id
      JOIN donnees_financieres df ON a.entreprise_id = df.entreprise_id
        AND df.date = (SELECT MAX(date) FROM donnees_financieres df2 WHERE df2.entreprise_id = a.entreprise_id)
      WHERE (a."debtToEquity" > 2 OR a."interestCoverage" < 1.5 OR a."currentRatio" < 1 OR df.net_income < 0 OR df.operating_cash_flow < 0)
        AND df.market_cap > 50000000
      ORDER BY risk_score DESC, a."debtToEquity" DESC
      LIMIT 100;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
