// pages/api/buffett-scores.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: postgresql://neondb_owner:npg_BA2xWJemNa6k@ep-red-resonance-ag335bym-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = `
      SELECT 
        e.symbole,
        e.nom,
        e.secteur,
        a.roe,
        a.roic,
        a."debtToEquity" as debt_to_equity,
        a."netMargin" as net_margin,
        CASE 
          WHEN a.roe > 15 AND a.roic > 12 AND a."debtToEquity" < 2 
               AND a."netMargin" > 8 THEN '⭐ ELITE'
          WHEN a.roe > 10 AND a.roic > 8 AND a."debtToEquity" < 3 
               AND a."netMargin" > 5 THEN '✅ STRONG'  
          WHEN a.roe > 5 AND a.roic > 5 AND a."debtToEquity" < 5 
               AND a."netMargin" > 0 THEN '🟡 DECENT'
          ELSE '🔴 WEAK'
        END as buffett_rating
      FROM analyses_buffett a
      JOIN entreprises e ON a.entreprise_id = e.id
      WHERE a.roe > 0 
        AND a.roe BETWEEN 5 AND 50
        AND a.roic BETWEEN 5 AND 40
        AND a."netMargin" BETWEEN 0 AND 40
      ORDER BY 
        a.roe DESC,
        a.roic DESC
      LIMIT 100;
    `;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
