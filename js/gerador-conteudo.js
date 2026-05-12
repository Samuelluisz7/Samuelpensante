/**
 * gerador-conteudo.js - Sistema de Geração Automática de Conteúdo
 * Responsável por: Gerar exemplos, exercícios e explicações automaticamente
 */

/**
 * Base de dados de templates para gerar conteúdo
 */
const TEMPLATES_CONTEUDO = {
    'numeros-naturais': {
        explicacoes: [
            'Números naturais são aqueles que usamos para contar: 0, 1, 2, 3, 4, 5...',
            'Eles aparecem em tudo na nossa vida: contagem, idade, quantidade de objetos.',
            'Números naturais são inteiros e positivos (não incluem negativos ou decimais).'
        ],
        exemplos: [
            { situacao: 'Contando pessoas', descricao: 'Quantas pessoas estão na sala?', resposta: '25 pessoas' },
            { situacao: 'Idade', descricao: 'Quantos anos você tem?', resposta: '15 anos' },
            { situacao: 'Quantidade', descricao: 'Quantos livros você tem?', resposta: '7 livros' }
        ],
        exercicios: [
            { pergunta: 'Qual é o primeiro número natural?', opcoes: ['0', '1', '-1', 'Não existe'], correta: 0 },
            { pergunta: 'Números naturais incluem números negativos?', opcoes: ['Sim', 'Não', 'Às vezes', 'Não sei'], correta: 1 },
            { pergunta: 'Qual número NÃO é natural?', opcoes: ['5', '10', '-3', '0'], correta: 2 }
        ]
    },
    'adicao-subtracao': {
        explicacoes: [
            'Adição é juntar quantidades. Subtração é tirar quantidades.',
            'Adição: 5 + 3 = 8 (5 mais 3 é igual a 8)',
            'Subtração: 10 - 4 = 6 (10 menos 4 é igual a 6)'
        ],
        exemplos: [
            { situacao: 'Compra', descricao: 'Você tinha 20 reais e gastou 8. Quanto sobrou?', resposta: '12 reais' },
            { situacao: 'Juntar', descricao: 'Você tem 3 maçãs e ganha 5. Quantas tem agora?', resposta: '8 maçãs' },
            { situacao: 'Troco', descricao: 'Você pagou 50 reais em algo que custa 35. Qual é o troco?', resposta: '15 reais' }
        ],
        exercicios: [
            { pergunta: '15 + 7 = ?', opcoes: ['20', '22', '25', '30'], correta: 1 },
            { pergunta: '50 - 18 = ?', opcoes: ['30', '32', '35', '40'], correta: 1 },
            { pergunta: 'Se você tem 12 e ganha 8, quanto tem no total?', opcoes: ['18', '20', '22', '25'], correta: 1 }
        ]
    },
    'multiplicacao': {
        explicacoes: [
            'Multiplicação é uma forma rápida de fazer adição repetida.',
            '3 × 4 = 12 (3 grupos de 4, ou 4 + 4 + 4 = 12)',
            'A tabuada ajuda a memorizar as multiplicações mais comuns.'
        ],
        exemplos: [
            { situacao: 'Grupos', descricao: 'Você tem 5 grupos com 3 pessoas cada. Quantas pessoas no total?', resposta: '15 pessoas' },
            { situacao: 'Preço', descricao: 'Cada livro custa 25 reais. Você quer 4 livros. Quanto vai gastar?', resposta: '100 reais' },
            { situacao: 'Área', descricao: 'Um retângulo tem 6 metros de comprimento e 4 de altura. Qual é a área?', resposta: '24 metros quadrados' }
        ],
        exercicios: [
            { pergunta: '6 × 7 = ?', opcoes: ['40', '42', '45', '50'], correta: 1 },
            { pergunta: '9 × 8 = ?', opcoes: ['70', '72', '75', '80'], correta: 1 },
            { pergunta: 'Se você tem 3 caixas com 12 ovos cada, quantos ovos tem?', opcoes: ['30', '36', '40', '45'], correta: 1 }
        ]
    },
    'divisao': {
        explicacoes: [
            'Divisão é repartir em partes iguais.',
            '12 ÷ 3 = 4 (12 dividido por 3 é igual a 4)',
            'Divisão é o inverso da multiplicação.'
        ],
        exemplos: [
            { situacao: 'Distribuição', descricao: 'Você tem 20 doces para distribuir entre 4 amigos. Cada um ganha quantos?', resposta: '5 doces' },
            { situacao: 'Grupos', descricao: 'Você tem 30 pessoas e quer fazer 5 grupos iguais. Quantas por grupo?', resposta: '6 pessoas' },
            { situacao: 'Preço', descricao: 'Uma dúzia de ovos (12) custa 18 reais. Quanto custa cada ovo?', resposta: '1,50 reais' }
        ],
        exercicios: [
            { pergunta: '24 ÷ 6 = ?', opcoes: ['3', '4', '5', '6'], correta: 1 },
            { pergunta: '35 ÷ 7 = ?', opcoes: ['4', '5', '6', '7'], correta: 1 },
            { pergunta: 'Se você tem 40 reais e quer dividir entre 8 pessoas, cada uma ganha?', opcoes: ['4 reais', '5 reais', '6 reais', '8 reais'], correta: 1 }
        ]
    },
    'fracao': {
        explicacoes: [
            'Frações representam partes de um todo.',
            '1/2 significa uma parte de duas (metade)',
            '3/4 significa três partes de quatro (três quartos)'
        ],
        exemplos: [
            { situacao: 'Pizza', descricao: 'Uma pizza inteira é dividida em 8 fatias. Você come 3. Qual fração comeu?', resposta: '3/8' },
            { situacao: 'Tempo', descricao: 'Uma hora tem 60 minutos. 15 minutos é qual fração da hora?', resposta: '1/4' },
            { situacao: 'Dinheiro', descricao: 'Você gastou 1/3 dos seus 30 reais. Quanto gastou?', resposta: '10 reais' }
        ],
        exercicios: [
            { pergunta: 'Qual fração representa metade?', opcoes: ['1/3', '1/2', '1/4', '2/4'], correta: 1 },
            { pergunta: 'Se uma pizza tem 8 fatias e você come 2, qual fração comeu?', opcoes: ['1/4', '1/3', '2/8', '1/2'], correta: 2 },
            { pergunta: '1/2 + 1/4 = ?', opcoes: ['1/6', '2/6', '3/4', '1/1'], correta: 2 }
        ]
    },
    'equacao-1-grau': {
        explicacoes: [
            'Equação é uma igualdade com uma incógnita (letra desconhecida).',
            'O objetivo é encontrar o valor da incógnita que torna a equação verdadeira.',
            'Usamos operações inversas para resolver: se tem +5, subtraímos 5 dos dois lados.'
        ],
        exemplos: [
            { situacao: 'Caixa misteriosa', descricao: 'x + 5 = 12. Qual é o valor de x?', resposta: 'x = 7' },
            { situacao: 'Multiplicação', descricao: '2x = 10. Qual é o valor de x?', resposta: 'x = 5' },
            { situacao: 'Complexa', descricao: '3x - 4 = 8. Qual é o valor de x?', resposta: 'x = 4' }
        ],
        exercicios: [
            { pergunta: 'Se x + 3 = 10, qual é o valor de x?', opcoes: ['5', '7', '10', '13'], correta: 1 },
            { pergunta: 'Se 2x = 14, qual é o valor de x?', opcoes: ['6', '7', '8', '12'], correta: 1 },
            { pergunta: 'Se x - 5 = 3, qual é o valor de x?', opcoes: ['2', '5', '8', '10'], correta: 2 }
        ]
    },
    'equacao-2-grau': {
        explicacoes: [
            'Equação de 2º grau tem a forma: ax² + bx + c = 0',
            'Usamos a fórmula de Bhaskara para resolver.',
            'Pode ter 0, 1 ou 2 soluções reais.'
        ],
        exemplos: [
            { situacao: 'Simples', descricao: 'x² - 5x + 6 = 0. Qual é a solução?', resposta: 'x = 2 ou x = 3' },
            { situacao: 'Complexa', descricao: '2x² + 3x - 2 = 0. Qual é a solução?', resposta: 'x = 1/2 ou x = -2' },
            { situacao: 'Sem solução real', descricao: 'x² + 1 = 0. Qual é a solução?', resposta: 'Sem solução real' }
        ],
        exercicios: [
            { pergunta: 'A fórmula de Bhaskara é usada para:', opcoes: ['Eq. 1º grau', 'Eq. 2º grau', 'Divisão', 'Frações'], correta: 1 },
            { pergunta: 'Na equação x² - 4 = 0, qual é a solução?', opcoes: ['x = 2', 'x = 2 ou x = -2', 'x = 4', 'Sem solução'], correta: 1 },
            { pergunta: 'Quantas soluções pode ter uma eq. 2º grau?', opcoes: ['1', '2', '0, 1 ou 2', '3 ou mais'], correta: 2 }
        ]
    }
};

