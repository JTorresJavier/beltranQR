document.addEventListener("DOMContentLoaded", () => {
  const menuHTML = `
    <div class="menu-overlay" id="menuOverlay"></div>
    <aside class="side-menu" id="sideMenu">
      <ul>
        <li><a href="index.html"><i class="fas fa-home"></i> Inicio</a></li>
        <li><a href="noticias.html"><i class="fas fa-newspaper"></i> Noticias</a></li>
        <li><a href="perfil.html"><i class="fas fa-user"></i> Perfil</a></li>
        <li><a href="configuracion.html"><i class="fas fa-cog"></i> Configuración</a></li>
      </ul>
    </aside>
    <header class="header">
      <img src="/imagenes/logo1.webp" alt="Logo" class="logo">
      <button class="hamburger" id="hamburger">
        <i class="fas fa-bars"></i>
      </button>
    </header>
  `;
  document.getElementById('menu-container').innerHTML = menuHTML;
});