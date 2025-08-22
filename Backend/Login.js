const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const BD = mysql.createConnection({
  host: "localhost",
  user: "root",          
  password: "",          
  database: "control_acceso"
});

BD.connect(error => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error);
    return;
  }
  console.log("Conectado a la base de datos");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const consulta = "SELECT * FROM usuarios WHERE email = ?";
  BD.query(consulta, [email], async (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: "Error del servidor" });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
    }

    const usuario = resultados[0];
    if (password === usuario.password) {
      return res.status(200).json({ exito: true, mensaje: "Inicio de sesión exitoso" });
    } else {
      return res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});