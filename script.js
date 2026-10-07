/* ==================================================
   BIRTHDAY QUEST
   CHAPTER 1
================================================== */


/* =========================
   ELEMENTS
========================= */

const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const mapScreen = document.getElementById("mapScreen");
const roomScreen = document.getElementById("roomScreen");

const progressBar = document.getElementById("progressBar");
const progressNumber = document.getElementById("progressNumber");
const loadingText = document.getElementById("loadingText");

const startButton = document.getElementById("startButton");

const heartCount = document.getElementById("heartCount");
const bottomHeartCount = document.getElementById("bottomHeartCount");

const finalDoorText = document.getElementById("finalDoorText");

const roomIcon = document.getElementById("roomIcon");
const roomTitle = document.getElementById("roomTitle");
const roomDescription = document.getElementById("roomDescription");

const backButton = document.getElementById("backButton");

const musicButton = document.getElementById("musicButton");


/* =========================
   GAME DATA
========================= */

let hearts = 0;

let musicPlaying = false;

let audioContext = null;
let masterGain = null;

const loadingMessages = [
    "Gathering birthday magic...",
    "Searching for suspicious amounts of sparkle...",
    "Hiding a few surprises...",
    "Checking the memory vault...",
    "Adding unnecessary drama...",
    "Polishing the stars...",
    "Almost ready...",
    "Okay... this should be fun."
];


/* =========================
   SCREEN SYSTEM
========================= */

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


/* =========================
   LOADING ANIMATION
========================= */

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 5) + 1;

    if (progress > 100) {
        progress = 100;
    }

    progressBar.style.width = progress + "%";

    progressNumber.textContent = progress;

    const messageIndex = Math.min(
        Math.floor(progress / 13),
        loadingMessages.length - 1
    );

    loadingText.textContent =
        loadingMessages[messageIndex];

    if (progress >= 100) {

        clearInterval(loadingInterval);

        setTimeout(() => {

            showScreen(welcomeScreen);

        }, 900);
    }

}, 120);


/* =========================
   START BUTTON
========================= */

startButton.addEventListener("click", () => {

    startMusic();

    showScreen(mapScreen);

    createHeartBurst(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

});


/* =========================
   MAP ROOMS
========================= */

document.querySelectorAll(".map-card").forEach(card => {

    card.addEventListener("click", () => {

        const room = card.dataset.room;

        openRoom(room);

    });

});


function openRoom(room) {

    if (room === "final" && hearts < 3) {

        shakeFinalDoor();

        finalDoorText.textContent =
            `Still locked • ${3 - hearts} heart(s) needed`;

        return;
    }


    if (room === "chaos") {

        roomIcon.textContent = "🎮";

        roomTitle.textContent = "Chaos Room";

        roomDescription.textContent =
            "Games and ridiculous challenges are waiting here. This is where the real adventure begins.";

    }


    if (room === "memory") {

        roomIcon.textContent = "📸";

        roomTitle.textContent = "Memory Garden";

        roomDescription.textContent =
            "A garden full of hidden memories. Some things may not be where you expect them...";

    }


    if (room === "cinema") {

        roomIcon.textContent = "🎬";

        roomTitle.textContent = "Secret Cinema";

        roomDescription.textContent =
            "There is definitely something behind this door. But you're not getting it yet. 👀";

    }


    if (room === "final") {

        roomIcon.textContent = "🎆";

        roomTitle.textContent = "The Final Door";

        roomDescription.textContent =
            "You collected every heart. The final part of the birthday quest can now begin.";

    }


    showScreen(roomScreen);

}


/* =========================
   BACK BUTTON
========================= */

backButton.addEventListener("click", () => {

    showScreen(mapScreen);

});


/* =========================
   HEART SYSTEM
========================= */

function addHeart(amount = 1) {

    hearts += amount;

    if (hearts > 3) {
        hearts = 3;
    }

    heartCount.textContent = hearts;

    bottomHeartCount.textContent = hearts;

    if (hearts >= 3) {

        finalDoorText.textContent =
            "✨ UNLOCKED ✨";

    }

}


/* =========================
   FINAL DOOR SHAKE
========================= */

function shakeFinalDoor() {

    const card = document.querySelector(".final-card");

    card.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 400
        }
    );

}


/* =========================
   HEART EFFECT
========================= */

