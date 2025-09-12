const db = require('../DB');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const util = require('util');
const bcrypt = require('bcrypt');

const query = util.promisify(db.query).bind(db);

// ================== LOGIN ==================
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ success: false, message: "Faltan datos" });

  try {
    const results = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (results.length === 0) return res.status(401).json({ success: false, message: "Credenciales incorrectas" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Credenciales incorrectas" });

    res.status(200).json({ success: true, user: { id: user.id, email: user.email } });

  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================== ENVIAR CÓDIGO ==================
const sendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Debe proporcionar un email" });

  try {
    const results = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const code = Math.floor(100000 + Math.random() * 900000);
    const codeExp = Date.now() + 10 * 60 * 1000; 

    await query('UPDATE usuarios SET resetToken = ?, resetTokenExp = ? WHERE email = ?', [code, codeExp, email]);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "EMAIL",
        pass: "CONTRASEÑA"
      }
    });

    const mailOptions = {
      from: `"Recuperación de contraseña" <EMAIL>`,
      to: email,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${code}. Válido por 10 minutos.`
    };

    await transporter.sendMail(mailOptions);
    console.log("Código enviado a", email);
    res.json({ message: "Código enviado correctamente" });

  } catch (err) {
    console.error("Error sendCode:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================== VERIFICAR CÓDIGO ==================
const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Faltan datos" });

  try {
    const results = await query(
      'SELECT * FROM usuarios WHERE email = ? AND resetToken = ? AND resetTokenExp > ?',
      [email, code, Date.now()]
    );

    if (results.length === 0) return res.status(400).json({ message: "Código inválido o expirado" });

    res.json({ message: "Código verificado correctamente" });

  } catch (err) {
    console.error("Error verifyCode:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================== CAMBIAR CONTRASEÑA ==================
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ message: "Faltan datos" });

  try {
    const results = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query(
      'UPDATE usuarios SET password = ?, resetToken = NULL, resetTokenExp = NULL WHERE email = ?',
      [hashedPassword, email]
    );

    console.log("Contraseña actualizada correctamente para", email);
    res.json({ message: "Contraseña actualizada con éxito" });

  } catch (err) {
    console.error("Error resetPassword:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login, sendCode, verifyCode, resetPassword };