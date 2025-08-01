import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

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

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database.');
  }
});

// Login route
app.post('/SignIn', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('❌ Database query error:', err);
      return res.status(500).json({ success: false, error: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, error: 'Incorrect email or password.' });
    }

    const user = results[0];
    console.log('Stored password:', user.password);
    console.log('User role from DB:', `"${user.role}"`);

    // Plain text password check (temporary)
    if (password !== user.password) {
      return res.status(401).json({ success: false, error: 'Incorrect email or password.' });
    }

    // Normalize role: remove whitespace and lowercase
    const roleRaw = user.role || '';
    const role = roleRaw.replace(/\s+/g, '').toLowerCase();

    console.log(`Normalized role: "${role}"`);

    // Include 'fieldagent' in valid roles
    const validRoles = ['admin', 'footsoldier', 'agent', 'fieldagent'];
    if (!validRoles.includes(role)) {
      return res.status(403).json({ success: false, error: 'Unknown role. Access denied.' });
    }

    // Success response
    return res.json({
      success: true,
      message: 'Login successful',
      email: user.email,
      role: role
    });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
export { db };
