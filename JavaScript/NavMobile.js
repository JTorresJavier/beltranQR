document.addEventListener("DOMContentLoaded", () => {
  const navMobileHTML = `
    <nav class="bottom-nav">
        <a href="#"><i class="fas fa-home"></i></a>
        <a href="#"><i class="fas fa-search"></i></a>

        <a href="QR.html" class="qr-button"></a>
        
        <a href="#"><i class="fas fa-user"></i></a>
        <a href="#"><i class="fas fa-arrow-left"></i></a>
    </nav>
  `;
  document.getElementById('navMobile-container').innerHTML = navMobileHTML;
});