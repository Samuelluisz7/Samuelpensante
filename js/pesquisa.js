/**
 * pesquisa.js - Sistema de Pesquisa e Geração Automática de Aulas
 * Responsável por: Busca de tópicos, organização por dificuldade, geração de conteúdo
 */

let topicosData = [];
let topicoSelecionado = null;
let filtroAtual = 'todas';

/**
 * Carregar dados de tópicos do arquivo JSON
 */
async function carregarTopicos() {
    try {
        const response = await fetch('data/topicos.json');
        const data = await response.json();
        topicosData = data.topicos;
        console.log('Tópicos carregados:', topicosData.length);
    } catch (error) {
        console.error('Erro ao carregar tópicos:', error);
        mostrarErro('Erro ao carregar dados de tópicos');
    }
}

/**
 * Pesquisar matéria por nome
 */
function pesquisarMateria() {
    const termo = document.getElementById('inputPesquisa').value.toLowerCase().trim();
    
    if (!termo) {
        alert('Digite um termo para pesquisar');
        return;
    }

    const resultados = topicosData.filter(topico => {
        const match = topico.nome.toLowerCase().includes(termo) ||
                      topico.descricao.toLowerCase().includes(termo);
        
        if (filtroAtual !== 'todas') {
            return match && topico.categoria === filtroAtual;
        }
        return match;
    });

    exibirResultados(resultados, termo);
}

/**
 * Filtrar por categoria
 */
function filtrarCategoria(categoria) {
    filtroAtual = categoria;
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');

    // Se houver termo de pesquisa, pesquisar novamente
    const termo = document.getElementById('inputPesquisa').value;
    if (termo) {
        pesquisarMateria();
    }
}

/**
 * Exibir resultados da pesquisa
 */
