   const rowsData = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        nombre: `Persona ${i + 1}`,
        dni: `40${i + 10000}`,
        tipo: i % 2 === 0 ? 'Ingreso' : 'Salida',
        fecha: '25/04/2025',
        hora: '18:00:00'
    }));
  
    const rowsPerPage = 10;
    const maxPageButtons = 5;
    let currentPage = 1;
    const tbody = document.querySelector('tbody');
    const paginationInfo = document.querySelector('.pagination-info');
    const paginationContainer = document.getElementById('paginationNumbers');

    function renderTable() {
        tbody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = rowsData.slice(start, end);

        pageData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td><input type="checkbox"/></td>
            <td>${row.id}</td>
            <td>
            ${row.nombre}
            <span class="dni">${row.dni}</span>
            </td>
            <td>${row.tipo}</td>
            <td>${row.fecha}</td>
            <td>${row.hora}</td>
            `;
            tbody.appendChild(tr);
        });
        paginationInfo.textContent = `Mostrando ${start + 1}-${Math.min(end, rowsData.length)} de ${rowsData.length}`;
        renderPaginationButtons();
    }

    function renderPaginationButtons() {
        const pageCount = Math.ceil(rowsData.length / rowsPerPage);
        const blockStart = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
        const blockEnd = Math.min(blockStart + maxPageButtons - 1, pageCount);

        paginationContainer.innerHTML = '';

        if (blockStart > 1) {
        const prevBlockBtn = document.createElement('button');
        prevBlockBtn.textContent = '«';
        prevBlockBtn.onclick = () => {
            currentPage = blockStart - 1;
            renderTable();
        };
        paginationContainer.appendChild(prevBlockBtn);
        }

        for (let i = blockStart; i <= blockEnd; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) button.classList.add('active');
        button.onclick = () => {
            currentPage = i;
            renderTable();
        };
        paginationContainer.appendChild(button);
        }

        if (blockEnd < pageCount) {
        const nextBlockBtn = document.createElement('button');
        nextBlockBtn.textContent = '»';
        nextBlockBtn.onclick = () => {
            currentPage = blockEnd + 1;
            renderTable();
        };
        paginationContainer.appendChild(nextBlockBtn);
        }
    }

renderTable();