# 🌐 Integração com APIs Externas

Este documento explica como integrar o site com APIs externas para enriquecer o conteúdo educacional.

## APIs Recomendadas

### 1. **Wikipedia API** (Gratuita)
Buscar definições e explicações de tópicos

```javascript
// Exemplo de uso
const termo = "Equação de segundo grau";
const url = `https://pt.wikipedia.org/w/api.php?action=query&titles=${termo}&prop=extracts&explaintext=true&format=json`;

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
```

**Vantagens:**
- Gratuita
- Sem autenticação necessária
- Conteúdo confiável
- Disponível em português

**Desvantagens:**
- Conteúdo genérico
- Pode ser muito técnico

---

### 2. **Wolfram Alpha API** (Freemium)
Cálculos matemáticos e visualizações

```javascript
// Exemplo de uso
const appId = "SEU_APP_ID";
const query = "solve x^2 + 3x + 2 = 0";
const url = `http://api.wolframalpha.com/v2/query?input=${query}&appid=${appId}&output=json`;

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
```

**Vantagens:**
- Excelente para matemática
- Fornece passo a passo
- Visualizações gráficas

**Desvantagens:**
- Requer chave de API
- Limite de requisições
- Plano pago para uso intensivo

---

### 3. **OpenAI API** (Paga)
Gerar conteúdo educacional com IA

```javascript
// Exemplo de uso
const apiKey = "SEU_API_KEY";
const prompt = "Explique equações de segundo grau de forma simples para um iniciante";

fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
    })
})
.then(response => response.json())
.then(data => console.log(data.choices[0].message.content));
```

**Vantagens:**
- Gera conteúdo de alta qualidade
- Pode personalizar explicações
- Excelente para exemplos

**Desvantagens:**
- Requer pagamento
- Limite de tokens
- Requer chave de API segura

---

### 4. **Google Custom Search API** (Freemium)
Buscar recursos educacionais

```javascript
// Exemplo de uso
const apiKey = "SEU_API_KEY";
const searchEngineId = "SEU_SEARCH_ENGINE_ID";
const query = "equação de segundo grau exercícios";

const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data.items));
```

**Vantagens:**
- Busca na web
- Pode filtrar por site
- Gratuito até 100 buscas/dia

**Desvantagens:**
- Limite de requisições
- Requer configuração
- Resultados podem ser variados

---

### 5. **MathJax** (Gratuita)
Renderizar fórmulas matemáticas

```html
<!-- Incluir no HTML -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- Usar em fórmulas -->
<p>A fórmula de Bhaskara é: $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$</p>
```

**Vantagens:**
- Gratuita
- Renderiza fórmulas lindas
- Suporta LaTeX

**Desvantagens:**
- Adiciona peso ao site
- Requer JavaScript

---

## Implementação Recomendada

### Fase 1: Sem APIs (Atual)
- ✅ Conteúdo estático em JSON
- ✅ Geração básica de exercícios
- ✅ Interface responsiva

### Fase 2: APIs Gratuitas
- 📌 Wikipedia para definições
- 📌 MathJax para fórmulas
- 📌 Google Custom Search para recursos

### Fase 3: APIs Pagas (Opcional)
- 💰 OpenAI para conteúdo personalizado
- 💰 Wolfram Alpha para cálculos
- 💰 Planos educacionais especiais

---

## Como Adicionar uma API

### Passo 1: Obter Chave de API
1. Acesse o site da API
2. Crie uma conta
3. Gere uma chave de API
4. Guarde em local seguro

### Passo 2: Criar Arquivo de Configuração
```javascript
// config/apis.js
const APIS = {
    WIKIPEDIA: {
        baseUrl: 'https://pt.wikipedia.org/w/api.php',
        enabled: true
    },
    OPENAI: {
        baseUrl: 'https://api.openai.com/v1',
        apiKey: process.env.OPENAI_API_KEY,
        enabled: false // Ativar quando tiver chave
    },
    WOLFRAM_ALPHA: {
        baseUrl: 'http://api.wolframalpha.com/v2',
        appId: process.env.WOLFRAM_APP_ID,
        enabled: false
    }
};
```

### Passo 3: Criar Função Wrapper
```javascript
// js/api-client.js
async function buscarDefinicao(termo) {
    try {
        const response = await fetch(
            `${APIS.WIKIPEDIA.baseUrl}?action=query&titles=${termo}&prop=extracts&format=json`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar definição:', error);
        return null;
    }
}
```

### Passo 4: Usar no Site
```javascript
// Ao criar uma aula
const definicao = await buscarDefinicao('Equação de segundo grau');
if (definicao) {
    document.getElementById('explicacao').innerHTML = definicao;
}
```

---

## Segurança

### ⚠️ Nunca exponha suas chaves de API!

**Errado:**
```javascript
const apiKey = "sk-1234567890abcdef"; // ❌ Nunca faça isso!
```

**Correto:**
```javascript
// Use variáveis de ambiente
const apiKey = process.env.OPENAI_API_KEY;

// Ou use um backend para fazer as requisições
fetch('/api/openai', {
    method: 'POST',
    body: JSON.stringify({ prompt: 'Sua pergunta' })
});
```

---

## Exemplos de Uso

### Exemplo 1: Buscar Definição
```javascript
async function enriquecerConteudo(topico) {
    const definicao = await buscarDefinicao(topico.nome);
    const exemplos = await buscarExemplos(topico.nome);
    
    return {
        ...topico,
        definicao,
        exemplos
    };
}
```

### Exemplo 2: Gerar Exercícios com IA
```javascript
async function gerarExerciciosComIA(topico) {
    const prompt = `Gere 5 exercícios sobre ${topico} para iniciantes`;
    const resposta = await chamarOpenAI(prompt);
    return resposta;
}
```

### Exemplo 3: Buscar Recursos
```javascript
async function buscarRecursos(topico) {
    const resultados = await buscarGoogle(topico);
    return resultados.filter(r => r.type === 'educacional');
}
```

---

## Próximos Passos

1. **Integrar Wikipedia** - Adicionar definições automáticas
2. **Adicionar MathJax** - Renderizar fórmulas lindas
3. **Conectar OpenAI** - Gerar conteúdo personalizado
4. **Implementar Cache** - Guardar resultados para melhor performance
5. **Adicionar Offline** - Funcionar sem internet

---

## Suporte

Para dúvidas sobre APIs:
- Consulte a documentação oficial
- Procure exemplos na comunidade
- Teste em ambiente de desenvolvimento primeiro

**Lembre-se:** Sempre teste com dados fictícios antes de usar em produção!
