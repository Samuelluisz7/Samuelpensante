<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SamuelPensante | Tutor ENEM IA</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
                    colors: {
                        brand: {
                            50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
                            400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
                            800: '#6b21a8', 900: '#581c87', 950: '#3b0764',
                        },
                        dark: {
                            bg: '#0f172a', surface: '#1e293b', border: '#334155'
                        }
                    }
                }
            }
        }
    </script>

    <style>
        /* Custom Styles & Glassmorphism */
        body { background-color: #0f172a; color: #f8fafc; overflow-x: hidden; }
        
        .glass {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }

        /* Markdown Styles for AI Responses */
        .prose p { margin-bottom: 1rem; line-height: 1.6; }
        .prose ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
        .prose strong { color: #d8b4fe; }
        .prose code { background: #0f172a; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; color: #c084fc; }
        
        /* Flashcard Flip Animations */
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .card-inner { transition: transform 0.6s; }
        .is-flipped .card-inner { transform: rotateY(180deg); }

        /* Loader */
        .loader { border: 3px solid rgba(255,255,255,0.1); border-top-color: #a855f7; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Pyramid Visuals */
        .pyramid-level.locked { opacity: 0.4; filter: grayscale(100%); cursor: not-allowed; }
        .pyramid-level { transition: all 0.3s ease; }
        .pyramid-level:hover:not(.locked) { transform: scale(1.02); border-color: #a855f7; }
    </style>
</head>
<body class="flex h-screen overflow-hidden antialiased text-slate-200">

    <div class="md:hidden fixed top-0 w-full glass z-50 flex justify-between items-center p-4">
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-brain text-brand-500 text-xl"></i>
            <span class="font-bold text-lg">SamuelPensante</span>
        </div>
        <button id="mobileMenuBtn" class="text-2xl text-slate-300 focus:outline-none">
            <i class="fa-solid fa-bars"></i>
        </button>
    </div>

    <aside id="sidebar" class="fixed md:static inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out w-64 glass z-40 flex flex-col h-full border-r border-dark-border pt-16 md:pt-0">
        <div class="hidden md:flex items-center gap-3 p-6 border-b border-dark-border">
            <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/20">
                <i class="fa-solid fa-brain text-white text-xl"></i>
            </div>
            <h1 class="font-bold text-xl tracking-tight text-white">Samuel<span class="text-brand-400">Pensante</span></h1>
        </div>

        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <a href="#" data-target="dashboard" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-600/20 text-brand-300 font-medium transition-colors">
                <i class="fa-solid fa-chart-pie w-5"></i> Dashboard
            </a>
            <a href="#" data-target="pyramid" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-surface text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-layer-group w-5"></i> Pirâmide do Saber
            </a>
            <a href="#" data-target="chat" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-surface text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-robot w-5"></i> Tutor IA
            </a>
            <a href="#" data-target="flashcards" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-surface text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-clone w-5"></i> Flashcards
            </a>
            <a href="#" data-target="summary" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-surface text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-file-lines w-5"></i> Gerar Resumo
            </a>
            <a href="#" data-target="quiz" class="nav-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-surface text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-gamepad w-5"></i> Quiz Dinâmico
            </a>
        </nav>

        <div class="p-4 border-t border-dark-border">
            <div class="text-xs text-slate-400 mb-2">Configuração Hugging Face API</div>
            <input type="password" id="hfToken" placeholder="Insira seu Token (hf_...)" class="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 mb-2">
            <button onclick="saveToken()" class="w-full bg-dark-surface hover:bg-brand-600 transition-colors text-white text-sm py-2 rounded-lg font-medium">Salvar Token</button>
        </div>
    </aside>

    <main class="flex-1 h-full overflow-y-auto pt-16 md:pt-0 relative bg-dark-bg">
        
        <div id="toast" class="fixed top-5 right-5 z-50 transform translate-x-[150%] transition-transform duration-300">
            <div class="glass border-l-4 border-brand-500 text-white px-4 py-3 rounded shadow-lg flex items-center gap-3">
                <i class="fa-solid fa-circle-info text-brand-400"></i>
                <span id="toastMsg">Mensagem</span>
            </div>
        </div>

        <div class="p-4 md:p-8 max-w-6xl mx-auto h-full">
            
            <section id="view-dashboard" class="view-section animate-fade-in">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-1">Olá, <span class="text-brand-400">Samuel!</span> 👋</h2>
                        <p class="text-slate-400">Pronto para dominar o ENEM hoje?</p>
                    </div>
                    <div class="glass px-6 py-3 rounded-2xl flex items-center gap-4">
                        <div class="text-brand-500 text-2xl"><i class="fa-solid fa-fire"></i></div>
                        <div>
                            <div class="text-xs text-slate-400 uppercase font-bold tracking-wider">Ofensiva</div>
                            <div class="text-xl font-bold text-white"><span id="streakDays">1</span> Dias</div>
                        </div>
                    </div>
                </div>

                <div class="glass p-6 rounded-2xl mb-8">
                    <div class="flex justify-between items-end mb-2">
                        <div>
                            <span class="text-sm text-slate-400">Nível Atual</span>
                            <h3 class="text-xl font-bold text-brand-300" id="userLevelName">Vestibulando</h3>
                        </div>
                        <div class="text-right">
                            <span class="text-xl font-bold text-white" id="userXp">0</span> <span class="text-slate-400 text-sm">XP</span>
                        </div>
                    </div>
                    <div class="w-full bg-dark-bg rounded-full h-3">
                        <div id="xpBar" class="bg-gradient-to-r from-brand-600 to-brand-400 h-3 rounded-full transition-all duration-1000" style="width: 0%"></div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="glass p-6 rounded-2xl">
                        <div class="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl mb-4"><i class="fa-solid fa-book"></i></div>
                        <div class="text-3xl font-bold text-white mb-1" id="statQuizzes">0</div>
                        <div class="text-sm text-slate-400">Quizzes Completos</div>
                    </div>
                    <div class="glass p-6 rounded-2xl">
                        <div class="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-xl mb-4"><i class="fa-solid fa-layer-group"></i></div>
                        <div class="text-3xl font-bold text-white mb-1" id="statFlashcards">0</div>
                        <div class="text-sm text-slate-400">Flashcards Revisados</div>
                    </div>
                    <div class="glass p-6 rounded-2xl">
                        <div class="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl mb-4"><i class="fa-solid fa-message"></i></div>
                        <div class="text-3xl font-bold text-white mb-1" id="statMessages">0</div>
                        <div class="text-sm text-slate-400">Interações com a IA</div>
                    </div>
                </div>

                <button onclick="nav('pyramid')" class="w-full md:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-brand-600/30 transform hover:-translate-y-1">
                    Continuar Estudos <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </section>

            <section id="view-pyramid" class="view-section hidden">
                <div class="mb-8 text-center">
                    <h2 class="text-3xl font-bold text-white mb-2">Pirâmide do Conhecimento</h2>
                    <p class="text-slate-400 max-w-2xl mx-auto">Siga a jornada desde os fundamentos até a maestria. Cada nível desbloqueia o próximo. Clique em um nível desbloqueado para iniciar uma mentoria com a IA.</p>
                </div>

                <div class="max-w-3xl mx-auto flex flex-col gap-4">
                    <div class="pyramid-level locked glass p-6 rounded-t-3xl border-2 border-transparent" id="pyr-4" onclick="openPyramidChat(4)">
                        <div class="flex justify-between items-center">
                            <div><span class="text-brand-400 font-bold mr-2">4. Maestria</span> <span class="text-slate-300">Questões complexas e redação nota 1000</span></div>
                            <div class="text-sm bg-dark-bg px-3 py-1 rounded-full"><i class="fa-solid fa-lock mr-1"></i> <span id="pct-4">0%</span></div>
                        </div>
                    </div>
                    <div class="pyramid-level locked glass p-6 border-2 border-transparent" id="pyr-3" onclick="openPyramidChat(3)">
                        <div class="flex justify-between items-center">
                            <div><span class="text-brand-400 font-bold mr-2">3. Especialização</span> <span class="text-slate-300">Aprofundamento e interdisciplinaridade</span></div>
                            <div class="text-sm bg-dark-bg px-3 py-1 rounded-full"><i class="fa-solid fa-lock mr-1"></i> <span id="pct-3">0%</span></div>
                        </div>
                    </div>
                    <div class="pyramid-level glass p-6 border-2 border-transparent" id="pyr-2" onclick="openPyramidChat(2)">
                        <div class="flex justify-between items-center">
                            <div><span class="text-brand-400 font-bold mr-2">2. Prática</span> <span class="text-slate-300">Resolução de questões padrão ENEM</span></div>
                            <div class="text-sm bg-brand-600/20 text-brand-300 px-3 py-1 rounded-full"><span id="pct-2">40%</span></div>
                        </div>
                        <div class="w-full bg-dark-bg rounded-full h-1 mt-4"><div class="bg-brand-500 h-1 rounded-full" style="width: 40%"></div></div>
                    </div>
                    <div class="pyramid-level glass p-6 rounded-b-3xl border-2 border-transparent" id="pyr-1" onclick="openPyramidChat(1)">
                        <div class="flex justify-between items-center">
                            <div><span class="text-brand-400 font-bold mr-2">1. Fundamentos</span> <span class="text-slate-300">Conceitos base e teoria essencial</span></div>
                            <div class="text-sm bg-brand-600/20 text-brand-300 px-3 py-1 rounded-full"><span id="pct-1">100%</span></div>
                        </div>
                        <div class="w-full bg-dark-bg rounded-full h-1 mt-4"><div class="bg-brand-500 h-1 rounded-full" style="width: 100%"></div></div>
                    </div>
                </div>
            </section>

            <section id="view-chat" class="view-section hidden h-[calc(100vh-8rem)] flex-col">
                <div class="glass p-4 rounded-t-2xl border-b border-dark-border flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-white flex items-center gap-2">
                            <i class="fa-solid fa-robot text-brand-400"></i> Tutor Inteligente
                        </h2>
                        <p class="text-xs text-slate-400" id="chatContext">Contexto: Livre (ENEM)</p>
                    </div>
                    <button onclick="clearChat()" class="text-slate-400 hover:text-red-400 text-sm px-3 py-1 rounded border border-dark-border hover:border-red-400 transition-colors">Limpar Chat</button>
                </div>
                
                <div id="chatBox" class="flex-1 glass p-4 overflow-y-auto flex flex-col gap-4">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0"><i class="fa-solid fa-robot text-xs"></i></div>
                        <div class="bg-dark-surface p-3 rounded-2xl rounded-tl-none border border-dark-border max-w-[85%] prose prose-invert text-sm text-slate-200">
                            Olá, Samuel! Eu sou seu Tutor de IA focado no ENEM. Como posso te ajudar hoje? (Dúvidas, teorias, resolução de questões...)
                        </div>
                    </div>
                </div>

                <div class="glass p-4 rounded-b-2xl border-t border-dark-border flex gap-2">
                    <input type="text" id="chatInput" placeholder="Faça sua pergunta..." class="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white" onkeypress="if(event.key === 'Enter') sendMessage()">
                    <button id="sendBtn" onclick="sendMessage()" class="bg-brand-600 hover:bg-brand-500 text-white w-12 rounded-xl flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </section>

            <section id="view-flashcards" class="view-section hidden">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-white mb-2">Flashcards Inteligentes</h2>
                    <p class="text-slate-400">Gere cartas de memorização com IA sobre qualquer assunto.</p>
                </div>

                <div class="glass p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
                    <input type="text" id="flashcardTopic" placeholder="Ex: Revolução Industrial, Mitose, Logaritmos..." class="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white">
                    <button onclick="generateFlashcards()" class="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2 justify-center">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Gerar Cards
                    </button>
                </div>

                <div id="flashcardContainer" class="hidden flex flex-col items-center">
                    <div class="perspective-1000 w-full max-w-md h-64 mb-6 cursor-pointer" onclick="flipCard()">
                        <div id="cardInner" class="card-inner relative w-full h-full transform-style-3d">
                            <div class="absolute w-full h-full backface-hidden glass rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-brand-500/30">
                                <div class="text-xs text-brand-400 font-bold mb-4 uppercase tracking-wider">Frente - Pergunta</div>
                                <h3 id="cardFront" class="text-xl font-medium text-white"></h3>
                            </div>
                            <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-brand-900 border border-brand-500 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg shadow-brand-600/20">
                                <div class="text-xs text-brand-300 font-bold mb-4 uppercase tracking-wider">Verso - Resposta</div>
                                <p id="cardBack" class="text-lg text-white"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 items-center">
                        <button onclick="prevCard()" class="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-dark-surface"><i class="fa-solid fa-chevron-left"></i></button>
                        <span id="cardCounter" class="text-slate-400 font-medium">1 / 5</span>
                        <button onclick="nextCard()" class="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-dark-surface"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </section>

            <section id="view-summary" class="view-section hidden">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-white mb-2">Gerador de Resumo</h2>
                    <p class="text-slate-400">Cole um texto longo, artigo ou anotações. A IA vai extrair os pontos-chave focados no ENEM.</p>
                </div>
                
                <div class="glass p-6 rounded-2xl mb-8 flex flex-col gap-4">
                    <textarea id="summaryInput" rows="6" placeholder="Cole seu texto de estudo aqui..." class="w-full bg-dark-bg border border-dark-border rounded-xl p-4 text-sm focus:outline-none focus:border-brand-500 text-white resize-none"></textarea>
                    <button onclick="generateSummary()" class="self-end bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2">
                        <i class="fa-solid fa-bolt"></i> Otimizar Texto
                    </button>
                </div>

                <div id="summaryResult" class="hidden glass p-6 rounded-2xl border border-brand-500/30">
                    <h3 class="text-xl font-bold text-brand-400 mb-4 border-b border-dark-border pb-2">Resumo Otimizado</h3>
                    <div id="summaryContent" class="prose prose-invert max-w-none text-sm text-slate-300"></div>
                </div>
            </section>

            <section id="view-quiz" class="view-section hidden">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-white mb-2">Quiz Dinâmico</h2>
                    <p class="text-slate-400">Teste seus conhecimentos. A IA gera questões estilo ENEM com gabarito comentado.</p>
                </div>

                <div class="glass p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4" id="quizSetup">
                    <input type="text" id="quizTopic" placeholder="Tema (ex: Termoquímica, Era Vargas...)" class="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white">
                    <select id="quizDifficulty" class="bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white">
                        <option value="fácil">Fácil</option>
                        <option value="médio" selected>Médio</option>
                        <option value="difícil">Difícil</option>
                    </select>
                    <button onclick="generateQuiz()" class="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2 justify-center">
                        <i class="fa-solid fa-play"></i> Iniciar Quiz
                    </button>
                </div>

                <div id="quizContainer" class="hidden">
                    <div class="glass p-6 rounded-2xl border border-brand-500/30 mb-6">
                        <div class="flex justify-between items-center mb-6">
                            <span class="text-xs font-bold bg-dark-bg px-3 py-1 rounded-full text-brand-400 tracking-wider">QUESTÃO <span id="qCurrent">1</span>/3</span>
                            <span class="text-xs text-slate-400" id="qDiffBadge">MÉDIO</span>
                        </div>
                        <p id="qText" class="text-lg text-white mb-6 font-medium leading-relaxed"></p>
                        <div id="qOptions" class="flex flex-col gap-3">
                            </div>
                    </div>
                    <button id="qSubmitBtn" onclick="submitAnswer()" class="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hidden">
                        Confirmar Resposta
                    </button>
                </div>

                <div id="quizFeedback" class="hidden mt-6 glass p-6 rounded-2xl border border-green-500/50">
                    <h3 id="feedbackTitle" class="text-xl font-bold mb-2"></h3>
                    <p id="feedbackExpl" class="text-sm text-slate-300 prose prose-invert"></p>
                    <button onclick="nextQuestion()" class="mt-4 bg-dark-surface hover:bg-brand-600 border border-dark-border text-white font-bold py-2 px-6 rounded-lg transition-all">
                        Próxima Questão <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </section>

        </div>
    </main>

    <script>
        // --- ESTADO DA APLICAÇÃO ---
        const state = {
            token: localStorage.getItem('hf_token') || '',
            streak: parseInt(localStorage.getItem('streak')) || 1,
            xp: parseInt(localStorage.getItem('xp')) || 0,
            stats: JSON.parse(localStorage.getItem('stats')) || { quizzes: 0, flashcards: 0, messages: 0 },
            chatHistory: JSON.parse(localStorage.getItem('chatHistory')) || [],
            pyramidContext: 'Geral',
            // Variáveis de controle de features
            flashcards: [], currentCardIndex: 0,
            quiz: [], currentQuizIndex: 0, score: 0
        };

        // --- SISTEMA BÁSICO (UI / NAVEGAÇÃO / UTILIDADES) ---
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('hfToken').value = state.token;
            updateDashboardUI();
            if(state.chatHistory.length > 0) renderChatHistory();

            // Menu Mobile
            const btn = document.getElementById('mobileMenuBtn');
            const sidebar = document.getElementById('sidebar');
            btn.addEventListener('click', () => sidebar.classList.toggle('-translate-x-full'));

            // Navegação
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelectorAll('.nav-link').forEach(l => {
                        l.classList.remove('bg-brand-600/20', 'text-brand-300');
                        l.classList.add('text-slate-400');
                    });
                    e.currentTarget.classList.remove('text-slate-400');
                    e.currentTarget.classList.add('bg-brand-600/20', 'text-brand-300');
                    nav(e.currentTarget.dataset.target);
                    if(window.innerWidth < 768) sidebar.classList.add('-translate-x-full');
                });
            });
            
            // Incrementar Streak diário
            const lastLogin = localStorage.getItem('last_login');
            const today = new Date().toDateString();
            if(lastLogin !== today) {
                if(lastLogin) state.streak++;
                localStorage.setItem('streak', state.streak);
                localStorage.setItem('last_login', today);
                updateDashboardUI();
            }
        });

        function nav(sectionId) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            document.getElementById(`view-${sectionId}`).classList.remove('hidden');
        }

        function showToast(msg) {
            const t = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            t.classList.remove('translate-x-[150%]');
            setTimeout(() => t.classList.add('translate-x-[150%]'), 3000);
        }

        function saveToken() {
            state.token = document.getElementById('hfToken').value.trim();
            localStorage.setItem('hf_token', state.token);
            showToast("Token salvo com sucesso!");
        }

        function addXP(amount) {
            state.xp += amount;
            localStorage.setItem('xp', state.xp);
            updateDashboardUI();
        }

        function incrementStat(type) {
            state.stats[type]++;
            localStorage.setItem('stats', JSON.stringify(state.stats));
            updateDashboardUI();
        }

        function updateDashboardUI() {
            document.getElementById('streakDays').innerText = state.streak;
            document.getElementById('userXp').innerText = state.xp;
            document.getElementById('statQuizzes').innerText = state.stats.quizzes;
            document.getElementById('statFlashcards').innerText = state.stats.flashcards;
            document.getElementById('statMessages').innerText = state.stats.messages;

            // Calcular Nível
            const level = Math.floor(state.xp / 100) + 1;
            const titles = ["Calouro", "Vestibulando", "Estudioso", "Mestre", "Lenda do ENEM"];
            document.getElementById('userLevelName').innerText = `Nível ${level} - ${titles[Math.min(level-1, 4)]}`;
            
            // Barra de Progresso
            const xpInLevel = state.xp % 100;
            document.getElementById('xpBar').style.width = `${xpInLevel}%`;
        }

        // --- INTEGRAÇÃO HUGGING FACE (LLAMA 3.1 8B) ---
        async function fetchAI(messages, fallbackJson = false) {
            if(!state.token) {
                showToast("Por favor, insira seu Token do Hugging Face no menu lateral.");
                throw new Error("No token");
            }
            
            const API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct/v1/chat/completions";
            
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${state.token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: "meta-llama/Llama-3.1-8B-Instruct",
                        messages: messages,
                        max_tokens: 1500,
                        temperature: 0.7,
                        response_format: fallbackJson ? { type: "json_object" } : undefined // Llama pode n suportar isso via API nativa, mas o prompt cuida.
                    })
                });

                if(response.status === 503) {
                    showToast("Modelo da IA está carregando (Cold Start). Tente novamente em 20 segundos!");
                    throw new Error("Model Loading");
                }
                
                if(!response.ok) throw new Error("Erro na API");

                const data = await response.json();
                return data.choices[0].message.content;
            } catch (error) {
                console.error(error);
                if(error.message !== "Model Loading") showToast("Erro ao conectar com a IA. Verifique seu token.");
                return null;
            }
        }

        // --- FEATURE: TUTOR IA (CHAT) ---
        function openPyramidChat(level) {
            if(level > 2) { showToast("Nível bloqueado! Continue estudando."); return; } // Mock lock
            const contexts = ["", "Fundamentos (Teoria)", "Prática (Exercícios)"];
            state.pyramidContext = contexts[level];
            document.getElementById('chatContext').innerText = `Contexto: ${state.pyramidContext}`;
            
            // System message invisível no histórico
            nav('chat');
        }

        async function sendMessage() {
            const input = document.getElementById('chatInput');
            const msgText = input.value.trim();
            if(!msgText) return;

            // UI Add User Message
            addMessageToDOM('user', msgText);
            input.value = '';
            incrementStat('messages');
            addXP(5);

            // Add Loader
            const loaderId = `loader-${Date.now()}`;
            addMessageToDOM('ai', `<div class="loader"></div>`, loaderId);

            // Preparar payload
            const systemPrompt = `Você é SamuelPensante, um tutor de IA especializado no ENEM do Brasil. 
            Seja motivador, didático e paciente. Responda formatando em Markdown. 
            Contexto atual do aluno: ${state.pyramidContext}.`;
            
            const apiMessages = [
                { role: "system", content: systemPrompt },
                ...state.chatHistory,
                { role: "user", content: msgText }
            ];

            const responseText = await fetchAI(apiMessages);
            
            // Remove Loader
            document.getElementById(loaderId).remove();

            if(responseText) {
                state.chatHistory.push({ role: "user", content: msgText });
                state.chatHistory.push({ role: "assistant", content: responseText });
                localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory));
                addMessageToDOM('ai', marked.parse(responseText));
            }
        }

        function addMessageToDOM(role, content, id = '') {
            const box = document.getElementById('chatBox');
            const div = document.createElement('div');
            div.className = role === 'user' ? "flex items-start gap-3 justify-end" : "flex items-start gap-3";
            if(id) div.id = id;

            const avatar = role === 'user' 
                ? `<div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0 order-2"><i class="fa-solid fa-user text-xs"></i></div>`
                : `<div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0"><i class="fa-solid fa-robot text-xs"></i></div>`;
            
            const msgClass = role === 'user'
                ? "bg-brand-600 p-3 rounded-2xl rounded-tr-none text-white text-sm max-w-[85%] order-1"
                : "bg-dark-surface p-3 rounded-2xl rounded-tl-none border border-dark-border max-w-[85%] prose prose-invert text-sm text-slate-200";

            div.innerHTML = `${role==='ai'?avatar:''} <div class="${msgClass}">${content}</div> ${role==='user'?avatar:''}`;
            box.appendChild(div);
            box.scrollTop = box.scrollHeight;
        }

        function renderChatHistory() {
            state.chatHistory.forEach(msg => {
                if(msg.role === 'user') addMessageToDOM('user', msg.content);
                else addMessageToDOM('ai', marked.parse(msg.content));
            });
        }

        function clearChat() {
            if(confirm("Apagar histórico do chat?")) {
                state.chatHistory = [];
                localStorage.removeItem('chatHistory');
                document.getElementById('chatBox').innerHTML = '';
            }
        }

        // --- FEATURE: FLASHCARDS ---
        async function generateFlashcards() {
            const topic = document.getElementById('flashcardTopic').value.trim();
            if(!topic) return showToast("Digite um tema!");
            
            const btn = document.querySelector('#view-flashcards button');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = `<div class="loader"></div> Gerando...`;
            btn.disabled = true;

            const prompt = `Crie 5 flashcards sobre "${topic}" focados no ENEM. 
            Retorne ESTRITAMENTE em formato JSON, um array de objetos com "frente" (pergunta curta) e "verso" (resposta direta).
            Exemplo: [{"frente": "O que é...", "verso": "É a..."}]
            Não escreva nenhum texto além do JSON bruto.`;

            const res = await fetchAI([{ role: "user", content: prompt }]);
            btn.innerHTML = originalHtml;
            btn.disabled = false;

            if(res) {
                try {
                    // Limpar markdown code blocks se a IA os colocou
                    const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
                    state.flashcards = JSON.parse(cleanJson);
                    state.currentCardIndex = 0;
                    document.getElementById('flashcardContainer').classList.remove('hidden');
                    updateFlashcardUI();
                    incrementStat('flashcards');
                    addXP(15);
                } catch(e) {
                    showToast("Erro ao processar os cards. Tente gerar novamente.");
                }
            }
        }

        function updateFlashcardUI() {
            const card = state.flashcards[state.currentCardIndex];
            document.getElementById('cardFront').innerText = card.frente;
            document.getElementById('cardBack').innerText = card.verso;
            document.getElementById('cardInner').parentElement.classList.remove('is-flipped');
            document.getElementById('cardCounter').innerText = `${state.currentCardIndex + 1} / ${state.flashcards.length}`;
        }

        function flipCard() {
            document.getElementById('cardInner').parentElement.classList.toggle('is-flipped');
        }

        function nextCard() {
            if(state.currentCardIndex < state.flashcards.length - 1) {
                state.currentCardIndex++;
                updateFlashcardUI();
                incrementStat('flashcards');
                addXP(2);
            }
        }
        function prevCard() {
            if(state.currentCardIndex > 0) {
                state.currentCardIndex--;
                updateFlashcardUI();
            }
        }

        // --- FEATURE: RESUMO ---
        async function generateSummary() {
            const text = document.getElementById('summaryInput').value.trim();
            if(!text) return showToast("Cole um texto para resumir.");

            const btn = document.querySelector('#view-summary button');
            btn.innerHTML = `<div class="loader"></div> Analisando...`;
            btn.disabled = true;

            const prompt = `Você é um tutor do ENEM. Resuma o texto abaixo de forma otimizada para estudo.
            Use Bullet points, destaque termos importantes em negrito e crie uma pequena seção de "Cai no ENEM?" no final.
            Texto: "${text}"`;

            const res = await fetchAI([{ role: "user", content: prompt }]);
            
            btn.innerHTML = `<i class="fa-solid fa-bolt"></i> Otimizar Texto`;
            btn.disabled = false;

            if(res) {
                document.getElementById('summaryResult').classList.remove('hidden');
                document.getElementById('summaryContent').innerHTML = marked.parse(res);
                addXP(10);
            }
        }

        // --- FEATURE: QUIZ ---
        async function generateQuiz() {
            const topic = document.getElementById('quizTopic').value.trim();
            const diff = document.getElementById('quizDifficulty').value;
            if(!topic) return showToast("Digite um tema!");

            const btn = document.querySelector('#quizSetup button');
            btn.innerHTML = `<div class="loader"></div> Criando Questões...`;
            btn.disabled = true;

            const prompt = `Crie 3 questões de múltipla escolha sobre "${topic}" (Nível: ${diff}) focadas no ENEM.
            Retorne ESTRITAMENTE em formato JSON, como um array.
            Formato: [{"pergunta": "...", "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."], "correta": 0, "explicacao": "..."}]
            'correta' é o índice (0 a 3). Não escreva nada além do JSON bruto.`;

            const res = await fetchAI([{ role: "user", content: prompt }]);
            
            btn.innerHTML = `<i class="fa-solid fa-play"></i> Iniciar Quiz`;
            btn.disabled = false;

            if(res) {
                try {
                    const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
                    state.quiz = JSON.parse(cleanJson);
                    state.currentQuizIndex = 0;
                    state.score = 0;
                    document.getElementById('quizSetup').classList.add('hidden');
                    document.getElementById('quizContainer').classList.remove('hidden');
                    document.getElementById('quizFeedback').classList.add('hidden');
                    renderQuestion();
                } catch(e) {
                    showToast("Erro ao gerar quiz. A IA vacilou, tente novamente.");
                }
            }
        }

        function renderQuestion() {
            const q = state.quiz[state.currentQuizIndex];
            document.getElementById('qCurrent').innerText = state.currentQuizIndex + 1;
            document.getElementById('qDiffBadge').innerText = document.getElementById('quizDifficulty').value.toUpperCase();
            document.getElementById('qText').innerText = q.pergunta;
            
            const optionsDiv = document.getElementById('qOptions');
            optionsDiv.innerHTML = '';
            
            q.opcoes.forEach((opt, index) => {
                const label = document.createElement('label');
                label.className = "flex items-center gap-3 p-4 glass rounded-xl cursor-pointer hover:border-brand-500 border border-transparent transition-colors";
                label.innerHTML = `
                    <input type="radio" name="quizOpt" value="${index}" class="w-5 h-5 accent-brand-500" onclick="document.getElementById('qSubmitBtn').classList.remove('hidden')">
                    <span class="text-slate-200">${opt}</span>
                `;
                optionsDiv.appendChild(label);
            });
            document.getElementById('qSubmitBtn').classList.add('hidden');
        }

        function submitAnswer() {
            const selected = document.querySelector('input[name="quizOpt"]:checked');
            if(!selected) return;

            const answerIdx = parseInt(selected.value);
            const q = state.quiz[state.currentQuizIndex];
            const isCorrect = answerIdx === q.correta;

            // Mostrar Feedback
            document.getElementById('qSubmitBtn').classList.add('hidden');
            const feedback = document.getElementById('quizFeedback');
            feedback.classList.remove('hidden', 'border-green-500/50', 'border-red-500/50');
            
            if(isCorrect) {
                state.score++;
                addXP(20);
                feedback.classList.add('border-green-500/50');
                document.getElementById('feedbackTitle').innerHTML = '<span class="text-green-400"><i class="fa-solid fa-check"></i> Correto!</span>';
            } else {
                feedback.classList.add('border-red-500/50');
                document.getElementById('feedbackTitle').innerHTML = '<span class="text-red-400"><i class="fa-solid fa-xmark"></i> Incorreto</span>';
            }

            document.getElementById('feedbackExpl').innerHTML = marked.parse(q.explicacao);
        }

        function nextQuestion() {
            state.currentQuizIndex++;
            document.getElementById('quizFeedback').classList.add('hidden');
            if(state.currentQuizIndex < state.quiz.length) {
                renderQuestion();
            } else {
                // Fim do quiz
                incrementStat('quizzes');
                document.getElementById('quizContainer').innerHTML = `
                    <div class="glass p-8 rounded-2xl text-center">
                        <div class="text-5xl mb-4">🏆</div>
                        <h3 class="text-2xl font-bold text-white mb-2">Quiz Concluído!</h3>
                        <p class="text-slate-400 mb-6">Você acertou ${state.score} de ${state.quiz.length} questões.</p>
                        <button onclick="nav('dashboard')" class="bg-brand-600 text-white font-bold py-3 px-8 rounded-xl">Voltar ao Dashboard</button>
                    </div>
                `;
            }
        }
    </script>
</body>
</html>

