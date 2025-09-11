document.addEventListener("DOMContentLoaded", () => {
  const recpass = document.getElementById("recpass");

  let i = 1;

  function nextStep(step) {
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
              Si usted olvidó su contraseña, puede recuperarla siguiendo estos pasos: 
              <ul> 
                <li>1. Complete el formulario de abajo ingresando su email institucional</li> 
                <li>2. Le llegará un e-mail a su correo alternativo con una serie de pasos a seguir.</li> 
                <li>3. Una vez confirmado el deseo de regenerar su password, se le permitirá cambiar su contraseña.</li> 
                <li>4. Ingresé sesión con su nueva contraseña.</li> 
              </ul>
            </div>
            <form id="email-form">
              <input type="email" class="form-input" placeholder="Correo electrónico" required>
              <button type="button" class="btn" onclick="sendCode()">Enviar código</button>
            </form>
          </div>`;
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
            <p>Hemos enviado un código a tu correo. Ingresa el código para continuar:</p>
            <form id="code-form">
              <input type="text" class="form-input" placeholder="Código de verificación" required>
              <button type="button" class="btn" onclick="verifyCode()">Validar código</button>
            </form>
          </div>`;
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
            <p>Para completar la recuperación, ingresa una nueva contraseña:</p>
            <form id="password-form">
              <input type="password" class="form-input" placeholder="Nueva contraseña" required>
              <input type="password" class="form-input" placeholder="Confirmar contraseña" required>
              <button type="button" class="btn" onclick="changePassword()">Guardar contraseña</button>
            </form>
          </div>`;
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
            <p>Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva clave.</p>
            <button class="btn" onclick="goToLogin()">Ir al login</button>
          </div>`;
        break;

      default:
        break;
    }
  }

  window.sendCode = function () {
    const email = document.querySelector('#email-form input[type="email"]').value;

    fetch("http://localhost:3000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          i = 2;
          nextStep(i);
        } else {
          alert("Error: " + (data.error || "No se pudo enviar"));
        }
      })
      .catch(err => console.error(err));
  };

  window.verifyCode = function () {
    i = 3;
    nextStep(i);
  };

  window.changePassword = function () {
    i = 4;
    nextStep(i);
  };

  window.goToLogin = function () {
    window.location.href = "../paginas/Login.html";
  };

  nextStep(i);
});