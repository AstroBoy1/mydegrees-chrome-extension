const express = require('express');

const app     = express();

// (1) Built-in middleware for parsing JSON bodies
app.use(express.json());

const courseCosts = {
    MATH101: { saving: 1000 },
    ENG201:  { saving:  600 },
  };

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// GET /api/cost-saving?course=<courseId>
// http://localhost:3000/api/cost-saving?course=ENG201
app.get('/api/cost-saving', (req, res) => {
    const courseId = req.query.course;
    if (!courseId) {
      return res
        .status(400)
        .json({ error: 'Missing required query parameter: course' });
    }
  
    const record = courseCosts[courseId.toUpperCase()];
    if (!record) {
      return res
        .status(404)
        .json({ error: `No cost data found for course ${courseId}` });
    }
  
    const savings = record.saving;
    return res.json({
      course:   courseId.toUpperCase(),
      saving:   savings,
      details:  record
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
