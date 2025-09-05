document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const email = sanitize(emailInput.value.trim());
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showAlert("Por favor, complete todos los campos.");
      setFocus(!email ? emailInput : passwordInput);
      return;
    }

    if (!validarEmail(email)) {
      showAlert("Por favor, ingrese un email válido.");
      setFocus(emailInput);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showAlert("Inicio de sesión exitoso.");
        window.location.href = "../paginas/Home.html"; // Redirige al home
      } else {
        showAlert(data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      showAlert("Error de conexión con el servidor.");
    }
  });

  // Función para validar el formato del email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  }

  // Sanitización de la entrada para evitar caracteres peligrosos
  function sanitize(input) {
    const element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML; // Utiliza innerText para evitar XSS
  }

  // Mostrar alertas con mensajes
  function showAlert(message) {
    alert(message);
  }

  // Establecer el foco en un campo de formulario
  function setFocus(element) {
    element.focus();
  }
});
