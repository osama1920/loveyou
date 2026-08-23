const PASSWORD = "2408";
const START_DATE = new Date("2026-03-28T00:00:00");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// دالة تشغيل الصوت التلقائية
function playAudio() {
    if (music.paused) {
        music.play().then(() => {
            if (musicBtn) musicBtn.textContent = "⏸️ إيقاف الأغنية";
        }).catch(err => {
            console.log("في انتظار التفاعل لتشغيل الصوت:", err);
        });
    }
}

// 💥 حيلة التشغيل التلقائي: تشغيل الأغنية فور لمس الشاشة لأول مرة
document.addEventListener("touchstart", playAudio, { once: true });
document.addEventListener("click", playAudio, { once: true });

// العناصر البرمجية
const passwordScreen = document.getElementById("passwordScreen");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const giftScreen = document.getElementById("giftScreen");
const surpriseScreen = document.getElementById("surpriseScreen");
const questionScreen = document.getElementById("questionScreen");
const memoriesScreen = document.getElementById("memoriesScreen");
const kissRefusedMsg = document.getElementById("kissRefusedMsg");

// 1. فك قفل الباسورد
function unlockGift() {
    playAudio(); // تشغيل الصوت فوراً عند فتح الهدية
    if (passwordInput.value.trim() === PASSWORD) {
        passwordScreen.classList.add("hidden");
        giftScreen.classList.remove("hidden");
        particles(20);
    } else {
        passwordError.textContent = "الباسورد مش صح 😘 جربي تاني";
        passwordInput.value = "";
    }
}
document.getElementById("unlockBtn").addEventListener("click", unlockGift);
passwordInput.addEventListener("keydown", e => { if (e.key === "Enter") unlockGift(); });

// 2. القلوب والـ Particles
function particles(n) {
    const wrap = document.getElementById("particles");
    if (!wrap) return;
    for (let i = 0; i < n; i++) {
        const p = document.createElement("span");
        p.textContent = "💖";
        p.style.position = "fixed";
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "0";
        p.style.fontSize = "24px";
        p.style.transition = "3s";
        p.style.zIndex = "99";
        wrap.appendChild(p);
        requestAnimationFrame(() => {
            p.style.transform = "translateY(-100vh)";
            p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), 3000);
    }
}

// 3. الضغط على الهدية
document.getElementById("giftBox").addEventListener("click", () => {
    playAudio();
    particles(35);
    setTimeout(() => {
        giftScreen.classList.add("hidden");
        surpriseScreen.classList.remove("hidden");
    }, 500);
});

// 4. الانتقال لسؤال "عايز بوسة"
document.getElementById("showMemories").addEventListener("click", () => {
    surpriseScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
});

// 5. إجابات "عايز بوسة؟"
document.getElementById("yesKissBtn").addEventListener("click", () => {
    particles(40);
    questionScreen.classList.add("hidden");
    memoriesScreen.classList.remove("hidden");
    updateCounter();
    setInterval(updateCounter, 1000);
});

document.getElementById("noKissBtn").addEventListener("click", () => {
    kissRefusedMsg.classList.remove("hidden");
});

// 6. العداد
function updateCounter() {
    let x = Math.max(0, Date.now() - START_DATE);
    const d = 86400000, h = 3600000, m = 60000;
    
    const days = Math.floor(x / d); x %= d;
    const hours = Math.floor(x / h); x %= h;
    const mins = Math.floor(x / m); x %= m;
    const secs = Math.floor((x / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(mins).padStart(2, "0");
    document.getElementById("seconds").textContent = String(secs).padStart(2, "0");
}

// 7. زر التحكم بالصوت من خارج الشاشة
musicBtn.addEventListener("click", function(e) {
    e.stopPropagation(); // منع التداخل
    if (music.paused) {
        music.play();
        musicBtn.textContent = "⏸️ إيقاف الأغنية";
    } else {
        music.pause();
        musicBtn.textContent = "🎵 تشغيل الأغنية";
    }
});
