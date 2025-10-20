// Variável para controlar os itens no carrinho
let itensCarrinho = 0;

// function para adicionar as coisas no carrinho
function adicionarCarrinho() {
    // aumenta o número de coisas no carrinho
    itensCarrinho++;
    
    // Atualiza o contador visual do carrinho
    atualizarContadorCarrinho();
    
    // Exibe mensagem de confirmação
    const mensagem = document.getElementById('msg-carrinho');
    mensagem.textContent = "Produto adicionado ao carrinho!";
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}

// Função para atualizar o contador visual do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    contador.textContent = itensCarrinho;
    
    // Adiciona animação ao contador
    contador.classList.add('pulse');
    setTimeout(() => {
        contador.classList.remove('pulse');
    }, 300);
}

// Adiciona efeito de pulso para o contador do carrinho (será usado via CSS)
document.head.insertAdjacentHTML('beforeend', `
<style>
    .pulse {
        animation: pulseAnimation 0.3s;
    }
    
    @keyframes pulseAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
</style>
`);

// Inicializa a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');
    

});