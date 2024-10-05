function showLoginPage() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="text-center mb-4">
                    <img src="img/logo.png" alt="VetPonto Logo" class="logo">
                </div>
                <div class="card">
                    <div class="card-body p-4">
                        <ul class="nav nav-tabs mb-4" id="authTabs" role="tablist">
                            <li class="nav-item flex-grow-1" role="presentation">
                                <button class="nav-link active w-100" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab">Entrar</button>
                            </li>
                            <li class="nav-item flex-grow-1" role="presentation">
                                <button class="nav-link w-100" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab">Cadastrar</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="authTabsContent">
                            <div class="tab-pane fade show active" id="login" role="tabpanel">
                                <form id="loginForm">
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="loginEmail" placeholder="Email" required>
                                        <label for="loginEmail">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="loginPassword" placeholder="Senha" required>
                                        <label for="loginPassword">Senha</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="signup" role="tabpanel">
                                <form id="signupForm">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="signupName" placeholder="Nome" required>
                                        <label for="signupName">Nome</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="signupEmail" placeholder="Email" required>
                                        <label for="signupEmail">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="signupPassword" placeholder="Senha" required>
                                        <label for="signupPassword">Senha</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

function handleLogin(e) {
    e.preventDefault();
    showMainPage();
}

function handleSignup(e) {
    e.preventDefault();
    showMainPage();
}

function showMainPage() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="text-center mb-4">
                    <img src="img/logo.png" alt="VetPonto Logo" class="logo">
                </div>
                <div class="user-info mb-4">
                    <h5>Bem-vindo, <span id="userName">Nome do Usuário</span></h5>
                    <p>Email: <span id="userEmail">usuario@email.com</span></p>
                </div>
                <div class="card">
                    <div class="card-body">
                        <ul class="nav nav-tabs mb-4" id="trackingTabs" role="tablist">
                            <li class="nav-item flex-grow-1" role="presentation">
                                <button class="nav-link active w-100" id="dayToDay" data-bs-toggle="tab" data-bs-target="#dayToDayContent" type="button" role="tab">
                                    Dia a Dia
                                </button>
                            </li>
                            <li class="nav-item flex-grow-1" role="presentation">
                                <button class="nav-link w-100" id="onCall" data-bs-toggle="tab" data-bs-target="#onCallContent" type="button" role="tab">
                                    Plantão
                                </button>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-around mb-4">
                            <button id="checkIn" class="btn btn-success btn-lg">
                                Entrada
                            </button>
                            <button id="checkOut" class="btn btn-danger btn-lg">
                                Saída
                            </button>
                        </div>
                        <h4 class="mt-4">Registros de Hoje</h4>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Ação</th>
                                        <th>Hora</th>
                                    </tr>
                                </thead>
                                <tbody id="recordsTableBody"></tbody>
                            </table>
                        </div>
                        <div class="mt-4 text-center">
                            <button id="viewReports" class="btn btn-primary">Ver Relatórios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    handleTrackingTypeSelection();
    document.getElementById('checkIn').addEventListener('click', () => handleTimeTracking('Entrada'));
    document.getElementById('checkOut').addEventListener('click', () => handleTimeTracking('Saída'));
    document.getElementById('viewReports').addEventListener('click', showReportPage);
}