/**
 * Gerar explicação para um tópico
 */
function gerarExplicacao(topicoId, indice = 0) {
    const template = TEMPLATES_CONTEUDO[topicoId];
    if (!template || !template.explicacoes) return null;
    
    const explicacoes = template.explicacoes;
    return explicacoes[indice % explicacoes.length];
}

/**
 * Gerar exemplos para um tópico
 */
function gerarExemplos(topicoId, quantidade = 3) {
    const template = TEMPLATES_CONTEUDO[topicoId];
    if (!template || !template.exemplos) return [];
    
    const exemplos = [];
    for (let i = 0; i < quantidade; i++) {
        exemplos.push(template.exemplos[i % template.exemplos.length]);
    }
    
    return exemplos;
}

/**
 * Gerar exercícios para um tópico
 */
function gerarExercicios(topicoId, quantidade = 4) {
    const template = TEMPLATES_CONTEUDO[topicoId];
    if (!template || !template.exercicios) return [];
    
    const exercicios = [];
    for (let i = 0; i < quantidade; i++) {
        const exOriginal = template.exercicios[i % template.exercicios.length];
        exercicios.push({
            numero: i + 1,
            pergunta: exOriginal.pergunta,
            opcoes: exOriginal.opcoes.map((opt, idx) => ({
                letra: String.fromCharCode(97 + idx),
                texto: opt
            })),
            respostaCorreta: String.fromCharCode(97 + exOriginal.correta),
            explicacao: `A resposta correta é: ${exOriginal.opcoes[exOriginal.correta]}`
        });
    }
    
    return exercicios;
}

