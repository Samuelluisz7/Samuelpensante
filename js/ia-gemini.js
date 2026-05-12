/**
 * ia-gemini.js - Integração com IA Gemini e Wikipédia
 * Responsável por: Gerar conteúdo com IA, buscar na Wikipédia, enriquecer respostas
 */

// Configuração da API Gemini
const GEMINI_API_KEY = localStorage.getItem('geminiApiKey') || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Configuração da Wikipédia
const WIKIPEDIA_API_URL = 'https://pt.wikipedia.org/w/api.php';

/**
 * Definir chave de API Gemini
 */
function definirChaveGemini(chave) {
    localStorage.setItem('geminiApiKey', chave);
    console.log('Chave Gemini salva com sucesso!');
}

/**
 * Buscar na Wikipédia
 */
async function buscarWikipedia(termo) {
    try {
        const params = new URLSearchParams({
            action: 'query',
            titles: termo,
            prop: 'extracts|pageimages',
            exintro: true,
            explaintext: true,
            format: 'json',
            origin: '*'
        });

        const response = await fetch(`${WIKIPEDIA_API_URL}?${params}`);
        const data = await response.json();

        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];

        if (page.extract) {
            return {
                sucesso: true,
                titulo: page.title,
                conteudo: page.extract,
                imagem: page.thumbnail?.source || null,
                url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
            };
        } else {
            return {
                sucesso: false,
                mensagem: `Nenhum resultado encontrado para "${termo}"`
            };
        }
    } catch (error) {
        console.error('Erro ao buscar Wikipédia:', error);
        return {
            sucesso: false,
            mensagem: 'Erro ao conectar com Wikipédia'
        };
    }
}

/**
 * Gerar conteúdo com Gemini
 */
async function gerarComGemini(prompt, contexto = '') {
    if (!GEMINI_API_KEY) {
        return {
            sucesso: false,
            mensagem: 'Chave de API Gemini não configurada. Configure em Configurações.'
        };
    }

    try {
        const promptCompleto = contexto 
            ? `${contexto}\n\n${prompt}`
            : prompt;

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: promptCompleto
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return {
                sucesso: true,
                conteudo: data.candidates[0].content.parts[0].text
            };
        } else {
            return {
                sucesso: false,
                mensagem: 'Erro ao gerar conteúdo com IA'
            };
        }
    } catch (error) {
        console.error('Erro ao chamar Gemini:', error);
        return {
            sucesso: false,
            mensagem: 'Erro ao conectar com Gemini'
        };
    }
}

/**
 * Pesquisa inteligente combinando Gemini + Wikipédia
 */
