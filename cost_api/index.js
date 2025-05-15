// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.URL,
  process.env.KEY
);

const app = express();
app.use(express.json());

// http://localhost:3000/api/cost-saving?course=ENG201
app.get('/api/cost-saving', async (req, res) => {
    const fullResp = await supabase
    .from('testing')
    .select();
  console.log('Supabase response:', JSON.stringify(fullResp, null, 2));
  return res.status(200).json(fullResp.data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