function createHeartBurst(x, y) {

    for (let i = 0; i < 8; i++) {

        const heart = document.createElement("div");

        heart.className = "heart-pop";

        heart.textContent =
            ["💗", "💕", "💖", "✨"][Math.floor(Math.random() * 4)];

        heart.style.left =
            (x + (Math.random() * 120 - 60)) + "px";

        heart.style.top =
            (y + (Math.random() * 60 - 30)) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

}


/* =========================
   FLOATING PARTICLES
========================= */

function createParticles() {

    const container =
        document.getElementById("particles");

    const symbols = [
        "✦",
        "✧",
        "·",
        "♡",
        "✦",
        "⋆"
    ];

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.fontSize =
            (8 + Math.random() * 15) + "px";

        particle.style.animationDuration =
            (8 + Math.random() * 15) + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        container.appendChild(particle);

    }

}

createParticles();


/* ==================================================
   ORIGINAL BACKGROUND MUSIC
================================================== */

function startMusic() {

    if (audioContext) {
        return;
    }

    audioContext =
        new (window.AudioContext ||
            window.webkitAudioContext)();

    masterGain =
        audioContext.createGain();

    masterGain.gain.value = 0.055;

    masterGain.connect(
        audioContext.destination
    );

    musicPlaying = true;

    musicButton.textContent =
        "🔊 Music ON";

    playAmbientLoop();

}


/* =========================
   AMBIENT MUSIC
========================= */

function playAmbientLoop() {

    if (!musicPlaying) {
        return;
    }

    const notes = [
        261.63,
        329.63,
        392.00,
        523.25,
        392.00,
        329.63
    ];

    notes.forEach((frequency, index) => {

        setTimeout(() => {

            if (!musicPlaying) {
                return;
            }

            playNote(
                frequency,
                2.5
            );

        }, index * 900);

    });

    setTimeout(() => {

        playAmbientLoop();

    }, notes.length * 900 + 1000);

}


/* =========================
   PLAY NOTE
========================= */

function playNote(frequency, duration) {

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        0,
        audioContext.currentTime
    );

    gain.gain.linearRampToValueAtTime(
        0.8,
        audioContext.currentTime + 0.2
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);

    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );

}


/* =========================
   MUSIC BUTTON
========================= */

musicButton.addEventListener("click", () => {

    if (!audioContext) {
        startMusic();
        return;
    }

    if (musicPlaying) {

        musicPlaying = false;

        masterGain.gain.value = 0;

        musicButton.textContent =
            "🔇 Music OFF";

    } else {

        musicPlaying = true;

        masterGain.gain.value = 0.055;

        musicButton.textContent =
            "🔊 Music ON";

        playAmbientLoop();

    }

});

/* ==================================================
   CHAPTER 2 — CHAOS ROOM
================================================== */


/* =========================
   CHAOS ELEMENTS
========================= */

const chaosScreen =
    document.getElementById("chaosScreen");

const chaosIntro =
    document.getElementById("chaosIntro");

const quizStage =
    document.getElementById("quizStage");

const heartStage =
    document.getElementById("heartStage");

const dontPressStage =
    document.getElementById("dontPressStage");

const chaosComplete =
    document.getElementById("chaosComplete");

const beginChaosButton =
    document.getElementById("beginChaosButton");

const chaosBackButton =
    document.getElementById("chaosBackButton");

const quizQuestion =
    document.getElementById("quizQuestion");

const quizAnswers =
    document.getElementById("quizAnswers");

const quizReaction =
    document.getElementById("quizReaction");

const movingHeart =
    document.getElementById("movingHeart");

const caughtCount =
    document.getElementById("caughtCount");

const dontPressButton =
    document.getElementById("dontPressButton");

const dontPressReaction =
    document.getElementById("dontPressReaction");

const claimHeartButton =
    document.getElementById("claimHeartButton");

const chaosHeartCount =
    document.getElementById("chaosHeartCount");


/* =========================
   OPEN CHAOS ROOM
========================= */

function openChaosRoom() {

    showScreen(chaosScreen);

    chaosIntro.classList.add("active-stage");

    quizStage.classList.remove("active-stage");
    heartStage.classList.remove("active-stage");
    dontPressStage.classList.remove("active-stage");
    chaosComplete.classList.remove("active-stage");

}


/* =========================
   CONNECT MAP BUTTON
========================= */

document
    .querySelector('[data-room="chaos"]')
    .addEventListener("click", () => {

        openChaosRoom();

    });


/* =========================
   CHAOS BACK BUTTON
========================= */

chaosBackButton.addEventListener("click", () => {

    showScreen(mapScreen);

});


