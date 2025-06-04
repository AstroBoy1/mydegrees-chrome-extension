// app.js
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import express from 'express';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.URL,
  process.env.KEY
);

const app = express();
app.use(express.json());
app.use(cors());

// e.g., GET http://localhost:3000/api/cost-saving?department=general
// https://mydegrees-chrome-extension.onrender.com/api/cost-saving?department=general
app.get('/api/cost-saving', async (req, res) => {
  // Returns the cost-saving data for the specified department
    const department = req.query.department;

    const fullResp = await supabase
    .from('testing')
    .select()
    .eq('department', department);
  console.log('Supabase response:', JSON.stringify(fullResp, null, 2));
  return res.status(200).json(fullResp.data);
});

const PORT = process.env.PORT || 3000;
const publicUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`Server running on ${publicUrl}`);
});
