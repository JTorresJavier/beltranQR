document.addEventListener("DOMContentLoaded", () => {
  const recpass = document.getElementById("recpass");

  let currentStep = 1;
  let userEmail = "";

  function renderStep(step) {
    recpass.innerHTML = "";

    switch (step) {
      case 1:
        recpass.innerHTML = `
          <div class="steps">
            <div class="active"><div class="circle">1</div>Ingresar Correo</div>
            <div><div class="circle">2</div>Verificación</div>
            <div><div class="circle">3</div>Cambiar Contraseña</div>
            <div><div class="circle">4</div>Paso final</div>
          </div>
          <div class="recovery-password-container">
            <h2>Recuperar contraseña</h2>
            <div class="recovery-password-info-box">
              <ul>
                <li>Ingresa tu email institucional</li>
                <li>Recibirás un correo con un código de verificación</li>
                <li>Ingresa el código y podrás cambiar tu contraseña</li>
                <li>Inicia sesión con tu nueva contraseña</li>
              </ul>
            </div>
            <form id="email-form">
              <input type="email" id="email-input" class="form-input" placeholder="Correo electrónico" required>
              <button type="button" class="btn" id="send-code-btn">Enviar código</button>
            </form>
          </div>`;
        document.getElementById("send-code-btn").addEventListener("click", sendCode);
        break;

      case 2:
        recpass.innerHTML = `
          <div class="steps">
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Ingresar Correo</div>
            <div class="active"><div class="circle">2</div>Verificación</div>
            <div><div class="circle">3</div>Cambiar Contraseña</div>
            <div><div class="circle">4</div>Paso final</div>
          </div>
          <div class="recovery-password-container">
            <h2>Verificación</h2>
            <p>Hemos enviado un código a tu correo. Ingresa el código:</p>
            <form id="code-form">
              <input type="text" id="code-input" class="form-input" placeholder="Código de verificación" required>
              <button type="button" class="btn" id="verify-code-btn">Validar código</button>
            </form>
          </div>`;
        document.getElementById("verify-code-btn").addEventListener("click", verifyCode);
        break;

      case 3:
        recpass.innerHTML = `
          <div class="steps">
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Ingresar Correo</div>
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Verificación</div>
            <div class="active"><div class="circle">3</div>Cambiar Contraseña</div>
            <div><div class="circle">4</div>Paso final</div>
          </div>
          <div class="recovery-password-container">
            <h2>Ingresa tu nueva contraseña</h2>
            <form id="password-form">
              <input type="password" id="new-password" class="form-input" placeholder="Nueva contraseña" required>
              <input type="password" id="confirm-password" class="form-input" placeholder="Confirmar contraseña" required>
              <button type="button" class="btn" id="change-password-btn">Guardar contraseña</button>
            </form>
          </div>`;
        document.getElementById("change-password-btn").addEventListener("click", changePassword);
        break;

      case 4:
        recpass.innerHTML = `
          <div class="steps">
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Ingresar Correo</div>
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Verificación</div>
            <div class="completed"><div class="circle"><i class="fas fa-check"></i></div>Cambiar Contraseña</div>
            <div class="active"><div class="circle">4</div>Paso final</div>
          </div>
          <div class="recovery-password-container">
            <h2>¡Listo!</h2>
            <p>Tu contraseña ha sido cambiada exitosamente.</p>
            <button class="btn" id="login-btn">Ir al login</button>
          </div>`;
        document.getElementById("login-btn").addEventListener("click", goToLogin);
        break;
    }
  }

  async function sendCode() {
    const emailInput = document.getElementById("email-input");
    if (!emailInput) return alert("El campo de email no existe");

    userEmail = emailInput.value;
    if (!userEmail) return alert("Por favor ingresa un email");

    try {
      const res = await fetch("http://localhost:3000/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      console.log(data);
      currentStep = 2;
      renderStep(currentStep);
    } catch (err) {
      console.error(err);
      alert("Error enviando código");
    }
  }

  async function verifyCode() {
    const codeInput = document.getElementById("code-input");
    if (!codeInput) return alert("Ingresa el código");

    const code = codeInput.value;
    if (!code) return alert("Ingresa el código");

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, code }),
      });
      const data = await res.json();
      console.log(data);
      currentStep = 3;
      renderStep(currentStep);
    } catch (err) {
      console.error(err);
      alert("Código incorrecto o expirado");
    }
  }

  async function changePassword() {
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    if (!newPasswordInput || !confirmPasswordInput) return alert("Falta completar");

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) return alert("Las contraseñas no coinciden");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, newPassword }),
      });
      const data = await res.json();
      console.log(data);
      currentStep = 4;
      renderStep(currentStep);
    } catch (err) {
      console.error(err);
      alert("Error al cambiar la contraseña");
    }
  }

  function goToLogin() {
    window.location.href = "../paginas/Login.html";
  }

  renderStep(currentStep);
});