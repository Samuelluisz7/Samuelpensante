/**
 * piramide.js - Sistema de Visualização em Pirâmide de Conhecimento
 * Responsável por: Exibir tópicos por nível, caminho de aprendizado, estatísticas
 */

let topicosData = [];
let filtroAtual = 'todos';

/**
 * Carregar dados de tópicos
 */
async function carregarTopicos() {
    try {
        const response = await fetch('data/topicos.json');
        const data = await response.json();
        topicosData = data.topicos;
        
        // Inicializar visualização
        atualizarEstatisticas();
        exibirTopicos('todos');
        exibirCaminhoAprendizado();
        
        console.log('Tópicos carregados:', topicosData.length);
    } catch (error) {
        console.error('Erro ao carregar tópicos:', error);
    }
}

/**
 * Atualizar estatísticas
 */
function atualizarEstatisticas() {
    // Total de tópicos
    document.getElementById('totalTopicos').textContent = topicosData.length;
    
    // Nível médio
    const nivelMedio = topicosData.reduce((sum, t) => sum + t.dificuldade, 0) / topicosData.length;
    document.getElementById('nivelMedio').textContent = nivelMedio.toFixed(1);
    
    // Categorias
    const categorias = new Set(topicosData.map(t => t.categoria));
    document.getElementById('categoriasTotal').textContent = categorias.size;
    
    // Tópicos completos (do localStorage)
    const completos = JSON.parse(localStorage.getItem('topicosCompletos')) || [];
    document.getElementById('topicosCompletos').textContent = completos.length;
}

/**
 * Filtrar por nível de dificuldade
 */
function filtrarPorNivel(niveis) {
    if (niveis === 'todos') {
        filtroAtual = 'todos';
    } else {
        filtroAtual = niveis;
    }
    
    exibirTopicos(filtroAtual);
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
}

/**
 * Exibir tópicos filtrados
 */
function exibirTopicos(filtro) {
    let topicos = topicosData;
    
    if (filtro !== 'todos') {
        topicos = topicosData.filter(t => filtro.includes(t.dificuldade));
    }
    
    // Agrupar por nível
    const porNivel = {};
    topicos.forEach(topico => {
        if (!porNivel[topico.dificuldade]) {
            porNivel[topico.dificuldade] = [];
        }
        porNivel[topico.dificuldade].push(topico);
    });
    
    // Renderizar
    let html = '';
    const niveis = Object.keys(porNivel).sort((a, b) => a - b);
    
    niveis.forEach(nivel => {
        const topicosNivel = porNivel[nivel];
        const nivelNome = getNivelNome(parseInt(nivel));
        const cor = getCor(parseInt(nivel));
        
        html += `
            <div class="nivel-secao">
                <div class="nivel-secao-titulo">
                    <div class="nivel-secao-cor" style="background: ${cor};"></div>
                    Nível ${nivel}: ${nivelNome} (${topicosNivel.length} tópicos)
                </div>
                
                <div class="topicos-grid">
                    ${topicosNivel.map(topico => renderizarTopicoCard(topico, cor)).join('')}
                </div>
            </div>
        `;
    });
    
    document.getElementById('topicosContainer').innerHTML = html;
}

/**
 * Renderizar card de tópico
 */
function renderizarTopicoCard(topico, cor) {
    const categoria = getCategoriaInfo(topico.categoria);
    const completo = JSON.parse(localStorage.getItem('topicosCompletos')) || [];
    const isCompleto = completo.includes(topico.id);
    
    return `
        <div class="topico-card" style="border-left-color: ${cor};" onclick="selecionarTopico('${topico.id}')">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div class="topico-card-titulo">
                        ${isCompleto ? '✅' : ''} ${topico.nome}
                    </div>
                    <div class="topico-card-descricao">${topico.descricao}</div>
                </div>
            </div>
            
            <div class="topico-card-info">
                <span>${categoria.icon} ${categoria.nome}</span>
                <span>${topico.dependencias.length > 0 ? topico.dependencias.length + ' pré-req.' : 'Base'}</span>
            </div>
        </div>
    `;
}

/**
 * Exibir caminho de aprendizado recomendado
 */