function exibirResultados(resultados, termo) {
    const container = document.getElementById('resultados');
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #7f8c8d;">
                <p>Nenhum resultado encontrado para "${termo}"</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">
                    Tente usar palavras-chave diferentes ou navegue pela pirâmide de conhecimento
                </p>
            </div>
        `;
        return;
    }

    // Ordenar por dificuldade
    resultados.sort((a, b) => a.dificuldade - b.dificuldade);

    let html = `<h3>📋 Resultados encontrados: ${resultados.length}</h3>`;
    
    resultados.forEach(topico => {
        const categoria = topicosData[0].__categoria || topico.categoria;
        const nivelNome = getNivelNome(topico.dificuldade);
        
        html += `
            <div class="resultado-item" onclick="selecionarTopico('${topico.id}')">
                <div class="resultado-titulo">${topico.nome}</div>
                <div class="resultado-descricao">${topico.descricao}</div>
                <div class="resultado-info">
                    <span>
                        <span class="badge-dificuldade dificuldade-${topico.dificuldade}">
                            Nível ${topico.dificuldade}: ${nivelNome}
                        </span>
                    </span>
                    <span>
                        <span class="badge-categoria">${getCategoriaInfo(topico.categoria).nome}</span>
                    </span>
                    <span>
                        ${topico.dependencias.length > 0 ? 
                            `📚 ${topico.dependencias.length} pré-requisito(s)` : 
                            '✅ Sem pré-requisitos'
                        }
                    </span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/**
 * Selecionar um tópico para visualizar detalhes
 */
function selecionarTopico(topicoId) {
    topicoSelecionado = topicosData.find(t => t.id === topicoId);
    
    if (!topicoSelecionado) {
        console.error('Tópico não encontrado:', topicoId);
        return;
    }

    // Exibir informações do tópico
    exibirDetalhesTópico();
    
    // Scroll para o tópico selecionado
    document.getElementById('topicoSelecionado').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Exibir detalhes do tópico selecionado
 */
function exibirDetalhesTópico() {
    const container = document.getElementById('topicoSelecionado');
    
    // Preencher informações básicas
    document.getElementById('topicoTitulo').textContent = topicoSelecionado.nome;
    document.getElementById('topicoCategoriaInfo').textContent = getCategoriaInfo(topicoSelecionado.categoria).nome;
    document.getElementById('topicoDificuldadeInfo').innerHTML = `
        <span class="badge-dificuldade dificuldade-${topicoSelecionado.dificuldade}">
            Nível ${topicoSelecionado.dificuldade}: ${getNivelNome(topicoSelecionado.dificuldade)}
        </span>
    `;
    document.getElementById('topicoDescricaoInfo').textContent = topicoSelecionado.descricao;

    // Preencher pré-requisitos
    const depList = document.getElementById('topicoDependenciasInfo');
    if (topicoSelecionado.dependencias.length > 0) {
        depList.innerHTML = topicoSelecionado.dependencias.map(depId => {
            const depTopico = topicosData.find(t => t.id === depId);
            return `<li onclick="selecionarTopico('${depId}')" style="cursor: pointer;">
                ${depTopico ? depTopico.nome : depId}
            </li>`;
        }).join('');
    } else {
        depList.innerHTML = '<li>✅ Nenhum pré-requisito</li>';
    }

    // Preencher relacionados
    const relList = document.getElementById('topicoRelacionadosInfo');
    if (topicoSelecionado.relacionados.length > 0) {
        relList.innerHTML = topicoSelecionado.relacionados.map(relId => {
            const relTopico = topicosData.find(t => t.id === relId);
            return `<li onclick="selecionarTopico('${relId}')" style="cursor: pointer;">
                ${relTopico ? relTopico.nome : relId}
            </li>`;
        }).join('');
    } else {
        relList.innerHTML = '<li>Nenhum tópico relacionado</li>';
    }

    // Preencher exemplos
    const exList = document.getElementById('topicoExemplosInfo');
    if (topicoSelecionado.conteudo && topicoSelecionado.conteudo.exemplos.length > 0) {
        exList.innerHTML = topicoSelecionado.conteudo.exemplos.map(ex => 
            `<li>${ex}</li>`
        ).join('');
    } else {
        exList.innerHTML = '<li>Exemplos serão gerados automaticamente</li>';
    }

    // Exibir mapa de dependências
    exibirMapaDependencias();

    // Mostrar container
    container.style.display = 'block';
}

/**
 * Exibir mapa de dependências visualmente
 */
function exibirMapaDependencias() {
    const container = document.getElementById('mapaDependencias');
    
    if (!topicoSelecionado) return;

    let html = `<div style="padding: 20px;">`;
    html += `<h4 style="margin-bottom: 15px; color: #2c3e50;">📍 ${topicoSelecionado.nome}</h4>`;

    // Mostrar dependências
    if (topicoSelecionado.dependencias.length > 0) {
        html += `<div style="margin-bottom: 20px;">`;
        html += `<p style="font-weight: 600; color: #e74c3c; margin-bottom: 10px;">Você deve aprender primeiro:</p>`;
        
        topicoSelecionado.dependencias.forEach(depId => {
            const depTopico = topicosData.find(t => t.id === depId);
            if (depTopico) {
                html += `
                    <div style="
                        background: white;
                        padding: 10px;
                        margin-bottom: 8px;
                        border-radius: 4px;
                        border-left: 3px solid #e74c3c;
                        cursor: pointer;
                    " onclick="selecionarTopico('${depId}')">
                        ↑ ${depTopico.nome}
                        <span style="color: #7f8c8d; font-size: 0.85rem;">
                            (Nível ${depTopico.dificuldade})
                        </span>
                    </div>
                `;
            }
        });
        
        html += `</div>`;
    }

    // Mostrar relacionados
    if (topicoSelecionado.relacionados.length > 0) {
        html += `<div>`;
        html += `<p style="font-weight: 600; color: #3498db; margin-bottom: 10px;">Tópicos relacionados:</p>`;
        
        topicoSelecionado.relacionados.forEach(relId => {
            const relTopico = topicosData.find(t => t.id === relId);
            if (relTopico) {
                html += `
                    <div style="
                        background: white;
                        padding: 10px;
                        margin-bottom: 8px;
                        border-radius: 4px;
                        border-left: 3px solid #3498db;
                        cursor: pointer;
                    " onclick="selecionarTopico('${relId}')">
                        ↔ ${relTopico.nome}
                        <span style="color: #7f8c8d; font-size: 0.85rem;">
                            (Nível ${relTopico.dificuldade})
                        </span>
                    </div>
                `;
            }
        });
        
        html += `</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
}

/**
 * Criar aula automaticamente
 */
function criarAulaAutomatica() {
    if (!topicoSelecionado) {
        alert('Selecione um tópico primeiro');
        return;
    }

    // Mostrar loading
    const btn = event.target;
    const textOriginal = btn.textContent;
    btn.textContent = '⏳ Gerando aula...';
    btn.disabled = true;

    // Simular geração de conteúdo
    setTimeout(() => {
        const conteudoGerado = gerarConteudoAutomatico();
        
        // Salvar em localStorage
        localStorage.setItem(`aula_${topicoSelecionado.id}`, JSON.stringify(conteudoGerado));
        
        // Redirecionar para a aula
        const url = `pages/${topicoSelecionado.categoria}/aula-${topicoSelecionado.id}.html`;
        
        alert(`✅ Aula criada com sucesso!\n\nTítulo: ${topicoSelecionado.nome}\n\nRedirecionando...`);
        
        // Restaurar botão
        btn.textContent = textOriginal;
        btn.disabled = false;
        
        // Redirecionar (em produção, você criaria o arquivo real)
        // window.location.href = url;
        console.log('Aula seria criada em:', url);
        console.log('Conteúdo gerado:', conteudoGerado);
    }, 1500);
}

/**
 * Gerar conteúdo automaticamente
 */
function gerarConteudoAutomatico() {
    const topico = topicoSelecionado;
    
    return {
        id: topico.id,
        nome: topico.nome,
        categoria: topico.categoria,
        dificuldade: topico.dificuldade,
        descricao: topico.descricao,
        dependencias: topico.dependencias,
        relacionados: topico.relacionados,
        conteudo: {
            explicacao: topico.conteudo.explicacao,
            exemplos: topico.conteudo.exemplos,
            exercicios: gerarExercicios(topico),
            dicas: gerarDicas(topico)
        },
        dataCriacao: new Date().toISOString()
    };
}

/**
 * Gerar exercícios automaticamente
 */
function gerarExercicios(topico) {
    const exercicios = [];
    
    // Gerar 3-5 exercícios baseados no tópico
    for (let i = 1; i <= 4; i++) {
        exercicios.push({
            numero: i,
            pergunta: `Pergunta sobre ${topico.nome} - Exercício ${i}`,
            opcoes: [
                { letra: 'a', texto: 'Opção A' },
                { letra: 'b', texto: 'Opção B' },
                { letra: 'c', texto: 'Opção C' },
                { letra: 'd', texto: 'Opção D' }
            ],
            respostaCorreta: ['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)],
            explicacao: 'Explicação da resposta correta'
        });
    }
    
    return exercicios;
}

/**
 * Gerar dicas automaticamente
 */
function gerarDicas(topico) {
    const dicas = [];
    
    if (topico.dependencias.length > 0) {
        const deps = topico.dependencias.map(depId => {
            const dep = topicosData.find(t => t.id === depId);
            return dep ? dep.nome : depId;
        }).join(', ');
        
        dicas.push(`Certifique-se de que você domina: ${deps}`);
    }
    
    dicas.push(`Este é um tópico de nível ${topico.dificuldade}`);
    dicas.push(`Pratique os exercícios várias vezes para consolidar o aprendizado`);
    
    return dicas;
}

/**
 * Obter nome do nível de dificuldade
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
 * Obter informações da categoria
 */
function getCategoriaInfo(categoria) {
    const categorias = {
        'matematica-basica': {
            nome: 'Matemática Básica',
            descricao: 'Fundamentos essenciais',
            icon: '📐',
            cor: '#3498db'
        },
        'solucoes': {
            nome: 'Soluções Matemáticas',
            descricao: 'Tópicos avançados',
            icon: '✨',
            cor: '#9b59b6'
        },
        'fisica': {
            nome: 'Física',
            descricao: 'Conceitos de física',
            icon: '⚡',
            cor: '#e74c3c'
        }
    };
    return categorias[categoria] || { nome: 'Desconhecido', icon: '❓' };
}

/**
 * Mostrar erro
 */
function mostrarErro(mensagem) {
    const container = document.getElementById('resultados');
    container.innerHTML = `
        <div style="
            background-color: #fadbd8;
            border-left: 4px solid #e74c3c;
            padding: 15px;
            border-radius: 4px;
            color: #721c24;
        ">
            <strong>❌ Erro:</strong> ${mensagem}
        </div>
    `;
}

/**
 * Permitir pesquisa com Enter
 */
document.addEventListener('DOMContentLoaded', function() {
    carregarTopicos();
    
    const input = document.getElementById('inputPesquisa');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                pesquisarMateria();
            }
        });
    }
});

// Expor funções globalmente
window.pesquisarMateria = pesquisarMateria;
window.filtrarCategoria = filtrarCategoria;
window.selecionarTopico = selecionarTopico;
window.criarAulaAutomatica = criarAulaAutomatica;
