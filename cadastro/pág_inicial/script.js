// Variável para controlar os itens no carrinho
let itensCarrinho = 0;
const API_URL = 'http://localhost:3000';

// Função para carregar produtos da API
async function carregarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        const produtos = await response.json();
        exibirProdutos(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para carregar histórias da API
async function carregarHistorias() {
    try {
        const response = await fetch(`${API_URL}/historias`);
        const historias = await response.json();
        exibirHistorias(historias);
    } catch (error) {
        console.error('Erro ao carregar histórias:', error);

    }
}

// Função para exibir produtos na página
function exibirProdutos(produtos) {
    const produtosLista = document.getElementById('produtos-lista');
    produtosLista.innerHTML = '';

    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.className = 'produto';
        produtoElement.innerHTML = `
            <div class="imagem-produto">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="info-produto">
                <div class="nome-produto">${produto.nome}</div>
                <div class="descricao-produto">${produto.descricao}</div>
                <div class="preco-produto">R$ ${produto.preco.toFixed(2)}</div>
                <button class="botao-carrinho" onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        produtosLista.appendChild(produtoElement);
    });
}

// Função para exibir histórias na página
function exibirHistorias(historias) {
    const historiasContainer = document.getElementById('historias-container');
    historiasContainer.innerHTML = '';

    historias.forEach((historia, index) => {
        const historiaElement = document.createElement('div');
        historiaElement.className = `main-content${index + 2}`;
        historiaElement.innerHTML = `
            <div class="historia">
                <p>${historia.conteudo}</p>
            </div>
        `;
        historiasContainer.appendChild(historiaElement);
    });
}

// Função para adicionar produto ao carrinho
function adicionarCarrinho(produtoId) {
    itensCarrinho++;
    atualizarContadorCarrinho();
    
    const mensagem = document.getElementById('msg-carrinho');
    mensagem.textContent = "Produto adicionado ao carrinho!";
    
    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}

// Função para atualizar o contador visual do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    contador.textContent = itensCarrinho;
    
    contador.classList.add('pulse');
    setTimeout(() => {
        contador.classList.remove('pulse');
    }, 300);
}

// Inicializa a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');
    carregarProdutos();
    carregarHistorias();
});

// CSS para animação do contador (adicionado via JavaScript)
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