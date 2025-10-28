// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Bolo de Chocolate",
        descricao: "Feito com chocolate belga e recheio cremoso, perfeito para festas.",
        imagem: "https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg",
        preco: 45.90
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        descricao: "Deliciosos brigadeiros enrolados à mão, cobertos com granulado belga.",
        imagem: "https://images.pexels.com/photos/28787817/pexels-photo-28787817.jpeg",
        preco: 2.50
    },
    {
        id: 3,
        nome: "Torta de Morango",
        descricao: "Base crocante, creme de baunilha e morangos frescos por cima.",
        imagem: "https://images.pexels.com/photos/11581120/pexels-photo-11581120.jpeg",
        preco: 35.00
    },
    {
        id: 4,
        nome: "Alfajor",
        descricao: "Doce tradicional argentino com doce de leite e coco.",
        imagem: "https://images.pexels.com/photos/4234495/pexels-photo-4234495.jpeg",
        preco: 8.00
    },
    {
        id: 5,
        nome: "Trufas de Chocolate",
        descricao: "Trufas artesanais com chocolate meio amargo e cacau.",
        imagem: "https://images.pexels.com/photos/4791265/pexels-photo-4791265.jpeg",
        preco: 4.50
    },
    {
        id: 6,
        nome: "Pudim de Leite",
        descricao: "Clássico pudim de leite condensado com calda de caramelo.",
        imagem: "https://images.pexels.com/photos/302468/pexels-photo-302468.jpeg",
        preco: 25.00
    }
];

// Carrinho de compras
let carrinho = [];

// Elementos do DOM
const produtosLista = document.getElementById('produtos-lista');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalPreco = document.getElementById('total-preco');

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    atualizarCarrinho();
});

// Carregar produtos na página
function carregarProdutos() {
    produtosLista.innerHTML = '';
    
    produtos.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
        produtoCard.innerHTML = `
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="produto-info">
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        produtosLista.appendChild(produtoCard);
    });
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.find(item => item.id === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
    mostrarMensagem(`${produto.nome} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

// Atualizar quantidade do produto no carrinho
function atualizarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
        removerDoCarrinho(produtoId);
        return;
    }
    
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade = novaQuantidade;
        atualizarCarrinho();
    }
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
    // Atualizar contador
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;
    
    // Atualizar lista de itens
    carrinhoItens.innerHTML = '';
    
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
    } else {
        carrinhoVazio.style.display = 'none';
        
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <div class="item-imagem">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="item-info">
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
                </div>
                <div class="item-controles">
                    <button class="btn-quantidade" onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                    <span class="quantidade">${item.quantidade}</span>
                    <button class="btn-quantidade" onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                    <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
                </div>
            `;
            carrinhoItens.appendChild(itemElement);
        });
    }
    
    // Atualizar total
    const total = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    totalPreco.textContent = total.toFixed(2);
}

// Mostrar mensagem de feedback
function mostrarMensagem(mensagem) {
    // Remover mensagem existente
    const mensagemExistente = document.querySelector('.mensagem');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    // Criar nova mensagem
    const mensagemElement = document.createElement('div');
    mensagemElement.className = 'mensagem';
    mensagemElement.textContent = mensagem;
    document.body.appendChild(mensagemElement);
    
    // Mostrar mensagem
    setTimeout(() => {
        mensagemElement.classList.add('mostrar');
    }, 100);
    
    // Esconder mensagem após 3 segundos
    setTimeout(() => {
        mensagemElement.classList.remove('mostrar');
        setTimeout(() => {
            mensagemElement.remove();
        }, 300);
    }, 3000);
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarMensagem('Seu carrinho está vazio!');
        return;
    }
    
    const total = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    
    mostrarMensagem(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
    
    // Limpar carrinho
    carrinho = [];
    atualizarCarrinho();
}

// Animar contador do carrinho
function animarContador() {
    contadorCarrinho.classList.add('pulse');
    setTimeout(() => {
        contadorCarrinho.classList.remove('pulse');
    }, 300);
}

// Atualizar função adicionarAoCarrinho para incluir animação
const adicionarAoCarrinhoOriginal = adicionarAoCarrinho;
adicionarAoCarrinho = function(produtoId) {
    adicionarAoCarrinhoOriginal(produtoId);
    animarContador();
};