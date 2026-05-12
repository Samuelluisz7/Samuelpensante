# 📚 Site de Estudos - Matemática do Zero ao Avançado

Um site completo de estudos organizado e fácil de usar, criado para ajudar no aprendizado de Matemática Básica, Física e Soluções Matemáticas.

## 🎯 Objetivo

Este site foi desenvolvido para organizar materiais de estudo de forma clara, prática e acessível. O objetivo é facilitar o aprendizado através de:

- **Explicações simples** - Linguagem fácil de entender
- **Exemplos práticos** - Situações do dia a dia
- **Exercícios de fixação** - Para testar o conhecimento
- **Imagens e figuras** - Para visualizar melhor os conceitos

## 📁 Estrutura do Projeto

```
site-estudos/
├── index.html                          # Página inicial
├── css/
│   └── style.css                       # Estilos CSS (design responsivo)
├── js/
│   └── script.js                       # Funcionalidades JavaScript
├── pages/
│   ├── matematica-basica/
│   │   ├── index.html                  # Índice de aulas
│   │   ├── aula-1.html                 # Aula 1: Números Naturais (EXEMPLO COMPLETO)
│   │   ├── aula-2.html                 # Aula 2: Adição e Subtração
│   │   ├── aula-3.html                 # Aula 3: Multiplicação
│   │   ├── aula-4.html                 # Aula 4: Divisão
│   │   ├── aula-5.html                 # Aula 5: Números Decimais
│   │   ├── aula-6.html                 # Aula 6: Introdução a Frações
│   │   ├── aula-7.html                 # Aula 7: Operações com Frações
│   │   └── aula-template.html          # Template para criar novas aulas
│   ├── fisica/
│   │   ├── index.html                  # Índice de tópicos
│   │   ├── topico-1.html               # Tópico 1: Movimento e Velocidade
│   │   ├── topico-2.html               # Tópico 2: Força e Aceleração
│   │   ├── topico-3.html               # Tópico 3: Energia
│   │   ├── topico-4.html               # Tópico 4: Gravitação
│   │   ├── topico-5.html               # Tópico 5: Ondas e Som
│   │   └── topico-6.html               # Tópico 6: Luz e Óptica
│   ├── solucoes/
│   │   ├── index.html                  # Índice de aulas
│   │   ├── aula-1.html                 # Aula 1: Expressões Numéricas
│   │   ├── aula-2.html                 # Aula 2: Potenciação
│   │   ├── aula-3.html                 # Aula 3: Radiciação
│   │   ├── aula-4.html                 # Aula 4: Porcentagem
│   │   ├── aula-5.html                 # Aula 5: Razão e Proporção
│   │   ├── aula-6.html                 # Aula 6: Equações de 1º Grau
│   │   ├── aula-7.html                 # Aula 7: Sistemas de Equações
│   │   ├── aula-8.html                 # Aula 8: Equações de 2º Grau
│   │   ├── aula-9.html                 # Aula 9: Funções
│   │   ├── aula-10.html                # Aula 10: Geometria Básica
│   │   └── aula-11.html                # Aula 11: Trigonometria Básica
│   └── images/                         # Pasta para imagens (ainda vazia)
└── README.md                           # Este arquivo
```

## ✨ Novas Funcionalidades!

### 🔍 Pesquisar Matéria
Digite qualquer tópico e o site encontrará automaticamente, organizando por dificuldade e mostrando pré-requisitos!

### 🔺 Pirâmide de Conhecimento
Visualize todos os 24 tópicos em uma pirâmide interativa, do básico ao avançado.

### 🤖 Geração Automática de Aulas
O site gera automaticamente explicações, exemplos e exercícios para qualquer tópico!

### 🗺️ Mapa de Dependências
Veja exatamente o que você precisa aprender antes de cada tópico.

## 🚀 Como Usar

### Abrir o Site

1. Abra o arquivo `index.html` em seu navegador
2. Você verá a página inicial com as três seções principais
3. Use o menu para navegar entre as seções
4. Clique em "🔍 Pesquisar Matéria" para buscar tópicos
5. Clique em "🔺 Pirâmide" para visualizar a hierarquia

### Estrutura de Cada Aula

Cada aula segue este padrão:

1. **📖 Explicação** - Conceitos explicados de forma clara
2. **🖼️ Visualização** - Espaços para inserir imagens/figuras
3. **💡 Exemplos Práticos** - Exemplos do dia a dia
4. **✅ Exercícios de Fixação** - Perguntas para testar o conhecimento

### Adicionar Conteúdo

#### Para criar uma nova aula em Matemática Básica:

1. Abra o arquivo `pages/matematica-basica/aula-template.html`
2. Copie todo o conteúdo
3. Crie um novo arquivo chamado `aula-X.html` (onde X é o número)
4. Cole o conteúdo e substitua os placeholders:
   - `[NÚMERO]` - Número da aula
   - `[TÍTULO DA AULA]` - Título da aula
   - `[CONCEITO]` - Conceito principal
   - `[PERGUNTA]` - Perguntas dos exercícios
   - `[INSERIR IMAGEM AQUI]` - Espaço para imagens

#### Para adicionar imagens:

1. Salve as imagens na pasta `pages/images/`
2. No HTML, substitua `[INSERIR IMAGEM AQUI]` por:
   ```html
   <img src="../../images/nome-da-imagem.png" alt="Descrição">
   ```

#### Para adicionar exercícios:

1. Copie a estrutura de um exercício existente
2. Mude o `nomeExercicio` (ex: 'ex1' para 'ex5')
3. Mude a `respostaCorreta` (a, b, c ou d)
4. Mude a `mensagem` com feedback personalizado

## 🎨 Personalização

### Cores

As cores principais estão definidas no arquivo `css/style.css` no topo:

```css
:root {
    --cor-primaria: #2c3e50;      /* Azul escuro */
    --cor-secundaria: #3498db;    /* Azul claro */
    --cor-destaque: #e74c3c;      /* Vermelho */
    --cor-sucesso: #27ae60;       /* Verde */
    --cor-fundo: #ecf0f1;         /* Cinza claro */
}
```

Para mudar as cores, edite estes valores.

### Fonte

A fonte padrão é 'Segoe UI'. Para mudar, edite em `css/style.css`:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

## 📱 Responsividade

O site é totalmente responsivo e funciona bem em:

- ✅ Computadores (1200px+)
- ✅ Tablets (768px - 1199px)
- ✅ Celulares (até 767px)

## 🔧 Funcionalidades JavaScript

### Verificar Respostas

```javascript
verificarResposta('ex1', 'b', 'Mensagem de feedback personalizada')
```

- `'ex1'` - Nome do grupo de radio buttons
- `'b'` - Letra da resposta correta
- Mensagem personalizada (opcional)

### Marcar Aulas Completas

O site salva automaticamente quais aulas você completou no navegador (localStorage).

## 📝 Exemplo de Aula Completa

Veja `pages/matematica-basica/aula-1.html` para um exemplo completo de como estruturar uma aula com:

- Explicações
- Exemplos práticos
- Exercícios com verificação
- Navegação entre aulas

## 💡 Dicas para Melhor Aprendizado

1. **Comece pela Matemática Básica** - Ela é a base de tudo
2. **Siga a sequência** - Cada aula se baseia na anterior
3. **Faça todos os exercícios** - Eles ajudam a consolidar o aprendizado
4. **Revise quando tiver dúvidas** - Volte às aulas anteriores se necessário
5. **Use as imagens** - Elas ajudam a visualizar os conceitos

## 🐛 Troubleshooting

### As imagens não aparecem

- Verifique se o caminho está correto
- Use `../../images/nome-da-imagem.png` para aulas
- Use `../../../images/nome-da-imagem.png` se necessário

### Os exercícios não funcionam

- Verifique se o arquivo `js/script.js` está sendo carregado
- Verifique se o `nomeExercicio` está correto
- Abra o console do navegador (F12) para ver erros

### O site não abre

- Certifique-se de abrir o `index.html` em um navegador
- Não abra como arquivo local (use um servidor local se possível)

## 📧 Feedback

Se tiver sugestões ou encontrar problemas, anote-os para melhorar o site!

## 📄 Licença

Este projeto foi criado para fins educacionais.

---

**Criado com ❤️ para facilitar o aprendizado de Matemática e Física**
