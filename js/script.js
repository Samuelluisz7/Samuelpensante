/**
 * Script.js - Funcionalidades do Site de Estudos
 * Responsável por: Verificação de respostas, interatividade, etc.
 */

/**
 * Função para verificar respostas de exercícios
 * @param {string} nomeExercicio - Nome do grupo de radio buttons (ex: 'ex1')
 * @param {string} respostaCorreta - Letra da resposta correta (ex: 'b')
 * @param {string} mensagem - Mensagem personalizada de feedback
 */
function verificarResposta(nomeExercicio, respostaCorreta, mensagem = '') {
    // Obter a resposta selecionada
    const respostaSelecionada = document.querySelector(`input[name="${nomeExercicio}"]:checked`);
    
    // Verificar se uma resposta foi selecionada
    if (!respostaSelecionada) {
        alert('Por favor, selecione uma resposta antes de verificar!');
        return;
    }
    
    // Obter o elemento de resposta
    const elementoResposta = document.getElementById(`resposta-${nomeExercicio}`);
    
    // Verificar se a resposta está correta
    const estaCorreta = respostaSelecionada.value === respostaCorreta;
    
    // Limpar classes anteriores
    elementoResposta.classList.remove('correta', 'incorreta', 'mostrar');
    
    // Adicionar classe apropriada
    if (estaCorreta) {
        elementoResposta.classList.add('correta', 'mostrar');
        elementoResposta.innerHTML = `
            <strong>✅ Parabéns! Você acertou!</strong><br>
            ${mensagem || 'Sua resposta está correta!'}
        `;
    } else {
        elementoResposta.classList.add('incorreta', 'mostrar');
        elementoResposta.innerHTML = `
            <strong>❌ Resposta incorreta</strong><br>
            ${mensagem || 'Tente novamente! Releia a explicação acima.'}
        `;
    }
    
    // Scroll para o elemento de resposta
    elementoResposta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Função para limpar todas as respostas de um exercício
 * @param {string} nomeExercicio - Nome do grupo de radio buttons
 */
function limparResposta(nomeExercicio) {
    // Desselecionar todos os radio buttons
    document.querySelectorAll(`input[name="${nomeExercicio}"]`).forEach(radio => {
        radio.checked = false;
    });
    
    // Limpar o elemento de resposta
    const elementoResposta = document.getElementById(`resposta-${nomeExercicio}`);
    elementoResposta.classList.remove('correta', 'incorreta', 'mostrar');
    elementoResposta.innerHTML = '';
}

/**
 * Função para marcar uma aula como completa
 * Salva no localStorage do navegador
 * @param {string} aulaId - ID único da aula
 */
function marcarAulaCompleta(aulaId) {
    // Obter aulas completas do localStorage
    let aulasCompletas = JSON.parse(localStorage.getItem('aulasCompletas')) || [];
    
    // Adicionar a aula se não estiver já
    if (!aulasCompletas.includes(aulaId)) {
        aulasCompletas.push(aulaId);
    }
    
    // Salvar no localStorage
    localStorage.setItem('aulasCompletas', JSON.stringify(aulasCompletas));
    
    // Atualizar visual
    atualizarVisualAulasCompletas();
}

/**
 * Função para desmarcar uma aula como completa
 * @param {string} aulaId - ID único da aula
 */
function desmarcarAulaCompleta(aulaId) {
    // Obter aulas completas do localStorage
    let aulasCompletas = JSON.parse(localStorage.getItem('aulasCompletas')) || [];
    
    // Remover a aula
    aulasCompletas = aulasCompletas.filter(id => id !== aulaId);
    
    // Salvar no localStorage
    localStorage.setItem('aulasCompletas', JSON.stringify(aulasCompletas));
    
    // Atualizar visual
    atualizarVisualAulasCompletas();
}

/**
 * Função para atualizar o visual das aulas completas
 */
function atualizarVisualAulasCompletas() {
    // Obter aulas completas
    const aulasCompletas = JSON.parse(localStorage.getItem('aulasCompletas')) || [];
    
    // Atualizar checkboxes
    document.querySelectorAll('input[type="checkbox"][data-aula-id]').forEach(checkbox => {
        const aulaId = checkbox.getAttribute('data-aula-id');
        checkbox.checked = aulasCompletas.includes(aulaId);
    });
}

/**
 * Função para calcular e exibir progresso
 */
function exibirProgresso() {
    const aulasCompletas = JSON.parse(localStorage.getItem('aulasCompletas')) || [];
    const totalAulas = document.querySelectorAll('[data-aula-id]').length;
    
    if (totalAulas === 0) return;
    
    const percentual = Math.round((aulasCompletas.length / totalAulas) * 100);
    
    console.log(`Progresso: ${aulasCompletas.length}/${totalAulas} aulas (${percentual}%)`);
}

/**
 * Função para rolar suavemente até uma seção
 * @param {string} sectionId - ID da seção
 */
function rolarParaSecao(sectionId) {
    const elemento = document.getElementById(sectionId);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Inicialização quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar visual das aulas completas
    atualizarVisualAulasCompletas();
    
    // Adicionar event listeners aos checkboxes de aulas
    document.querySelectorAll('input[type="checkbox"][data-aula-id]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                marcarAulaCompleta(this.getAttribute('data-aula-id'));
            } else {
                desmarcarAulaCompleta(this.getAttribute('data-aula-id'));
            }
        });
    });
    
    // Exibir progresso no console
    exibirProgresso();
    
    // Adicionar suporte para Enter nos exercícios
    document.querySelectorAll('.exercicio-opcoes label').forEach(label => {
        label.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                }
            }
        });
    });
});

/**
 * Função auxiliar para debug
 */
function debugInfo() {
    console.log('=== DEBUG INFO ===');
    console.log('Aulas Completas:', JSON.parse(localStorage.getItem('aulasCompletas')) || []);
    console.log('Total de aulas no DOM:', document.querySelectorAll('[data-aula-id]').length);
}

// Expor função de debug globalmente
window.debugInfo = debugInfo;
