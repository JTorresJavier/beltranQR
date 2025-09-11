const db = require('../DB');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ================== LOGIN ==================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error en query:", err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    const user = results[0];

    if (password === user.password) {
      return res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
    } else {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
};

// ================== OLVIDÉ LA CONTRASEÑA ==================
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Debe proporcionar un email" });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });
    if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const token = crypto.randomBytes(20).toString('hex');

    db.query('UPDATE usuarios SET resetToken = ?, resetTokenExp = ? WHERE email = ?', 
      [token, Date.now() + 3600000, email], (err2) => {
        if (err2) return res.status(500).json({ error: 'Error al guardar token' });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'tuemail@gmail.com',
            pass: 'clave_app' 
          }
        });

        const mailOptions = {
          to: email,
          from: 'tuemail@gmail.com',
          subject: 'Recuperar contraseña',
          text: `Para resetear tu contraseña, haz click en el siguiente enlace:\n\nhttp://localhost:3000/api/auth/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, (err3) => {
          if (err3) return res.status(500).json({ error: 'Error al enviar email' });
          res.json({ message: "Email de recuperación enviado" });
        });
    });
  });
};

// ================== RESET DE LA CONTRASEÑA ==================
const resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  db.query('SELECT * FROM usuarios WHERE resetToken = ? AND resetTokenExp > ?', [token, Date.now()], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });
    if (results.length === 0) return res.status(400).json({ message: "Token inválido o expirado" });

    const user = results[0];

    db.query('UPDATE usuarios SET password = ?, resetToken = NULL, resetTokenExp = NULL WHERE id = ?', 
      [newPassword, user.id], (err2) => {
        if (err2) return res.status(500).json({ error: 'Error al actualizar contraseña' });
        res.json({ message: "Contraseña actualizada con éxito" });
      });
  });
};

module.exports = { login, forgotPassword, resetPassword };