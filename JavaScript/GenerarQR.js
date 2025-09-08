const qrContainer = document.getElementById("qrcode");
const textoQR = document.getElementById("textoQR");

let QR;

function generarQR() {
    const Valor = Math.random().toString(36).substring(2);
    const codigoCompleto = "Usuario-Entrada/Salida-" + Valor;
    if (QR) {
        QR.clear();
    } else {
        QR = new QRCode(qrContainer, {
          width: 230,
          height: 230,
          correctLevel: QRCode.CorrectLevel.H 
        });
    }
    QR.makeCode(codigoCompleto);
    qrContainer.style.display = "block";
    textoQR.textContent = "Acerca el código QR al lector para escanear";
}