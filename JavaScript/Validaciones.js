document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const email = sanitize(emailInput.value.trim());
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Por favor, complete todos los campos.");
      if (!email) {
        emailInput.focus();
      } else {
        passwordInput.focus();
      }
      return;
    }

    if (!validarEmail(email)) {
      alert("Por favor, ingrese un email válido.");
      emailInput.focus();
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
        alert("Inicio de sesión exitoso.");
        window.location.href = "../paginas/Home.html";
      } else {
        alert(data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión con el servidor.");
    }
  });

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  }

  function sanitize(input) {
    const element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML;
  }
});


