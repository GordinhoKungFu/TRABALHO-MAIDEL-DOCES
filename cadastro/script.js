   // script.js
   document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão
    
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const responseDiv = document.getElementById('response');
    
    console.log('Validação iniciada...'); // Debug: verifica se o evento está sendo chamado
    
    // Validação básica
    if (!nome || !telefone || !cep || !endereco) {
        responseDiv.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        responseDiv.style.color = 'red';
        console.log('Validação falhou: campos vazios'); // Debug
        return;
    }
    
    console.log('Validação passou. Redirecionando...'); // Debug
    
    // Simulação de cadastro bem-sucedido
    responseDiv.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
    responseDiv.style.color = 'rgb(87, 7, 40)';
    
    // Redirecionamento após 2 segundos
    setTimeout(function() {
        console.log('Redirecionando para pág_inicial/index.html'); // Debug
        window.location.href = 'pág_inicial/index.html'; // Ajuste o caminho se necessário
    }, 2000);
});
