// Simple synth sounds to avoid external dependencies for now
export const playSound = (type) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();

    if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'incorrect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
        const now = ctx.currentTime;
        [400, 500, 600, 800].forEach((freq, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            o.frequency.value = freq;
            o.type = 'square';
            g.gain.setValueAtTime(0.1, now + i * 0.1);
            g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
            o.start(now + i * 0.1);
            o.stop(now + i * 0.1 + 0.3);
        });
    }
};

// Utility to ensure voices are loaded
let voices = [];
const loadVoices = () => {
    voices = window.speechSynthesis.getVoices();
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
}

export const speak = (text, options = {}) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Añadir muletillas naturales para que no suene tan robotizado
    const fillersEs = ['Oye...', '¡Mira!', 'A ver...', 'Mmmm...', '¡Guau!', ''];
    const fillersEn = ['Hey...', 'Look!', 'Let\'s see...', 'Ummm...', 'Wow!', ''];

    const isEnglish = options.lang === 'en-US';
    const fillers = isEnglish ? fillersEn : fillersEs;
    const randomFiller = options.isQuestion ? fillers[Math.floor(Math.random() * fillers.length)] : '';

    // Mejorar la puntuación y QUITAR EMOJIS para que no los lea
    let speechText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

    if (options.isQuestion) {
        speechText = `${randomFiller} ${speechText}`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);

    if (voices.length === 0) loadVoices();

    // Selección de voz según el idioma
    let bestVoice;
    if (isEnglish) {
        bestVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
            voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith('en')) ||
            voices.find(v => v.lang.startsWith('en')) ||
            voices[0];
        utterance.lang = 'en-US';
    } else {
        bestVoice = voices.find(v => v.name.includes('Microsoft Sabina') || v.name.includes('Helena')) ||
            voices.find(v => v.name.includes('Google') && v.lang.startsWith('es')) ||
            voices.find(v => v.lang === 'es-MX') ||
            voices.find(v => v.lang.startsWith('es')) ||
            voices[0];
        utterance.lang = 'es-MX';
    }

    if (bestVoice) {
        utterance.voice = bestVoice;
    }

    // El "Punto Caramelo" para una voz de oso niño natural:
    utterance.pitch = 1.3 + (Math.random() * 0.05);
    utterance.rate = 0.95 + (Math.random() * 0.05);
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
};

export default playSound;
