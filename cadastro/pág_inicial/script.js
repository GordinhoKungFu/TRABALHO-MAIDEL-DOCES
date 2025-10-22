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
        // Fallback: exibir produtos estáticos caso a API não esteja disponível
        exibirProdutos([
            {
                id: 1,
                nome: "Bolo de Chocolate",
                descricao: "Feito com chocolate belga e recheio cremoso, perfeito para festas e ocasiões especiais.",
                imagem: "./assets/bolo.png",
                preco: 45.90
            },
            {
                id: 2,
                nome: "Brigadeiro Gourmet",
                descricao: "Deliciosos brigadeiros enrolados à mão, cobertos com granulado belga.",
                imagem: "./assets/registrar-minha-marca-de-doces-caseiros.jpg",
                preco: 2.50
            },
            {
                id: 3,
                nome: "Torta de Morango",
                descricao: "Base crocante, creme de baunilha e morangos frescos por cima.",
                imagem: "./assets/torta.png",
                preco: 35.00
            }
        ]);
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
        // Fallback: exibir histórias estáticas caso a API não esteja disponível
        exibirHistorias([
            {
                id: 1,
                conteudo: "A Doce Encanto é uma loja especializada em doces artesanais e bolos personalizados, localizada no centro da cidade. Fundada há mais de dez anos, a empresa consolidou-se pela qualidade excepcional de seus produtos e pelo atendimento dedicado aos clientes."
            },
            {
                id: 2,
                conteudo: "Utilizando ingredientes selecionados e técnicas tradicionais, a Doce Encanto oferece uma variedade diversificada que inclui bolos para eventos especiais, sobremesas finas, doces caseiros e opções personalizadas conforme a necessidade do cliente. A loja também preza pela inovação, desenvolvendo novas receitas que acompanham as tendências do mercado."
            },
            {
                id: 3,
                conteudo: "Além do sabor diferenciado, a Doce Encanto valoriza o ambiente acolhedor, proporcionando uma experiência agradável para os visitantes. A combinação entre tradição, qualidade e atendimento faz da loja uma referência na região para quem busca produtos de confeitaria refinados e confiáveis."
            }
        ]);
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