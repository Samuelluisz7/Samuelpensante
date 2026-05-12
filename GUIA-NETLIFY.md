# 🚀 Guia Completo - Deploy no Netlify

## O Que é Netlify?

**Netlify** é uma plataforma que hospeda sites **gratuitamente** na internet. Seu site ficará disponível 24/7 com um link permanente.

## ✅ Pré-requisitos

- Conta no GitHub (gratuita)
- Conta no Netlify (gratuita)
- Este repositório Git pronto

## 📋 Passo a Passo

### **Passo 1: Criar Conta no GitHub**

1. Acesse: https://github.com
2. Clique em "Sign up"
3. Preencha seus dados:
   - Email
   - Senha
   - Nome de usuário (ex: samuelpensante)
4. Confirme seu email
5. Pronto! Você tem uma conta GitHub

### **Passo 2: Criar Repositório no GitHub**

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `samuelpensante-estudos`
   - **Description:** Plataforma de estudos com IA
   - **Public** (deixe público)
3. Clique em "Create repository"
4. Copie o link que aparece (algo como: `https://github.com/seu-usuario/samuelpensante-estudos.git`)

### **Passo 3: Fazer Upload do Código para GitHub**

Execute estes comandos no terminal:

```bash
cd /home/ubuntu/site-estudos

# Adicionar repositório remoto (substitua pela sua URL)
git remote add origin https://github.com/SEU-USUARIO/samuelpensante-estudos.git

# Renomear branch para main
git branch -M main

# Fazer push (enviar para GitHub)
git push -u origin main
```

**Você será pedido para:**
- Digitar seu email do GitHub
- Digitar sua senha (ou token de acesso)

### **Passo 4: Criar Conta no Netlify**

1. Acesse: https://netlify.com
2. Clique em "Sign up"
3. Escolha "Sign up with GitHub"
4. Autorize o Netlify a acessar seu GitHub
5. Pronto!

### **Passo 5: Fazer Deploy no Netlify**

1. No Netlify, clique em "New site from Git"
2. Selecione "GitHub"
3. Procure por `samuelpensante-estudos`
4. Clique para selecionar
5. Deixe as configurações padrão
6. Clique em "Deploy site"

**Aguarde 1-2 minutos...**

Seu site estará online em um link como:
```
https://samuelpensante-estudos.netlify.app
```

### **Passo 6: Conectar Seu Domínio (samuelpensante.com)**

#### **Opção A: Registrar Domínio no Netlify** (Recomendado)

1. No Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Digite: `samuelpensante.com`
4. Clique em "Verify"
5. Clique em "Yes, add domain"
6. Escolha "Register new domain"
7. Pague (~R$ 30-50/ano)
8. Pronto! Seu domínio está conectado

#### **Opção B: Registrar em Outro Lugar**

Se você registrar o domínio em outro lugar (Registro.br, GoDaddy, etc):

1. Copie os **nameservers do Netlify**:
   - `dns1.netlify.com`
   - `dns2.netlify.com`
   - `dns3.netlify.com`
   - `dns4.netlify.com`

2. No seu registrador de domínio, mude os nameservers para os do Netlify

3. Aguarde 24-48 horas para propagação

4. Seu domínio estará conectado!

## 🎯 Resultado Final

Após seguir estes passos, você terá:

✅ Site hospedado no Netlify (gratuito)
✅ Domínio `samuelpensante.com` apontando para o site
✅ Site disponível 24/7 na internet
✅ HTTPS automático (seguro)
✅ Atualizações automáticas (push no GitHub = site atualiza)

## 🔄 Como Atualizar o Site

Sempre que você quiser fazer mudanças:

1. Edite os arquivos localmente
2. Execute no terminal:

```bash
cd /home/ubuntu/site-estudos
git add -A
git commit -m "Descrição da mudança"
git push origin main
```

3. Aguarde 1-2 minutos
4. Seu site estará atualizado automaticamente!

## 🔐 Segurança

- Seu site tem HTTPS automático (cadeado verde)
- Dados são criptografados
- Chave de API Gemini é salva localmente (não enviada)
- Senha do site é protegida

## 💡 Dicas

- Use nomes descritivos nos commits
- Teste localmente antes de fazer push
- Mantenha a chave de API Gemini segura
- Faça backup regular do código

## 🆘 Troubleshooting

### Problema: "Erro ao fazer push"

**Solução:**
```bash
git config --global credential.helper store
git push origin main
# Digite suas credenciais
```

### Problema: "Domínio não funciona"

**Solução:**
- Aguarde 24-48 horas para propagação DNS
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Tente em outro navegador

### Problema: "Site não atualiza após push"

**Solução:**
- Aguarde 2-3 minutos
- Limpe o cache do navegador
- Verifique se o commit foi bem-sucedido

## 📞 Suporte

- **Netlify:** https://support.netlify.com
- **GitHub:** https://docs.github.com
- **Registro.br:** https://www.registro.br

## 📚 Próximos Passos

1. Crie conta no GitHub
2. Crie repositório
3. Faça upload do código
4. Crie conta no Netlify
5. Conecte GitHub ao Netlify
6. Registre seu domínio
7. Pronto! Site permanente! 🎉

---

**Versão:** 1.0
**Data:** 2026
**Status:** ✅ Guia Completo