function exibirCaminhoAprendizado() {
    // Encontrar o caminho mais curto (topologia de ordenação)
    const caminho = construirCaminhoAprendizado();
    
    let html = '';
    caminho.forEach((topico, index) => {
        html += `
            <div class="caminho-item" onclick="selecionarTopico('${topico.id}')">
                <div class="caminho-numero">${index + 1}</div>
                <div class="caminho-conteudo">
                    <div class="caminho-titulo">${topico.nome}</div>
                    <div class="caminho-descricao">${topico.descricao}</div>
                </div>
            </div>
        `;
        
        if (index < caminho.length - 1) {
            html += '<div class="caminho-seta">↓</div>';
        }
    });
    
    document.getElementById('caminhoAprendizado').innerHTML = html;
}

/**
 * Construir caminho de aprendizado (ordenação topológica)
 */
function construirCaminhoAprendizado() {
    // Implementar ordenação topológica simples
    const visitados = new Set();
    const caminho = [];
    
    function visitar(topicoId) {
        if (visitados.has(topicoId)) return;
        visitados.add(topicoId);
        
        const topico = topicosData.find(t => t.id === topicoId);
        if (!topico) return;
        
        // Visitar dependências primeiro
        topico.dependencias.forEach(depId => visitar(depId));
        
        // Adicionar ao caminho
        caminho.push(topico);
    }
    
    // Começar pelos tópicos sem dependências
    topicosData.forEach(topico => {
        if (topico.dependencias.length === 0) {
            visitar(topico.id);
        }
    });
    
    // Adicionar os restantes
    topicosData.forEach(topico => visitar(topico.id));
    
    return caminho.slice(0, 10); // Mostrar apenas os 10 primeiros
}

/**
 * Selecionar um tópico
 */
function selecionarTopico(topicoId) {
    // Redirecionar para página de pesquisa com o tópico selecionado
    window.location.href = `pesquisar-materia.html?topico=${topicoId}`;
}

/**
 * Obter nome do nível
 */
function getNivelNome(dificuldade) {
    const niveis = {
        1: 'Iniciante',
        2: 'Básico',
        3: 'Intermediário Baixo',
        4: 'Intermediário',
        5: 'Intermediário Alto',
        6: 'Avançado Baixo',
        7: 'Avançado',
        8: 'Muito Avançado',
        9: 'Especialista',
        10: 'Mestrado'
    };
    return niveis[dificuldade] || 'Desconhecido';
}

/**
 * Obter cor do nível
 */
function getCor(dificuldade) {
    if (dificuldade <= 2) return '#27ae60'; // Verde
    if (dificuldade <= 5) return '#f39c12'; // Laranja
    if (dificuldade <= 8) return '#e74c3c'; // Vermelho
    return '#8e44ad'; // Roxo
}

/**
 * Obter informações da categoria
 */
function getCategoriaInfo(categoria) {
    const categorias = {
        'matematica-basica': {
            nome: 'Matemática Básica',
            icon: '📐',
            cor: '#3498db'
        },
        'solucoes': {
            nome: 'Soluções Matemáticas',
            icon: '✨',
            cor: '#9b59b6'
        },
        'fisica': {
            nome: 'Física',
            icon: '⚡',
            cor: '#e74c3c'
        }
    };
    return categorias[categoria] || { nome: 'Desconhecido', icon: '❓' };
}

/**
 * Marcar tópico como completo
 */
function marcarTopicoCompleto(topicoId) {
    let completos = JSON.parse(localStorage.getItem('topicosCompletos')) || [];
    
    if (!completos.includes(topicoId)) {
        completos.push(topicoId);
    }
    
    localStorage.setItem('topicosCompletos', JSON.stringify(completos));
    atualizarEstatisticas();
}

/**
 * Inicializar quando DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    carregarTopicos();
    
    // Verificar se há tópico na URL
    const params = new URLSearchParams(window.location.search);
    const topico = params.get('topico');
    if (topico) {
        console.log('Tópico selecionado:', topico);
    }
});

// Expor funções globalmente
window.filtrarPorNivel = filtrarPorNivel;
window.selecionarTopico = selecionarTopico;
window.marcarTopicoCompleto = marcarTopicoCompleto;
