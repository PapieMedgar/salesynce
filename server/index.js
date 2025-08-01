import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL config
const db = mysql.createConnection({
  host: '13.244.241.5',
  user: 'dev',
  password: 'Developer1234#',
  database: 'salessync'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Login route that checks email + role
app.post('/SignIn', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  // Look for user with matching email AND role
  db.query('SELECT * FROM user WHERE email = ? AND role = ?', [email, role], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'No user found with this email and role' });
    }

    const user = results[0];
    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.json({
          success: true,
          message: 'Login successful',
          email: user.email,
          role: user.role
        });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (bcryptErr) {
      console.error('Bcrypt error:', bcryptErr);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