async function pesquisaInteligente(termo, disciplina = '') {
    try {
        // Buscar na Wikipédia
        const resultadoWiki = await buscarWikipedia(termo);

        // Preparar contexto para Gemini
        let contexto = `Você é um professor especializado em ${disciplina || 'educação geral'}.`;
        if (resultadoWiki.sucesso) {
            contexto += `\n\nInformação da Wikipédia sobre "${termo}":\n${resultadoWiki.conteudo.substring(0, 500)}...`;
        }

        // Gerar explicação com Gemini
        const prompt = `
Crie uma explicação educativa e clara sobre "${termo}" para estudantes do ensino médio.

Inclua:
1. Definição simples e clara
2. Conceitos principais
3. Exemplos práticos
4. Dicas de estudo

Mantenha a resposta concisa mas completa.
        `;

        const resultadoGemini = await gerarComGemini(prompt, contexto);

        return {
            sucesso: true,
            termo: termo,
            disciplina: disciplina,
            wikipedia: resultadoWiki,
            gemini: resultadoGemini,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Erro na pesquisa inteligente:', error);
        return {
            sucesso: false,
            mensagem: 'Erro ao realizar pesquisa'
        };
    }
}

/**
 * Gerar exercícios com Gemini
 */
async function gerarExerciciosComIA(topico, disciplina, quantidade = 5, dificuldade = 'média') {
    const prompt = `
Gere ${quantidade} exercícios sobre "${topico}" (${disciplina}) com dificuldade ${dificuldade}.

Para cada exercício, forneça:
1. Pergunta clara
2. 4 opções de resposta (A, B, C, D)
3. Resposta correta
4. Explicação breve

Formato JSON:
{
    "exercicios": [
        {
            "numero": 1,
            "pergunta": "...",
            "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."],
            "resposta_correta": "A",
            "explicacao": "..."
        }
    ]
}
    `;

    const resultado = await gerarComGemini(prompt);
    
    if (resultado.sucesso) {
        try {
            // Tentar fazer parse do JSON
            const jsonMatch = resultado.conteudo.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            console.error('Erro ao fazer parse JSON:', e);
        }
    }

    return resultado;
}

/**
 * Gerar resumo com Gemini
 */
async function gerarResumo(conteudo, tamanho = 'médio') {
    const tamanhos = {
        curto: '2-3 linhas',
        médio: '5-7 linhas',
        longo: '10-15 linhas'
    };

    const prompt = `
Crie um resumo de ${tamanhos[tamanho]} sobre:

${conteudo}

O resumo deve ser:
- Claro e conciso
- Destacar os pontos principais
- Fácil de entender
- Adequado para estudantes
    `;

    return await gerarComGemini(prompt);
}

/**
 * Responder dúvida do estudante
 */
async function responderDuvida(duvida, contextoTopico = '') {
    const prompt = `
Um estudante tem a seguinte dúvida:

"${duvida}"

${contextoTopico ? `Contexto: ${contextoTopico}` : ''}

Responda de forma:
- Educada e amigável
- Clara e compreensível
- Com exemplos práticos
- Incentivando o aprendizado
    `;

    return await gerarComGemini(prompt);
}

/**
 * Criar plano de estudos com IA
 */
async function criarPlanoEstudos(disciplina, objetivo, tempoDisponivel) {
    const prompt = `
Crie um plano de estudos personalizado com as seguintes informações:

Disciplina: ${disciplina}
Objetivo: ${objetivo}
Tempo disponível: ${tempoDisponivel}

O plano deve incluir:
1. Tópicos principais a estudar
2. Ordem recomendada
3. Tempo estimado para cada tópico
4. Recursos recomendados
5. Dicas de estudo
6. Forma de avaliar o progresso

Formato claro e estruturado.
    `;

    return await gerarComGemini(prompt);
}

/**
 * Analisar resposta do estudante
 */
async function analisarResposta(pergunta, respostaEstudante, respostaCorreta) {
    const prompt = `
Analise a resposta de um estudante:

Pergunta: ${pergunta}
Resposta do estudante: ${respostaEstudante}
Resposta correta: ${respostaCorreta}

Forneça:
1. Se está correta ou incorreta
2. Por quê
3. Explicação do conceito correto
4. Dica para melhorar
5. Reforço positivo se correto, ou encorajamento se incorreto
    `;

    return await gerarComGemini(prompt);
}

/**
 * Gerar questões de ENEM/Vestibular
 */
async function gerarQuestaoVestibular(disciplina, tema, ano = 2024) {
    const prompt = `
Gere uma questão estilo ENEM/Vestibular sobre:

Disciplina: ${disciplina}
Tema: ${tema}
Ano: ${ano}

A questão deve:
1. Ser realista e bem estruturada
2. Ter 5 alternativas (A a E)
3. Incluir contexto/situação
4. Ser desafiadora mas justa
5. Incluir a resposta correta e explicação

Formato:
QUESTÃO: [texto]
A) [opção]
B) [opção]
C) [opção]
D) [opção]
E) [opção]

RESPOSTA: [letra]
EXPLICAÇÃO: [texto]
    `;

    return await gerarComGemini(prompt);
}

/**
 * Cache de resultados
 */
const cacheResultados = {};

function salvarEmCache(chave, valor, tempoExpiracao = 3600000) { // 1 hora
    cacheResultados[chave] = {
        valor: valor,
        expiracao: Date.now() + tempoExpiracao
    };
}

function obterDoCache(chave) {
    const item = cacheResultados[chave];
    if (!item) return null;
    
    if (Date.now() > item.expiracao) {
        delete cacheResultados[chave];
        return null;
    }
    
    return item.valor;
}

/**
 * Pesquisa com cache
 */
async function pesquisaComCache(termo, disciplina) {
    const chave = `pesquisa_${termo}_${disciplina}`;
    const emCache = obterDoCache(chave);
    
    if (emCache) {
        console.log('Resultado obtido do cache');
        return emCache;
    }
    
    const resultado = await pesquisaInteligente(termo, disciplina);
    if (resultado.sucesso) {
        salvarEmCache(chave, resultado);
    }
    
    return resultado;
}

// Expor funções globalmente
window.definirChaveGemini = definirChaveGemini;
window.buscarWikipedia = buscarWikipedia;
window.gerarComGemini = gerarComGemini;
window.pesquisaInteligente = pesquisaInteligente;
window.gerarExerciciosComIA = gerarExerciciosComIA;
window.gerarResumo = gerarResumo;
window.responderDuvida = responderDuvida;
window.criarPlanoEstudos = criarPlanoEstudos;
window.analisarResposta = analisarResposta;
window.gerarQuestaoVestibular = gerarQuestaoVestibular;
window.pesquisaComCache = pesquisaComCache;

console.log('✅ Módulo de IA Gemini + Wikipédia carregado com sucesso!');
