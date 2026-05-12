# 🔐 Sistema de Login - Documentação

## O Que É?

Um sistema de **proteção por senha** para seu site de estudos. Quando alguém tenta acessar, precisa digitar a senha correta.

## 🚀 Como Funciona?

### Fluxo de Acesso

```
Visitante acessa o site
         ↓
Vê a página de LOGIN
         ↓
Digita a senha
         ↓
Senha está correta?
    ↙          ↘
  SIM          NÃO
   ↓            ↓
ENTRA      Mensagem de erro
   ↓       Tenta novamente
Acessa
o site
```

## 🔑 Senhas Padrão

Por padrão, existem **2 senhas válidas**:

| Senha | Descrição |
|-------|-----------|
| `123456` | Senha padrão (fácil para testes) |
| `estudos2026` | Senha alternativa |

## 📝 Como Mudar a Senha?

### Opção 1: Editar o arquivo `login.html`

1. Abra o arquivo `login.html`
2. Procure por esta linha (por volta da linha 200):

```javascript
const SENHAS_VALIDAS = [
    '123456',      // Senha padrão
    'estudos2026'  // Senha alternativa
];
```

3. Mude as senhas para as que você quer:

```javascript
const SENHAS_VALIDAS = [
    'minhasenha123',    // Sua nova senha
    'outrasenha456'     // Outra opção
];
```

4. Salve o arquivo

### Opção 2: Usar Apenas Uma Senha

```javascript
const SENHAS_VALIDAS = [
    'senhaforte2026'    // Apenas uma senha
];
```

## ⏰ Tempo de Sessão

O site oferece 2 opções:

### Opção 1: Lembrar por 7 dias
- Se o usuário marcar "Lembrar por 7 dias"
- Não precisa digitar a senha novamente por 7 dias
- Útil para uso frequente

### Opção 2: 1 dia
- Se não marcar "Lembrar"
- A sessão expira em 24 horas
- Mais seguro

## 🔓 Como Fazer Logout?

No site, no rodapé, existe um link **"Sair da Conta"** que:
1. Remove a sessão
2. Redireciona para a página de login
3. Força digitar a senha novamente

## 💾 Como Funciona Internamente?

O sistema usa **localStorage** do navegador:

```javascript
// Quando faz login com sucesso:
localStorage.setItem('loginSite', JSON.stringify({
    timestamp: 1234567890,        // Quando fez login
    expiracao: 1234567890000,     // Quando expira
    lembrar: true                 // Se marcou "lembrar"
}));

// Quando tenta acessar:
// Verifica se existe e se não expirou
// Se expirou, redireciona para login
```

## 🔒 Segurança

### ⚠️ Importante!

Este sistema é **seguro para uso básico**, mas:

- ✅ Protege contra visitantes casuais
- ✅ Usa localStorage (seguro no navegador)
- ✅ Sessão expira automaticamente
- ⚠️ NÃO é criptografado (não use para dados muito sensíveis)
- ⚠️ A senha está visível no código (não use senhas reais importantes)

### Se Precisar de Mais Segurança:

Para um site com dados muito sensíveis, você precisaria:
- Servidor backend com autenticação
- Banco de dados
- Criptografia SSL/HTTPS
- Tokens JWT

Mas para um site de estudos, este sistema é perfeito!

## 🎨 Customizar a Página de Login

### Mudar o Logo

Na linha 94 do `login.html`:

```html
<h1>📚</h1>  <!-- Mude o emoji -->
```

Opções de emojis:
- 📚 Livro
- 🎓 Formatura
- 🧠 Cérebro
- 💡 Ideia
- 🔐 Cadeado

### Mudar as Cores

Na linha 20 do `login.html`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Mude para outras cores:
- `#667eea` → `#3498db` (azul)
- `#764ba2` → `#2ecc71` (verde)
- `#667eea` → `#e74c3c` (vermelho)

### Mudar o Texto

Procure por:
- `"Site de Estudos"` → seu nome
- `"Acesso Protegido"` → sua mensagem
- `"Código de Acesso"` → seu rótulo

## 📱 Funciona em Celular?

✅ **Sim!** O design é totalmente responsivo:
- Funciona em celulares
- Funciona em tablets
- Funciona em computadores

## 🐛 Troubleshooting

### Problema: "Esqueci a senha"

**Solução:**
1. Abra o navegador (F12)
2. Vá para Console
3. Digite: `localStorage.removeItem('loginSite')`
4. Pressione Enter
5. Recarregue a página
6. Agora pode digitar a senha novamente

### Problema: "Senha não funciona"

**Solução:**
1. Verifique se a senha está correta em `login.html`
2. Certifique-se de não ter espaços extras
3. Senhas são **case-sensitive** (maiúsculas/minúsculas importam)

### Problema: "Não consigo sair"

**Solução:**
1. Clique em "Sair da Conta" no rodapé
2. Se não funcionar, abra o console (F12)
3. Digite: `localStorage.removeItem('loginSite')`
4. Recarregue a página

## 🚀 Próximos Passos

1. **Teste a senha** - Digite `123456` e veja se funciona
2. **Mude a senha** - Edite `login.html` com sua senha
3. **Customize** - Mude cores, logo e textos
4. **Compartilhe** - Dê a senha para quem você quer que acesse

## 📚 Exemplo Completo

### Cenário: Proteger site com senha "estudos123"

1. Abra `login.html`
2. Procure por:
```javascript
const SENHAS_VALIDAS = [
    '123456',
    'estudos2026'
];
```

3. Mude para:
```javascript
const SENHAS_VALIDAS = [
    'estudos123'
];
```

4. Salve
5. Agora só funciona com `estudos123`

## 💡 Dicas

- Use uma senha forte (misture números, letras e caracteres)
- Mude a senha regularmente
- Não compartilhe a senha com muitas pessoas
- Se vazar, mude rapidamente
- Para múltiplos usuários, use um backend com banco de dados

## 📧 Suporte

Se tiver problemas:
1. Verifique se o arquivo `login.html` está no mesmo diretório que `index.html`
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Tente em outro navegador
4. Verifique o console (F12) para erros

---

**Versão:** 1.0  
**Data:** 2026  
**Status:** ✅ Funcionando e Pronto para Usar
