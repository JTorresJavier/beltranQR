const contentArea = document.getElementById('main-content');

const contenido = {
  perfil: `
    <h1>Perfil</h1>
    <p>Aquí puedes editar la información de tu perfil personal, como nombre, foto y preferencias generales.</p>

    <div>
      <h2> Información personal </h2>
      <label> Nombre completo: </label><br>
      <input type="text" value="Sung Jin-Woo"><br>

      <label> Alias / Rol: </label><br>
      <input type="text" value="Monarca"><br>

      <label> Correo electrónico: </label><br>
      <input type="email" value="sung.itbeltran@hotmail.com"><br>

      <label> Teléfono: </label><br>
      <input type="tel" value="1120304050"><br>

      <h2> Datos adicionales </h2>
      <label> Fecha de nacimiento: </label><br>
      <input type="date" value="1995-04-18"><br>

      <label> Dirección: </label><br>
      <input type="text" value="Ciudad Mágica, Dimensión de Sombras"><br>

      <label> Idioma preferido: </label><br>
      <select>
        <option value="es" selected>Español</option>
        <option value="en">English</option>
      </select>

      <button id="btn-guardar-perfil">Guardar cambios</button>
      <button id="btn-cambiar-datos">Cambiar datos</button>
    </div>
  `,
  configuracion: `
    <h1> Configuración </h1>
    <p> Ajusta la apariencia y preferencias de tu panel. </p>

    <h2> Tema </h2>
    <label for="modo"> Modo de fondo: </label><br>
    <select id="modo">
      <option value="claro"> Claro </option>
      <option value="oscuro"> Oscuro </option>
    </select><br><br>

    <h2> Notificaciones </h2>
    <label>
      <input type="checkbox" id="notificaciones" /> Recibir notificaciones por correo
    </label><br><br>

    <h2> Cerrar sesión o eliminar cuenta</h2>
    <button id="btn-logout">Cerrar sesión en todos los dispositivos</button>
    <br><br>
  `,
  estadisticas: `
    <h1> Estadísticas </h1>
    <p> Consulta tu historial de entradas y salidas. </p>

    <div class="stats-summary">
      <div class="stats-card">
        <h2>1</h2>
        <p> Entradas hoy </p>
      </div>
      <div class="stats-card">
        <h2>1</h2>
        <p> Salidas en el año </p>
      </div>
    </div>
  `,
  soporte: `
    <h1> Soporte</h1>
    <p> ¿Tienes dudas o problemas? Solicita un ticket de soporte o usa el chat en línea. </p>

    <h2> Solicitar Ticket </h2>
    <form id="form-ticket">
      <label for="asunto"> Asunto: </label><br>
      <input type="text" id="asunto" name="asunto" required />
      <label for="mensaje"> Mensaje: </label><br>
      <textarea id="mensaje" name="mensaje" rows="4" required></textarea><br><br>
      <button type="submit"> Enviar Ticket </button>
    </form>
  `
};

const navLinks = document.querySelectorAll('.sidebar nav a');

function activarEnlaceActual(elemento) {
  navLinks.forEach(link => link.classList.remove('active'));
  elemento.classList.add('active');
}

function cargarContenido(seccion, link) {
  contentArea.innerHTML = contenido[seccion];
  activarEnlaceActual(link);


  if (seccion === "perfil") {
    document.getElementById("btn-guardar-perfil").addEventListener("click", () => {
      alert("Cambios guardados");
    });
  }

  if (seccion === "configuracion") {
    document.getElementById("btn-guardar-config")?.addEventListener("click", () => {
      alert("Cambios en la cuenta guardados");
    });
    document.getElementById("btn-logout")?.addEventListener("click", () => {
      alert("Has cerrado sesión en todos los dispositivos");
    });
    document.getElementById("btn-delete")?.addEventListener("click", () => {
      alert("Tu cuenta ha sido eliminada (simulado)");
    });
  }

  if (seccion === "soporte") {
    initChat();
  }
}

document.getElementById('nav-perfil').addEventListener('click', (e) => {
  e.preventDefault();
  cargarContenido("perfil", e.target.closest('a'));
});

document.getElementById('nav-config').addEventListener('click', (e) => {
  e.preventDefault();
  cargarContenido("configuracion", e.target.closest('a'));
});

document.getElementById('nav-estadisticas').addEventListener('click', (e) => {
  e.preventDefault();
  cargarContenido("estadisticas", e.target.closest('a'));
});

document.getElementById('nav-soporte').addEventListener('click', (e) => {
  e.preventDefault();
  cargarContenido("soporte", e.target.closest('a'));
});

window.addEventListener('DOMContentLoaded', () => {
  const defaultLink = document.getElementById('nav-perfil');
  cargarContenido("perfil", defaultLink);
});