/* =========================
   START CHAOS
========================= */

beginChaosButton.addEventListener("click", () => {

    chaosIntro.classList.remove("active-stage");

    quizStage.classList.add("active-stage");

    loadQuiz();

});


/* ==================================================
   CHALLENGE 1 — QUIZ
================================================== */

const chaosQuestions = [

    {
        question:
            "What is the correct answer to this extremely important question?",

        answers: [
            "Obviously me 😌",
            "Chocolate 🍫",
            "Sleep 😴",
            "All of the above 😂"
        ]
    },

    {
        question:
            "Which option sounds the most suspicious?",

        answers: [
            "I did nothing.",
            "Trust me.",
            "It's a surprise.",
            "Definitely not that button."
        ]
    }

];


let currentQuestion = 0;


function loadQuiz() {

    const question =
        chaosQuestions[currentQuestion];

    quizQuestion.textContent =
        question.question;

    quizAnswers.innerHTML = "";

    quizReaction.textContent = "";

    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer;

        button.addEventListener("click", () => {

            quizReaction.textContent =
                getFunnyReaction();

            setTimeout(() => {

                currentQuestion++;

                if (
                    currentQuestion <
                    chaosQuestions.length
                ) {

                    loadQuiz();

                } else {

                    startHeartGame();

                }

            }, 900);

        });

        quizAnswers.appendChild(button);

    });

}


function getFunnyReaction() {

    const reactions = [

        "Hmm... interesting choice. 👀",

        "I'll allow it. 😂",

        "That answer was definitely something.",

        "Correct? Wrong? Who cares. 😂",

        "Okay, moving on before this gets serious."

    ];

    return reactions[
        Math.floor(
            Math.random() * reactions.length
        )
    ];

}


/* ==================================================
   CHALLENGE 2 — CATCH HEARTS
================================================== */

let caught = 0;


function startHeartGame() {

    quizStage.classList.remove("active-stage");

    heartStage.classList.add("active-stage");

    caught = 0;

    caughtCount.textContent = caught;

    moveHeart();

}


