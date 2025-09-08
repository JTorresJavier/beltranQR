document.addEventListener("DOMContentLoaded", function () {
  const botonDescargar = document.getElementById("descargarPDF");

botonDescargar.addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Informe de Usuario - Instituto Técnologico Beltran", 10, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Este documento contiene información relevante sobre el acceso y registro de los usuarios al sistema", 10, 30
    );

    const texto =
      "El Instituto Técnologico Beltrán agradece la participación activa de sus usuarios en el sistema de control de acceso. " +
      "La plataforma ha sido diseñada para garantizar la seguridad y trazabilidad de las actividades " +
      "realizadas por estudiantes, docentes y personal administrativo. \n\n" +
      "Cada usuario dispone de credenciales únicas para ingresar al sistema. " +
      "Es responsabilidad de cada individuo mantener la confidencialidad de sus datos de acceso y seguir los protocolos establecidos. \n\n" +
      "Ante cualquier inconveniente o actividad sospechosa, solicitamos comunicarse con el área de soporte institucional"
    ;

    doc.text(texto, 10, 40, { maxWidth: 190 });

    const img = new Image();
    img.src = "";

    img.onload = function () {
      doc.addImage(img, "webp", 150, 10, 40, 20);
      doc.save("Informe_Instituto_Tecnologico_Beltran.pdf");
    };

    img.onerror = function () {
      doc.save("Informe_Instituto_Tecnologico_Beltran.pdf");
    };
  });
});