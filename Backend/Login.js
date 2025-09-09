const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          
  password: '',          
  database: 'control_acceso'
});

db.connect(err => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos");
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    const user = results[0];
    if (password === user.password) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