/**
 * Gerar dicas para um tópico
 */
function gerarDicas(topico) {
    const dicas = [];
    
    // Dica baseada em dificuldade
    if (topico.dificuldade <= 2) {
        dicas.push('💡 Este é um tópico fundamental. Certifique-se de entender bem!');
    } else if (topico.dificuldade <= 5) {
        dicas.push('💡 Este tópico combina vários conceitos. Revise os anteriores se tiver dúvida.');
    } else {
        dicas.push('💡 Este é um tópico avançado. Tenha paciência e estude com calma.');
    }
    
    // Dica baseada em dependências
    if (topico.dependencias && topico.dependencias.length > 0) {
        dicas.push(`📚 Você deve dominar os pré-requisitos antes de começar este tópico.`);
    }
    
    // Dica geral
    dicas.push('✅ Faça todos os exercícios para consolidar o aprendizado!');
    dicas.push('🔄 Revise este tópico regularmente para não esquecer.');
    
    return dicas;
}

/**
 * Gerar HTML de uma aula completa
 */
function gerarHTMLAula(topico, conteudoGerado) {
    const exemplos = gerarExemplos(topico.id, 3);
    const exercicios = gerarExercicios(topico.id, 4);
    const dicas = gerarDicas(topico);
    
    let html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${topico.nome} | Site de Estudos</title>
        <link rel="stylesheet" href="../../css/style.css">
    </head>
    <body>
        <header>
            <h1>📚 Matemática do Zero ao Avançado</h1>
            <p>${topico.nome}</p>
        </header>

        <nav>
            <ul>
                <li><a href="../../index.html">Início</a></li>
                <li><a href="../../pesquisar-materia.html">🔍 Pesquisar</a></li>
                <li><a href="../../piramide-conhecimento.html">🔺 Pirâmide</a></li>
            </ul>
        </nav>

        <main>
            <article>
                <h2>${topico.nome}</h2>
                
                <div class="dica">
                    <strong>📝 Objetivo:</strong> ${topico.descricao}
                </div>

                <h3>📖 Explicação</h3>
                <div class="secao-explicacao">
                    <p>${gerarExplicacao(topico.id)}</p>
                </div>

                <h3>💡 Exemplos Práticos</h3>
                ${exemplos.map((ex, i) => `
                <div class="exemplo">
                    <h4>Exemplo ${i + 1}: ${ex.situacao}</h4>
                    <p><strong>Situação:</strong> ${ex.descricao}</p>
                    <p><strong>Resposta:</strong> ${ex.resposta}</p>
                </div>
                `).join('')}

                <h3>✅ Exercícios de Fixação</h3>
                <div class="secao-exercicios">
                    ${exercicios.map(ex => `
                    <div class="exercicio">
                        <div class="exercicio-numero">Exercício ${ex.numero}</div>
                        <div class="exercicio-pergunta">${ex.pergunta}</div>
                        <div class="exercicio-opcoes">
                            ${ex.opcoes.map(opt => `
                            <label>
                                <input type="radio" name="ex${ex.numero}" value="${opt.letra}">
                                <span>${opt.letra.toUpperCase()}) ${opt.texto}</span>
                            </label>
                            `).join('')}
                        </div>
                        <button class="btn btn-pequeno btn-primario" onclick="verificarResposta('ex${ex.numero}', '${ex.respostaCorreta}', '${ex.explicacao}')">
                            Verificar
                        </button>
                        <div class="exercicio-resposta" id="resposta-ex${ex.numero}"></div>
                    </div>
                    `).join('')}
                </div>

                <h3>💡 Dicas Importantes</h3>
                ${dicas.map(dica => `
                <div class="alerta" style="margin: 10px 0;">
                    ${dica}
                </div>
                `).join('')}
            </article>
        </main>

        <footer>
            <p>&copy; 2026 Seu Site de Estudos</p>
        </footer>

        <script src="../../js/script.js"></script>
    </body>
    </html>
    `;
    
    return html;
}

/**
 * Gerar conteúdo JSON completo para uma aula
 */
function gerarConteudoJSON(topico) {
    return {
        id: topico.id,
        nome: topico.nome,
        categoria: topico.categoria,
        dificuldade: topico.dificuldade,
        descricao: topico.descricao,
        dependencias: topico.dependencias,
        relacionados: topico.relacionados,
        conteudo: {
            explicacoes: TEMPLATES_CONTEUDO[topico.id]?.explicacoes || [],
            exemplos: gerarExemplos(topico.id),
            exercicios: gerarExercicios(topico.id),
            dicas: gerarDicas(topico)
        },
        dataCriacao: new Date().toISOString(),
        versao: '1.0'
    };
}

/**
 * Exportar conteúdo como arquivo
 */
function exportarConteudo(topico, formato = 'json') {
    let conteudo;
    let nomeArquivo;
    let tipo;
    
    if (formato === 'json') {
        conteudo = JSON.stringify(gerarConteudoJSON(topico), null, 2);
        nomeArquivo = `${topico.id}.json`;
        tipo = 'application/json';
    } else if (formato === 'html') {
        conteudo = gerarHTMLAula(topico);
        nomeArquivo = `${topico.id}.html`;
        tipo = 'text/html';
    }
    
    // Criar blob e download
    const blob = new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Expor funções globalmente
window.gerarExplicacao = gerarExplicacao;
window.gerarExemplos = gerarExemplos;
window.gerarExercicios = gerarExercicios;
window.gerarDicas = gerarDicas;
window.gerarHTMLAula = gerarHTMLAula;
window.gerarConteudoJSON = gerarConteudoJSON;
window.exportarConteudo = exportarConteudo;