movingHeart.addEventListener("click", () => {

    caught++;

    caughtCount.textContent =
        caught;

    createHeartBurst(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

    if (caught >= 5) {

        heartStage.classList.remove(
            "active-stage"
        );

        dontPressStage.classList.add(
            "active-stage"
        );

        return;

    }

    moveHeart();

});


function moveHeart() {

    const arena =
        document.getElementById(
            "heartArena"
        );

    const maxX =
        arena.clientWidth - 70;

    const maxY =
        arena.clientHeight - 70;

    const x =
        Math.random() * maxX + 5;

    const y =
        Math.random() * maxY + 5;

    movingHeart.style.left =
        x + "px";

    movingHeart.style.top =
        y + "px";

}


/* ==================================================
   CHALLENGE 3 — DON'T PRESS
================================================== */

let pressCount = 0;


dontPressButton.addEventListener("click", () => {

    pressCount++;

    const reactions = [

        "I literally told you not to press it. 😂",

        "You pressed it AGAIN?!",

        "Okay... apparently instructions mean nothing here.",

        "One more time. I'm judging you. 👀",

        "Fine. You win. 😂"

    ];

    dontPressReaction.textContent =
        reactions[
            Math.min(
                pressCount - 1,
                reactions.length - 1
            )
        ];


    if (pressCount >= 4) {

        setTimeout(() => {

            dontPressStage.classList.remove(
                "active-stage"
            );

            chaosComplete.classList.add(
                "active-stage"
            );

            createHeartBurst(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

        }, 700);

    }

});


/* ==================================================
   CLAIM FIRST HEART
================================================== */

claimHeartButton.addEventListener("click", () => {

    addHeart(1);

    chaosHeartCount.textContent =
        "1";

    createHeartBurst(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

    showScreen(mapScreen);

});

/* ========================================= */
/* 🌸 MEMORY GARDEN — V2 JAVASCRIPT */
/* ========================================= */


/* ========================================= */
/* GET MEMORY ELEMENTS */
/* ========================================= */

const memoryScreen =
    document.getElementById("memoryScreen");

const memoryBackButton =
    document.getElementById("memoryBackButton");

const memoryWorld =
    document.getElementById("memoryWorld");

const memoryOrbs =
    document.querySelectorAll(".memory-orb");

const memoryCount =
    document.getElementById("memoryCount");

const memoryReveal =
    document.getElementById("memoryReveal");

const memoryImage =
    document.getElementById("memoryImage");

const memoryTitle =
    document.getElementById("memoryTitle");

const memoryMessage =
    document.getElementById("memoryMessage");

const closeMemory =
    document.getElementById("closeMemory");

const collectMemory =
    document.getElementById("collectMemory");

const memoryComplete =
    document.getElementById("memoryComplete");

const memoryHeartButton =
    document.getElementById("memoryHeartButton");


/* ========================================= */
/* 📸 YOUR 8 MEMORIES */
/* ========================================= */

const memories = [

    {
        image: "/photos/photo1.jpg",
        title: "A little memory 🌸",
        message: "Some moments are just too nice to leave forgotten."
    },

    {
        image: "/photos/photo2.jpg",
        title: "Memory unlocked ✨",
        message: "Okay... this one definitely deserved its own little spotlight."
    },

    {
        image: "/photos/photo3.jpg",
        title: "Another one 👀",
        message: "The garden is slowly revealing its secrets..."
    },

    {
        image: "/photos/photo4.jpg",
        title: "A special moment 🌷",
        message: "One more memory added to the collection."
    },

    {
        image: "/photos/photo5.jpg",
        title: "Halfway there! 💫",
        message: "We're getting closer to finding everything hidden here."
    },

    {
        image: "/photos/photo6.jpg",
        title: "Memory found 🌺",
        message: "Yep... this one belongs in the garden."
    },

    {
        image: "/photos/photo7.jpg",
        title: "Almost there 👀",
        message: "Only one more mystery remains..."
    },

    {
        image: "/photos/photo8.jpg",
        title: "The final memory 💗",
        message: "You found the last one!"
    }

];


/* ========================================= */
/* MEMORY STATE */
/* ========================================= */

let memoriesFound = 0;

let currentMemory = null;


/* ========================================= */
/* 🌸 OPEN MEMORY GARDEN */
/* ========================================= */

function openMemoryGarden() {

    showScreen(memoryScreen);

    memoriesFound = 0;

    currentMemory = null;

    memoryCount.textContent = "0";

    memoryReveal.classList.remove("active");

    memoryComplete.classList.remove("active");

    memoryOrbs.forEach(orb => {

        orb.classList.remove("discovered");

        orb.disabled = false;

    });

}


/* ========================================= */
/* 🗺️ MAP → MEMORY GARDEN */
/* ========================================= */

const memoryMapButton =
    document.querySelector('[data-room="memory"]');

if (memoryMapButton) {

    memoryMapButton.addEventListener(
        "click",
        openMemoryGarden
    );

}


/* ========================================= */
/* ← BACK TO MAP */
/* ========================================= */

if (memoryBackButton) {

    memoryBackButton.addEventListener(
        "click",
        () => {

            memoryReveal.classList.remove("active");

            memoryComplete.classList.remove("active");

            showScreen(mapScreen);

        }
    );

}


/* ========================================= */
/* 📸 OPEN A MEMORY */
/* ========================================= */

memoryOrbs.forEach((orb, index) => {

    orb.addEventListener("click", () => {

        /* Prevent opening twice */

        if (orb.classList.contains("discovered")) {
            return;
        }


        /* Get memory */

        const memory =
            memories[index];


        currentMemory = index;


        /* Set image */

        memoryImage.src =
            memory.image;


        /* Set text */

        memoryTitle.textContent =
            memory.title;

        memoryMessage.textContent =
            memory.message;


        /* Open reveal */

        memoryReveal.classList.add("active");


        /* Mark discovered */

        orb.classList.add("discovered");


        /* Update counter */

        memoriesFound++;

        memoryCount.textContent =
            memoriesFound;

    });

});


/* ========================================= */
/* ✕ CLOSE MEMORY */
/* ========================================= */

if (closeMemory) {

    closeMemory.addEventListener(
        "click",
        () => {

            memoryReveal.classList.remove(
                "active"
            );

        }
    );

}


/* ========================================= */
/* 💗 COLLECT MEMORY */
/* ========================================= */

if (collectMemory) {

    collectMemory.addEventListener(
        "click",
        () => {

            memoryReveal.classList.remove(
                "active"
            );


            /* If all 8 are found */

            if (memoriesFound >= 8) {

                setTimeout(() => {

                    memoryComplete.classList.add(
                        "active"
                    );

                }, 400);

            }

        }
    );

}


/* ========================================= */
/* 🖱️ CLICK OUTSIDE MEMORY */
/* ========================================= */

if (memoryReveal) {

    memoryReveal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === memoryReveal
            ) {

                memoryReveal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ========================================= */
/* 💗 FINAL MEMORY HEART */
/* ========================================= */

if (memoryHeartButton) {

    memoryHeartButton.addEventListener(
        "click",
        () => {

            /*
             * Give the player one heart
             */

            addHeart(1);


            /* Close completion screen */

            memoryComplete.classList.remove(
                "active"
            );


            /* Return to map */

            showScreen(mapScreen);

        }
    );

}


/* ========================================= */
/* 🖼️ IMAGE ERROR CHECK */
/* ========================================= */

memoryImage.addEventListener(
    "error",
    () => {

        memoryImage.alt =
            "Photo could not be loaded";

        console.log(
            "Memory image could not be loaded:",
            memoryImage.src
        );

    }
);

/* ========================================= */
/* 🎬 SECRET CINEMA — ROOM CONNECTION */
/* ========================================= */

const cinemaScreen =
    document.getElementById("cinemaScreen");

const cinemaMapButton =
    document.querySelector('[data-room="cinema"]');

const cinemaBackButton =
    document.getElementById("cinemaBackButton");


function openCinema() {

    if (!cinemaScreen) return;

    showScreen(cinemaScreen);

}


/* OPEN CINEMA FROM MAP */

if (cinemaMapButton) {

    cinemaMapButton.addEventListener("click", () => {

        openCinema();

    });

}


/* BACK TO MAP */

if (cinemaBackButton) {

    cinemaBackButton.addEventListener("click", () => {

        showScreen(mapScreen);

    });

}

/* ========================================= */
/* 🎬 SECRET CINEMA — VIDEO SYSTEM */
/* ========================================= */

const cinemaVideo =
    document.getElementById("cinemaVideo");

const cinemaPlaceholder =
    document.getElementById("cinemaPlaceholder");

const reelCards =
    document.querySelectorAll(".reel-card");

const cinemaCount =
    document.getElementById("cinemaCount");

const cinemaComplete =
    document.getElementById("cinemaComplete");

const cinemaHeartButton =
    document.getElementById("cinemaHeartButton");


const reels = [
    {
        video: "/videos/video1.mp4"
    },
    {
        video: "/videos/video2.mp4"
    }
];


let reelsFound = 0;
let currentReel = null;


/* ========================================= */
/* 🎞️ SELECT A REEL */
/* ========================================= */

reelCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const reel = reels[index];

        if (!reel) return;

        currentReel = index;

        cinemaVideo.src = reel.video;

        cinemaVideo.style.display = "block";

        cinemaPlaceholder.style.display = "none";

        cinemaVideo.load();

        cinemaVideo.play().catch(error => {

            console.log(
                "Video playback:",
                error
            );

        });

    });

});


