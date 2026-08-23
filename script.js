const PASSWORD = "2408";
const START_DATE = new Date("2026-03-28T00:00:00");

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

// 2. تأثير التألق والقلوب
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
    particles(35);
    setTimeout(() => {
        giftScreen.classList.add("hidden");
        surpriseScreen.classList.remove("hidden");
    }, 500);
});

// 4. الانتقال لسلايد السؤال عند الضغط على زر "التالي"
document.getElementById("showMemories").addEventListener("click", () => {
    surpriseScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
});

// 5. التحكم في إجابات سؤال "عايز بوسة؟"
// إذا ضغطت على "أوكيه":
document.getElementById("yesKissBtn").addEventListener("click", () => {
    particles(40);
    questionScreen.classList.add("hidden");
    memoriesScreen.classList.remove("hidden");
    // تشغيل العداد عند فتح سلايد الذكريات
    updateCounter();
    setInterval(updateCounter, 1000);
});

// إذا ضغطت على "لا":
document.getElementById("noKissBtn").addEventListener("click", () => {
    // إظهار الرسالة "أنا عايز بوسة ضروري"
    kissRefusedMsg.classList.remove("hidden");
});

// 6. دالة العداد الزمني (معدلة وحساب الثواني مضبوط)
function updateCounter() {
    let x = Math.max(0, Date.now() - START_DATE);
    const d = 86400000, h = 3600000, m = 60000;
    
    const days = Math.floor(x / d); x %= d;
    const hours = Math.floor(x / h); x %= h;
    const mins = Math.floor(x / m); x %= m;
    const secs = Math.floor((x / 1000) % 60); // التعديل الصحيح للثواني

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(mins).padStart(2, "0");
    document.getElementById("seconds").textContent = String(secs).padStart(2, "0");
}

// 7. كود الموسيقى المضمون
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", function() {
    if (music.paused) {
        var playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                musicBtn.textContent = "⏸️ إيقاف الأغنية";
            }).catch(error => {
                alert("تعذر تشغيل الصوت! تأكد أن الملف اسمه music.mp3 وموجود داخل مجلد assets: " + error);
            });
        }
    } else {
        music.pause();
        musicBtn.textContent = "🎵 تشغيل الأغنية";
    }
});
