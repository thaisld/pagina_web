// Lógica de autenticação ao enviar o formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você pode substituir por uma chamada para sua API de autenticação
    if (username === 'admin' && password === 'senha123') {
        // Se o login for bem-sucedido, exibe o container principal e oculta o de login
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    } else {
        // Se o login falhar, exibe uma mensagem de erro
        document.getElementById('login-error').style.display = 'block';
    }
});

// Função para deslogar ao clicar no botão "Logoff"
document.getElementById("logoff-button").addEventListener("click", function() {
    document.getElementById("main-container").style.display = "none"; // Esconde a página de controle
    document.getElementById("login-container").style.display = "block"; // Mostra a página de login
});

// Função para carregar alunos
async function carregarAlunos() {
    try {
        const response = await fetch('http://10.1.24.62:5000/alunos');
        if (!response.ok) {
            throw new Error('Erro ao buscar alunos');
        }
        const alunos = await response.json();
        const tabela = document.querySelector('.table tbody');
        
        // Limpa a tabela antes de preencher
        tabela.innerHTML = '';

        // Adiciona cada aluno à tabela
        alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.ra}</td>
                <td>${aluno.status}</td>
                <td>${aluno.numero_notebook ? aluno.numero_notebook : 'Sem notebook'}</td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

// Chama a função de carregar alunos quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', carregarAlunos);