/* ========================================= */
/* 🎬 WHEN VIDEO FINISHES */
/* ========================================= */

cinemaVideo.addEventListener("ended", () => {

    if (currentReel === null) return;


    const card = reelCards[currentReel];


    /* Already completed? */

    if (card.classList.contains("unlocked")) {

        return;

    }


    /* Mark reel as completed */

    card.classList.add("unlocked");

    reelsFound++;

    cinemaCount.textContent = reelsFound;


    /* Clear current reel */

    currentReel = null;


    /* BOTH REELS COMPLETED */

    if (reelsFound >= 2) {

        setTimeout(() => {

            cinemaComplete.classList.add("active");

        }, 700);

    }

});


/* ========================================= */
/* 💗 COLLECT CINEMA HEART */
/* ========================================= */

if (cinemaHeartButton) {

    cinemaHeartButton.addEventListener("click", () => {

        addHeart(1);

        cinemaComplete.classList.remove("active");

        cinemaVideo.pause();

        cinemaVideo.style.display = "none";

        cinemaPlaceholder.style.display = "flex";

        showScreen(mapScreen);

    });

}

/* ========================================= */
/* 🔐 FINAL DOOR — ROOM CONNECTION */
/* ========================================= */

const finalScreen =
    document.getElementById("finalScreen");

const finalMapButton =
    document.querySelector('[data-room="final"]');

const finalBackButton =
    document.getElementById("finalBackButton");

const finalDoor =
    document.getElementById("finalDoor");

const finalRequirement =
    document.getElementById("finalRequirement");

const finalReveal =
    document.getElementById("finalReveal");

const finalHeartCount =
    document.getElementById("finalHeartCount");

