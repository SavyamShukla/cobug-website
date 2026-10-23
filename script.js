// COBUG Interactive Landing Page Controller
function initCobug() {
  // 1. Download feedback URL
  const DOWNLOAD_URL = "https://github.com/SavyamShukla/cobug-app/releases/download/v1.0.0/COBUG-Setup-0.1.0-x64.exe";

  // 2. Features Dial Auto-Spin Controller
  const INTERVAL = 3500; // Continuous 3.5s auto-spin
  const mod4 = (n) => ((n % 4) + 4) % 4;

  const features = [
    {
      rgb: "14,165,233", // Cyan
      label: "Collaboration",
      title: "Your team, around the project",
      text: "Members, tasks, chat, files and activity share one context, so nobody has to ask where things are.",
      id: "feature-panel-0"
    },
    {
      rgb: "139,92,246", // Violet
      label: "Workspace",
      title: "A personal workspace for everyone",
      text: "Work freely without touching Main. Your changes stay yours until they are ready.",
      id: "feature-panel-1"
    },
    {
      rgb: "16,185,129", // Emerald
      label: "Local development",
      title: "Code on your own machine",
      text: "Open your workspace in VS Code and work the way you always do.",
      id: "feature-panel-2"
    },
    {
      rgb: "245,158,11", // Amber
      label: "Quality control",
      title: "Review before Main",
      text: "Turn finished work into a request. Check diffs, tests and builds first.",
      id: "feature-panel-3"
    }
  ];

  let step = 0;
  let isUserInteracting = false;
  let resumeTimer = null;
  let autoSpinTimer = null;

  const dialWheel = document.getElementById('dial-wheel');
  const dialGlow = document.getElementById('dial-glow');
  const dialCore = document.getElementById('dial-core');
  const dialPointer = document.getElementById('dial-pointer');
  const dialButtons = document.querySelectorAll('.dial-btn');
  const dialArc = document.getElementById('dial-arc');
  const panels = document.querySelectorAll('.dial-panel');

  // Ensure explicit transition styles on dialWheel & buttons
  if (dialWheel) {
    dialWheel.style.transition = 'transform 900ms cubic-bezier(.65,0,.2,1)';
  }
  dialButtons.forEach(btn => {
    btn.style.transition = 'transform 900ms cubic-bezier(.65,0,.2,1), box-shadow 500ms ease, color 500ms ease, background 500ms ease';
  });

  function updateDial(nextStep) {
    step = nextStep;
    const cur = mod4(step);
    const item = features[cur];
    const rgb = item.rgb;

    // Rotate dial wheel continuously
    if (dialWheel) {
      dialWheel.style.transform = `rotate(${step * 90}deg)`;
    }

    // Keep icons upright by rotating counter
    dialButtons.forEach((btn, idx) => {
      const active = idx === cur;
      btn.style.transform = `rotate(${-step * 90}deg) scale(${active ? 1.15 : 0.88})`;
      btn.style.color = active ? `rgb(${features[idx].rgb})` : "#4e5561";
      btn.style.background = active ? "#ffffff" : "#eaedf2";
      btn.style.boxShadow = active 
        ? `0 0 0 2px rgba(${features[idx].rgb}, 0.9), 0 0 28px rgba(${features[idx].rgb}, 0.45)` 
        : "0 1px 3px rgba(0,0,0,0.08)";
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    // Update glow, core and pointer
    if (dialGlow) dialGlow.style.background = `rgba(${rgb}, 0.22)`;
    if (dialCore) {
      dialCore.style.background = `rgb(${rgb})`;
      dialCore.style.boxShadow = `0 0 18px 4px rgba(${rgb}, 0.7)`;
    }
    if (dialPointer) {
      dialPointer.style.background = `linear-gradient(to right, rgba(${rgb}, 0.9), transparent)`;
    }

    // Reset and trigger arc animation for the 3.5s interval
    if (dialArc) {
      dialArc.style.stroke = `rgb(${rgb})`;
      dialArc.style.animation = 'none';
      void dialArc.offsetWidth; // trigger reflow
      dialArc.style.animation = `fxArc ${INTERVAL}ms linear`;
    }

    // Switch panels smoothly
    panels.forEach((p, idx) => {
      if (idx === cur) {
        p.classList.remove('hidden');
        p.style.opacity = '0';
        p.style.transform = 'translateX(18px)';
        p.style.filter = 'blur(4px)';
        setTimeout(() => {
          p.style.opacity = '1';
          p.style.transform = 'none';
          p.style.filter = 'none';
        }, 30);
      } else {
        p.classList.add('hidden');
      }
    });

    // Run terminal typewriter if panel 2 (index 2)
    if (cur === 2) {
      runTerminalTypewriter();
    }
  }

  // Auto-Spin loop that runs continuously
  function startAutoSpin() {
    clearInterval(autoSpinTimer);
    autoSpinTimer = setInterval(() => {
      if (!isUserInteracting) {
        updateDial(step + 1);
      }
    }, INTERVAL);
  }

  // Manual Dial button clicks
  dialButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = parseInt(btn.getAttribute('data-index'), 10);
      const cur = mod4(step);
      const diff = mod4(targetIdx - cur);
      if (diff !== 0) {
        updateDial(step + diff);
      }

      // Pause briefly for 4s after user click, then seamlessly continue spinning!
      isUserInteracting = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        isUserInteracting = false;
      }, 4000);
    });
  });

  // Initial spin activation immediately
  updateDial(0);
  startAutoSpin();

  // 3. Typewriter for Terminal in Dial Panel 2
  let terminalTyped = false;
  function runTerminalTypewriter() {
    const textTarget = document.getElementById('terminal-typewriter-text');
    const resultLine = document.getElementById('terminal-result-line');
    if (!textTarget || terminalTyped) return;

    const fullText = "$ cobug open";
    textTarget.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        textTarget.textContent += fullText.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        terminalTyped = true;
        if (resultLine) {
          resultLine.style.opacity = '1';
          resultLine.style.transform = 'translateY(0)';
        }
      }
    }, 60);
  }

  // 4. AI Interactive Assistant Chat
  const chats = [
    {
      q: "What changed while I was away?",
      a: "3 tasks were completed, Rahul pushed 8 file changes, and the authentication module is ready for review."
    },
    {
      q: "Explain LoginService",
      a: "LoginService checks the user's password, creates a session token and passes it to SecurityConfig."
    },
    {
      q: "Summarize this week",
      a: "24 tasks closed, 2 integrations merged into Main, and 1 review is still waiting for you."
    }
  ];

  const aiQuestionBtns = document.querySelectorAll('.ai-question-btn');
  const aiChatQuestion = document.getElementById('ai-chat-question');
  const aiChatAnswer = document.getElementById('ai-chat-answer');

  aiQuestionBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      aiQuestionBtns.forEach(b => {
        b.classList.remove('border-violet-500', 'bg-violet-100', 'text-violet-900', 'font-bold');
        b.classList.add('border-[#b8bfc8]', 'bg-[#dce1e7]', 'text-[#2e3540]');
      });
      btn.classList.add('border-violet-500', 'bg-violet-100', 'text-violet-900', 'font-bold');
      btn.classList.remove('border-[#b8bfc8]', 'bg-[#dce1e7]', 'text-[#2e3540]');

      if (aiChatQuestion && aiChatAnswer && chats[index]) {
        aiChatQuestion.textContent = chats[index].q;
        aiChatAnswer.textContent = chats[index].a;
      }
    });
  });

  // 5. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Ensure execution whether loaded before or after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCobug);
} else {
  initCobug();
}