function handleTrackingTypeSelection() {
    const tabs = document.querySelectorAll('#trackingTabs .nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function handleTimeTracking(action) {
    const type = document.querySelector('#trackingTabs .nav-link.active').id === 'dayToDay' ? 'Dia a Dia' : 'Plantão';
    const time = new Date().toLocaleTimeString();
    addRecord(type, action, time);
}

function addRecord(type, action, time) {
    const tableBody = document.getElementById('recordsTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${type}</td>
        <td>${action}</td>
        <td>${time}</td>
    `;
}

function showReportPage() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-12 col-md-10">
                <div class="text-center mb-4">
                    <img src="img/logo.png" alt="VetPonto Logo" class="logo">
                </div>
                <div class="card">
                    <div class="card-body">
                        <form id="reportForm" class="mb-4">
                            <div class="row">
                                <div class="col-12 col-sm-6 mb-3">
                                    <input type="month" id="reportMonth" class="form-control" required>
                                </div>
                                <div class="col-12 col-sm-6 mb-3">
                                    <select id="reportType" class="form-select">
                                        <option value="all">Todos os Tipos</option>
                                        <option value="dayToDay">Dia a Dia</option>
                                        <option value="onCall">Plantão</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <button type="submit" class="btn btn-primary w-100">Gerar Relatório</button>
                                </div>
                            </div>
                        </form>
                        <div id="reportTableContainer"></div>
                        <div class="mt-4">
                            <h4>Resumo</h4>
                            <p>Horas Dia a Dia: <span id="dayToDayHours">0</span></p>
                            <p>Horas Plantão: <span id="onCallHours">0</span></p>
                            <p>Total de Horas: <span id="totalHours">0</span></p>
                        </div>
                        <div class="mt-4">
                            <button id="exportPDF" class="btn btn-success">Exportar para PDF</button>
                        </div>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <button id="backToMain" class="btn btn-secondary">Voltar para Principal</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('reportForm').addEventListener('submit', handleReportGeneration);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('backToMain').addEventListener('click', showMainPage);
}

function handleReportGeneration(e) {
    e.preventDefault();
    const month = document.getElementById('reportMonth').value;
    const type = document.getElementById('reportType').value;
    showReportTable();
}

function showReportTable() {
    const tableContainer = document.getElementById('reportTableContainer');
    tableContainer.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Entrada</th>
                    <th>Saída</th>
                    <th>Total de Horas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2023-06-01</td>
                    <td>Dia a Dia</td>
                    <td>09:00</td>
                    <td>17:00</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>2023-06-02</td>
                    <td>Plantão</td>
                    <td>20:00</td>
                    <td>08:00</td>
                    <td>12</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById('dayToDayHours').textContent = '8';
    document.getElementById('onCallHours').textContent = '12';
    document.getElementById('totalHours').textContent = '20';
}

function exportToPDF() {
    const { jsPDF } = window.jspdf; // Verifica se jsPDF está disponível
    const doc = new jsPDF(); // Cria uma nova instância do jsPDF

    // Configura o título e informações do relatório
    doc.setFontSize(18);
    doc.text('Relatório de Horas', 50, 30); // Adiciona um texto ao PDF

    // Pega as informações do relatório
    const month = document.getElementById('reportMonth').value; // Obtém o mês do relatório
    const type = document.getElementById('reportType').options[document.getElementById('reportType').selectedIndex].text; // Obtém o tipo do relatório

    // Adiciona informações ao PDF
    doc.setFontSize(12);
    doc.text(`Mês: ${month}`, 10, 50);
    doc.text(`Tipo: ${type}`, 10, 60);

    // Adiciona a tabela ao PDF sem a coluna de Ações
    const table = document.querySelector('#reportTableContainer table'); // Seleciona a tabela do relatório
    const pdfTableData = Array.from(table.rows).map(row => {
        // Mapeia as células da linha para apenas incluir as células desejadas
        return [
            row.cells[0].textContent, // Data
            row.cells[1].textContent, // Tipo
            row.cells[2].textContent, // Entrada
            row.cells[3].textContent, // Saída
            row.cells[4].textContent  // Total de Horas
        ];
    });

    // Define o cabeçalho da tabela para o PDF
    const pdfTableHeader = [['Data', 'Tipo', 'Entrada', 'Saída', 'Total de Horas']];

    doc.autoTable({
        head: pdfTableHeader, // Define o cabeçalho da tabela
        body: pdfTableData.slice(1), // Usa os dados da tabela, excluindo a primeira linha que é o cabeçalho
        startY: 70, // Define onde a tabela começará no PDF
        theme: 'grid', // Define o tema da tabela
        headStyles: { fillColor: [41, 128, 185], textColor: 255 }, // Estilos para o cabeçalho da tabela
        bodyStyles: { textColor: 0 }, // Estilos para o corpo da tabela
    });

    // Adiciona resumo ao PDF
    const finalY = doc.lastAutoTable.finalY || 70; // Obtém a posição final da tabela
    doc.text('Resumo:', 10, finalY + 10); // Adiciona o título de resumo
    doc.text(`Horas Dia a Dia: ${document.getElementById('dayToDayHours').textContent}`, 10, finalY + 20);
    doc.text(`Horas Plantão: ${document.getElementById('onCallHours').textContent}`, 10, finalY + 30);
    doc.text(`Total de Horas: ${document.getElementById('totalHours').textContent}`, 10, finalY + 40);

    // Salva o PDF
    doc.save('relatorio_horas.pdf'); // Nome do arquivo PDF gerado
}

document.addEventListener('DOMContentLoaded', () => {
    showLoginPage();
});