const restartAdventure =
    document.getElementById("restartAdventure");


/* OPEN FINAL DOOR FROM MAP */

if (finalMapButton) {

    finalMapButton.addEventListener("click", () => {

        showScreen(finalScreen);

        finalRequirement.style.display = "block";

        finalReveal.classList.remove("active");

        finalHeartCount.textContent = hearts;

    });

}


/* BACK TO MAP */

if (finalBackButton) {

    finalBackButton.addEventListener("click", () => {

        finalReveal.classList.remove("active");

        showScreen(mapScreen);

    });

}

/* ========================================= */
/* 🔐 FINAL DOOR — HEART UNLOCK SYSTEM */
/* ========================================= */

const finalDoorScreen =
    document.getElementById("finalScreen");

const finalDoorElement =
    document.getElementById("finalDoor");

const finalDoorRequirement =
    document.getElementById("finalRequirement");

const finalDoorReveal =
    document.getElementById("finalReveal");

const finalDoorHeartCount =
    document.getElementById("finalHeartCount");

const finalDoorBack =
    document.getElementById("finalBackButton");

const finalDoorMapButton =
    document.querySelector('[data-room="final"]');

const finalReplayButton =
    document.getElementById("restartAdventure");


/* ========================================= */
/* OPEN FINAL DOOR FROM MAP */
/* ========================================= */

if (finalDoorMapButton) {

    finalDoorMapButton.addEventListener("click", () => {

        showScreen(finalDoorScreen);

        finalDoorReveal.classList.remove("active");

        finalDoorRequirement.style.display = "block";

        finalDoorHeartCount.textContent = hearts;

        finalDoorElement.classList.remove(
            "door-unlocked",
            "door-locked"
        );

    });

}


/* ========================================= */
/* CLICK THE DOOR */
/* ========================================= */

if (finalDoorElement) {

    finalDoorElement.addEventListener("click", () => {

        /* Update the displayed hearts */

        finalDoorHeartCount.textContent = hearts;


        /* ================================= */
        /* NOT ENOUGH HEARTS */
        /* ================================= */

        if (hearts < 3) {

            finalDoorElement.classList.remove(
                "door-unlocked"
            );

            finalDoorElement.classList.add(
                "door-locked"
            );

            return;
        }


        /* ================================= */
        /* ALL 3 HEARTS COLLECTED */
        /* ================================= */

        finalDoorElement.classList.remove(
            "door-locked"
        );

        finalDoorElement.classList.add(
            "door-unlocked"
        );


        /* Hide the locked-door message */

        finalDoorRequirement.style.display = "none";


        /* ================================= */
        /* OPEN THE FINAL REVEAL */
        /* ================================= */

        setTimeout(() => {

            finalDoorReveal.classList.add("active");

        }, 900);

    });

}


/* ========================================= */
/* BACK TO MAP */
/* ========================================= */

if (finalDoorBack) {

    finalDoorBack.addEventListener("click", () => {

        finalDoorReveal.classList.remove("active");

        showScreen(mapScreen);

    });

}


/* ========================================= */
/* REPLAY ADVENTURE */
/* ========================================= */

if (finalReplayButton) {

    finalReplayButton.addEventListener("click", () => {

        location.reload();

    });

}

/* ========================================= */
/* ✨ SPECIAL MEMORY — FINAL SECRET */
/* ========================================= */

const specialMemoryButton =
    document.getElementById("specialMemoryButton");

const specialMemoryReveal =
    document.getElementById("specialMemoryReveal");

const closeSpecialMemory =
    document.getElementById("closeSpecialMemory");


/* ========================================= */
/* ✨ OPEN SPECIAL MEMORY */
/* ========================================= */

if (specialMemoryButton && specialMemoryReveal) {

    specialMemoryButton.addEventListener("click", () => {

        specialMemoryReveal.classList.add("active");

    });

}


/* ========================================= */
/* ✕ CLOSE SPECIAL MEMORY */
/* ========================================= */

if (closeSpecialMemory && specialMemoryReveal) {

    closeSpecialMemory.addEventListener("click", () => {

        specialMemoryReveal.classList.remove("active");

    });

}


/* ========================================= */
/* CLICK OUTSIDE CARD TO CLOSE */
/* ========================================= */

if (specialMemoryReveal) {

    specialMemoryReveal.addEventListener("click", (event) => {

        if (event.target === specialMemoryReveal) {

            specialMemoryReveal.classList.remove("active");

        }

    });

}