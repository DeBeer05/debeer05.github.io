// app.js (ES module)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot,
    collection, addDoc, query, where, orderBy, serverTimestamp, getDocs, limit
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/** Firebase config */
const firebaseConfig = {
    apiKey: "AIzaSyAnNDcu5NLFpSLIFhb-6v1ddHIXuJ6NXQs",
    authDomain: "retro-a3e1b.firebaseapp.com",
    projectId: "retro-a3e1b",
    storageBucket: "retro-a3e1b.firebasestorage.app",
    messagingSenderId: "591296778580",
    appId: "1:591296778580:web:4ba3122a57152b934f38c1",
    measurementId: "G-HQT91HTFZ0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- Utils ----------
const $ = (id) => document.getElementById(id);

const escapeHtml = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    }[m]));

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function normalizeRoom(code) { return code.trim().toUpperCase().replace(/\s+/g, "-").slice(0, 24); }
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// ---------- Game Data ----------
const CATS = [
    { key: "growth", label: "🍄 Groei" },
    { key: "team", label: "🤝 Team" },
    { key: "process", label: "🧩 Proces" },
    { key: "tech", label: "🛠️ Tech" },
    { key: "feel", label: "🎭 Feelings" },
    { key: "boss", label: "👾 Final Boss" }
];

const QUESTIONS = {
    growth: [
        "Wat is je grootste skill-groei over sprint 1 → 5? Geef een voorbeeld.",
        "Wat deed je in sprint 5 beter dan in sprint 2 (concreet gedrag)?",
        "Waar ben je het meest trots op van alle 5 sprints, en waarom?"
    ],
    team: [
        "Welke team-dynamiek veranderde het meest over 5 sprints? Wat triggerde dat?",
        "Wanneer voelde je je het meest gehoord (of juist niet)? Wat was het effect?",
        "Wat is een moment dat jullie als team ‘boven jezelf uitstegen’?"
    ],
    process: [
        "Welke Scrum-afspraak had de meeste waarde? Welke was het minst nuttig (voor jullie)?",
        "Wat was jullie grootste ‘planning illusion’ in sprint 1–5? Wat leer je daarvan?",
        "Waar zat jullie grootste verspilling van tijd/energie over 5 sprints?"
    ],
    tech: [
        "Welke technische keuze zou je achteraf anders doen? Wat was de trade-off?",
        "Wat was jullie grootste debugging/issue moment — en wat leerde het team?",
        "Welke tool/stack/werkwijze ging ineens ‘klikken’ in sprint 4/5?"
    ],
    feel: [
        "Wanneer was je motivatie het laagst? Wat had geholpen?",
        "Wat was het spannendste moment (demo/review/conflict)? Hoe ging je ermee om?",
        "Wat is iets dat je nu durft te zeggen wat je in sprint 1 niet durfde?"
    ],
    boss: [
        "FINAL BOSS: Wat is jullie ‘legacy’ als team na 5 sprints?",
        "FINAL BOSS: Als sprint 1 jullie origin story was, wat is sprint 5 dan?",
        "FINAL BOSS: Welke les neem jij mee naar je volgende project (persoonlijk)?"
    ]
};

const POWERUPS = [
    { key: "none", name: "—", effect: "Geen power-up." },
    { key: "doubleTalk", name: "🍄 Double Talk", effect: "Geef je antwoord + leg uit: waarom juist dit?" },
    { key: "starMoment", name: "⭐ Star Moment", effect: "Iedereen geeft 1 korte reactie (max 10 sec)." },
    { key: "swap", name: "🔁 Swap Player", effect: "Presenter kiest iemand anders die antwoord geeft." },
    { key: "roleplay", name: "🎭 Role Play", effect: "Antwoord alsof je (Scrum Master / Tester / Dev / PO) bent." },
    { key: "hard", name: "💣 Hard Question", effect: "Follow-up: wat was jouw aandeel hierin?" },
    { key: "flashback", name: "🧱 Flashback", effect: "Koppel aan sprint 1: wat was toen anders?" },
    { key: "speed", name: "⏱️ Speed Round", effect: "30 sec: 1 zin + 1 voorbeeld." },
    { key: "truth", name: "🗣️ Truth Token", effect: "Zeg 1 ding dat je normaal inslikt (respectvol)." }
];

function catLabel(key) {
    return CATS.find(c => c.key === key)?.label ?? key;
}

function nextCatByIndex(i) {
    // rotate through non-boss categories; last player gets boss
    const pool = CATS.filter(c => c.key !== "boss").map(c => c.key);
    return pool[i % pool.length];
}

function genHostCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---------- Session ----------
let unsubRoom = null;
let unsubLive = null;
let unsubCoinsForPlayer = null;

let session = {
    room: null,
    role: null,
    name: null,
    playerId: null
};

// ---------- Links based on room ----------
function setRoleLinks() {
    const code = normalizeRoom($("roomCode").value || "RETRO-5SPRINTS");
    $("presenterLink").href = location.pathname + `?room=${encodeURIComponent(code)}&role=presenter`;
    $("playerLink").href = location.pathname + `?room=${encodeURIComponent(code)}&role=player`;
}
$("roomCode")?.addEventListener("input", setRoleLinks);
setRoleLinks();

function showView(which) {
    // index.html has these views:
    $("joinCard")?.classList.add("hidden");
    $("presenterView")?.classList.add("hidden");
    $("playerView")?.classList.add("hidden");
    $("endPresenterView")?.classList.add("hidden");
    $("endPlayerView")?.classList.add("hidden");

    $(which)?.classList.remove("hidden");
}

// ---------- Firestore room init ----------
async function createRoom(room) {
    const ref = doc(db, "rooms", room);
    const snap = await getDoc(ref);
    if (snap.exists()) return;

    const initial = {
        createdAt: serverTimestamp(),
        phase: "lobby", // lobby | playing | ended
        reveal: false,
        turnIndex: 0,
        turnOrder: [],
        hostCode: genHostCode(),

        // Mario party state
        board: {
            size: 12,
            positions: {} // playerId -> tile index
        },
        coins: {}, // playerId -> number

        current: {
            cat: "growth",
            question: pick(QUESTIONS.growth),
            power: POWERUPS[0]
        }
    };

    await setDoc(ref, initial);
}

async function joinRoom({ room, role, name, hostCode }) {
    session.room = room;
    session.role = role;
    session.name = name;

    await createRoom(room);

    const roomRef = doc(db, "rooms", room);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();

    if (role === "presenter") {
        // host code required
        const wanted = String(hostCode || "").trim().toUpperCase();
        if (!wanted) {
            alert("Presenter host code is vereist.");
            return;
        }
        if (wanted !== String(roomData.hostCode || "").toUpperCase()) {
            alert("Host code klopt niet.");
            return;
        }
    }

    if (role === "player") {
        // create player doc
        const playersRef = collection(db, "rooms", room, "players");
        const pDoc = await addDoc(playersRef, {
            name,
            joinedAt: serverTimestamp()
        });
        session.playerId = pDoc.id;

        // init coins and position if not present
        const updates = {};
        updates[`coins.${session.playerId}`] = 0;
        updates[`board.positions.${session.playerId}`] = 0;
        await updateDoc(roomRef, updates);
    }

    wireRoom();
}

function wireRoom() {
    const roomRef = doc(db, "rooms", session.room);

    unsubRoom?.();
    unsubRoom = onSnapshot(roomRef, async (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();

        if (session.role === "presenter") {
            if (data.phase === "ended") {
                showView("endPresenterView");
                await renderPresenterEnd(data);
            } else {
                showView("presenterView");
                renderPresenter(data);
            }
        } else {
            if (data.phase === "ended") {
                showView("endPlayerView");
                await renderPlayerEnd(data);
            } else {
                showView("playerView");
                renderPlayer(data);
            }
        }
    });

    // answers stream
    if (session.role === "presenter") {
        unsubLive?.();
        const ansRef = collection(db, "rooms", session.room, "answers");
        const q = query(ansRef, orderBy("createdAt", "desc"), limit(50));
        unsubLive = onSnapshot(q, (snap) => {
            const items = [];
            snap.forEach(d => items.push({ id: d.id, ...d.data() }));
            renderAnswers(items);
        });
    } else {
        // my history
        const ansRef = collection(db, "rooms", session.room, "answers");
        const q = query(ansRef, where("playerId", "==", session.playerId), orderBy("createdAt", "desc"), limit(30));
        onSnapshot(q, (snap) => {
            const items = [];
            snap.forEach(d => items.push({ id: d.id, ...d.data() }));
            renderMyHistory(items);
        });
    }
}

// ---------- Presenter actions ----------
async function buildTurnOrder(room) {
    const playersSnap = await getDocs(collection(db, "rooms", room, "players"));
    const players = [];
    playersSnap.forEach(p => players.push({ id: p.id, ...p.data() }));

    // shuffle
    for (let i = players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }
    return players;
}

async function presenterStart() {
    const roomRef = doc(db, "rooms", session.room);
    const order = await buildTurnOrder(session.room);
    if (order.length === 0) {
        alert("Nog geen players gejoined.");
        return;
    }

    const turnOrder = order.map(p => ({ playerId: p.id, name: p.name }));

    const firstCat = pick(CATS.filter(c => c.key !== "boss")).key;
    const firstQ = pick(QUESTIONS[firstCat]);

    // reset board positions & coins keep? -> keep coins at 0
    const positions = {};
    const coins = {};
    for (const p of turnOrder) {
        positions[p.playerId] = 0;
        coins[p.playerId] = coins[p.playerId] ?? 0; // keep existing
    }

    await updateDoc(roomRef, {
        phase: "playing",
        reveal: false,
        turnIndex: 0,
        turnOrder,
        board: { size: 12, positions },
        coins,
        current: { cat: firstCat, question: firstQ, power: POWERUPS[0] }
    });
}

async function presenterNext(data) {
    if (data.phase !== "playing") return;
    const roomRef = doc(db, "rooms", session.room);

    const currentIdx = data.turnIndex ?? 0;
    const nextIndex = currentIdx + 1;
    const total = data.turnOrder?.length ?? 0;

    if (total === 0) return;

    // move current player 1 tile forward (Mario Party step)
    const curPid = data.turnOrder[currentIdx]?.playerId;
    if (curPid) {
        const size = data.board?.size ?? 12;
        const curPos = data.board?.positions?.[curPid] ?? 0;
        await updateDoc(roomRef, {
            [`board.positions.${curPid}`]: (curPos + 1) % size
        });
    }

    if (nextIndex >= total) {
        await updateDoc(roomRef, { phase: "ended", reveal: true });
        return;
    }

    const cat = (nextIndex === total - 1) ? "boss" : nextCatByIndex(nextIndex);
    const q = pick(QUESTIONS[cat]);

    await updateDoc(roomRef, {
        reveal: false,
        turnIndex: nextIndex,
        current: { cat, question: q, power: POWERUPS[0] }
    });
}

async function presenterPrev(data) {
    if (data.phase !== "playing") return;
    const roomRef = doc(db, "rooms", session.room);
    const prev = Math.max(0, (data.turnIndex ?? 0) - 1);
    await updateDoc(roomRef, { turnIndex: prev, reveal: true });
}

async function presenterRollPower(data) {
    if (data.phase !== "playing") return;
    const roomRef = doc(db, "rooms", session.room);

    const pool = [
        ...POWERUPS.filter(p => p.key !== "none"),
        ...POWERUPS.filter(p => p.key !== "none"),
        ...POWERUPS
    ];
    const power = pick(pool);

    await updateDoc(roomRef, { "current.power": power });
}

async function presenterReveal() {
    const roomRef = doc(db, "rooms", session.room);
    await updateDoc(roomRef, { reveal: true });
}

async function presenterEnd() {
    const roomRef = doc(db, "rooms", session.room);
    await updateDoc(roomRef, { phase: "ended", reveal: true });
}

async function giveCoinToCurrent(data) {
    const roomRef = doc(db, "rooms", session.room);
    const idx = data.turnIndex ?? 0;
    const pid = data.turnOrder?.[idx]?.playerId;
    if (!pid) return;

    const current = (data.coins?.[pid] ?? 0) + 1;
    await updateDoc(roomRef, { [`coins.${pid}`]: current });
}

// ---------- Presenter render ----------
function renderBoard(data) {
    const boardEl = $("board");
    if (!boardEl) return;

    boardEl.innerHTML = "";
    const size = data.board?.size ?? 12;
    const positions = data.board?.positions ?? {};

    // Map tile index -> first letter(s)
    const tileLetters = new Array(size).fill("");

    for (const [pid, pos] of Object.entries(positions)) {
        const name = data.turnOrder?.find(p => p.playerId === pid)?.name ?? "P";
        const letter = name.trim().charAt(0).toUpperCase() || "P";
        const idx = clamp(Number(pos) || 0, 0, size - 1);
        tileLetters[idx] = tileLetters[idx] ? (tileLetters[idx] + letter) : letter;
    }

    for (let i = 0; i < size; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = tileLetters[i] || (i + 1);

        // highlight current player's tile
        const curIdx = data.turnIndex ?? 0;
        const curPid = data.turnOrder?.[curIdx]?.playerId;
        if (curPid && (positions[curPid] ?? 0) === i) tile.classList.add("active");

        boardEl.appendChild(tile);
    }
}

function renderPresenter(data) {
    $("roomOut").textContent = session.room;
    $("phaseBadge").textContent = String(data.phase || "").toUpperCase();

    const count = (data.turnOrder?.length ?? 0);
    $("playerCount").textContent = String(count);

    const idx = data.turnIndex ?? 0;
    const currentPlayer = data.turnOrder?.[idx];
    $("turnName").textContent = currentPlayer ? currentPlayer.name : "—";

    // meta
    $("turnMeta") && ($("turnMeta").textContent = currentPlayer ? `Beurt: ${idx + 1}/${count}` : "—");

    const cat = data.current?.cat ?? "growth";
    $("tag").textContent = catLabel(cat);
    $("powerTag").textContent = `Power-up: ${data.current?.power?.name ?? "—"}`;

    $("question").textContent = data.current?.question ?? "—";

    // reveal badge
    $("revealState") && ($("revealState").textContent = data.reveal ? "REVEAL: ON" : "REVEAL: OFF");

    // coins total
    const coins = data.coins || {};
    const totalCoins = Object.values(coins).reduce((a, b) => a + (Number(b) || 0), 0);
    $("coinsTotal") && ($("coinsTotal").textContent = String(totalCoins));

    // board
    renderBoard(data);

    // buttons
    $("rollPowerBtn").onclick = () => presenterRollPower(data);
    $("revealBtn").onclick = () => presenterReveal();
    $("nextBtn").onclick = () => presenterNext(data);
    $("prevBtn").onclick = () => presenterPrev(data);
    $("endBtn").onclick = () => presenterEnd();
    $("giveCoinBtn") && ($("giveCoinBtn").onclick = () => giveCoinToCurrent(data));

    // end screen back to lobby
    $("backToLobbyBtn") && ($("backToLobbyBtn").onclick = async () => {
        const roomRef = doc(db, "rooms", session.room);
        await updateDoc(roomRef, { phase: "lobby", reveal: false, turnIndex: 0, turnOrder: [] });
        location.reload();
    });
}

function renderAnswers(items) {
    const live = $("liveAnswers");
    const hi = $("highlights");
    if (!live || !hi) return;

    live.innerHTML = "";
    items.slice(0, 10).forEach(a => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
      <div class="muted small">${escapeHtml(a.playerName)} • ${escapeHtml(a.cat || "")} • ${escapeHtml(a.power || "")}</div>
      <div><b>${escapeHtml(a.text)}</b></div>
    `;
        live.appendChild(div);
    });

    hi.innerHTML = "";
    items.slice(0, 6).forEach(a => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
      <div class="muted small">${escapeHtml(a.playerName)}</div>
      <div>${escapeHtml(a.text)}</div>
    `;
        hi.appendChild(div);
    });
}

// ---------- Player ----------
async function playerSend(current, data) {
    const text = $("answer").value.trim();
    if (!text) return alert("Typ eerst iets 🙂");

    const idx = data.turnIndex ?? 0;
    const turn = data.turnOrder?.[idx];
    const myTurn = (turn && turn.playerId === session.playerId);

    if (!myTurn) {
        alert("Niet jouw beurt 🙂");
        return;
    }

    const ansRef = collection(db, "rooms", session.room, "answers");
    await addDoc(ansRef, {
        playerId: session.playerId,
        playerName: session.name,
        createdAt: serverTimestamp(),
        cat: current.cat,
        question: current.question,
        power: current.power?.name ?? "—",
        text
    });

    $("answer").value = "";
}

function renderPlayer(data) {
    $("meName").textContent = session.name;

    const phaseTxt = data.phase === "playing" ? "IN GAME" : String(data.phase || "").toUpperCase();
    $("playerStatus").textContent = phaseTxt;

    const idx = data.turnIndex ?? 0;
    const turn = data.turnOrder?.[idx];
    const myTurn = (turn && turn.playerId === session.playerId);

    const cat = data.current?.cat ?? "growth";
    $("meTag").textContent = catLabel(cat);
    $("mePower").textContent = `Power-up: ${data.current?.power?.name ?? "—"}`;

    $("turnInfo").textContent = turn
        ? `Beurt: ${idx + 1}/${data.turnOrder.length} • Aan de beurt: ${turn.name}`
        : "—";

    $("meQuestion").textContent = data.current?.question ?? "Wachten…";

    // coins
    const myCoins = data.coins?.[session.playerId] ?? 0;
    $("meCoins") && ($("meCoins").textContent = `💰 Coins: ${myCoins}`);

    // enable send only on my turn + playing
    const enabled = (data.phase === "playing") && myTurn;
    $("sendBtn").disabled = !enabled;
    $("sendBtn").onclick = () => playerSend(data.current, data);

    $("answer").placeholder = enabled
        ? "Typ je reflectie… (dieper = beter 😄)"
        : "Wacht op jouw beurt… (je kunt alvast nadenken)";

    if (data.reveal) {
        $("playerStatus").textContent = myTurn ? "JOUW BEURT • DISCUSS" : "DISCUSS";
    }
}

function renderMyHistory(items) {
    const wrap = $("myHistory");
    if (!wrap) return;

    wrap.innerHTML = "";
    if (items.length === 0) {
        wrap.innerHTML = `<div class="muted small">Nog geen antwoorden verstuurd.</div>`;
        return;
    }

    items.forEach(a => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
      <div class="muted small">${escapeHtml(a.cat || "")} • ${escapeHtml(a.power || "")}</div>
      <div><b>${escapeHtml(a.text)}</b></div>
      <div class="muted small">${escapeHtml(a.question || "")}</div>
    `;
        wrap.appendChild(div);
    });
}

// ---------- End Screens ----------
async function fetchAllAnswers(room) {
    const ansRef = collection(db, "rooms", room, "answers");
    const q = query(ansRef, orderBy("createdAt", "desc"), limit(200));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach(d => items.push({ id: d.id, ...d.data() }));
    return items;
}

function coinsSortedList(data) {
    const coins = data.coins || {};
    const rows = Object.entries(coins)
        .map(([pid, c]) => {
            const name = data.turnOrder?.find(p => p.playerId === pid)?.name
                || (pid === session.playerId ? session.name : pid.slice(0, 6));
            return { name, coins: Number(c) || 0 };
        })
        .sort((a, b) => b.coins - a.coins);
    return rows;
}

async function renderPresenterEnd(data) {
    const answers = await fetchAllAnswers(session.room);

    // Top 3 growth moments (latest high-quality heuristic: just take first 3 growth answers)
    const growth = answers.filter(a => a.cat === "growth");
    const top3 = growth.slice(0, 3);

    const topList = $("topGrowthList");
    if (topList) {
        topList.innerHTML = "";
        if (top3.length === 0) {
            topList.innerHTML = `<div class="muted small">Geen growth antwoorden gevonden.</div>`;
        } else {
            const medals = ["🥇", "🥈", "🥉"];
            top3.forEach((a, i) => {
                const div = document.createElement("div");
                div.className = "item";
                div.innerHTML = `
          <div class="muted small">${medals[i]} ${escapeHtml(a.playerName)} • ${escapeHtml(a.power || "")}</div>
          <div><b>${escapeHtml(a.text)}</b></div>
          <div class="muted small">${escapeHtml(a.question || "")}</div>
        `;
                topList.appendChild(div);
            });
        }
    }

    // Scoreboard
    const sb = $("scoreboard");
    if (sb) {
        sb.innerHTML = "";
        const rows = coinsSortedList(data);
        if (rows.length === 0) sb.innerHTML = `<div class="muted small">Geen coins data.</div>`;
        rows.forEach(r => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `<div><b>${escapeHtml(r.name)}</b></div><div class="muted small">💰 ${r.coins}</div>`;
            sb.appendChild(div);
        });
    }

    // Export text
    const lines = [];
    lines.push("SPRINT PARTY RETRO – EXPORT");
    lines.push("--------------------------------");
    lines.push(`Room: ${session.room}`);
    lines.push(`Datum: ${new Date().toLocaleString()}`);
    lines.push("");
    lines.push("TOP 3 GROWTH MOMENTS:");
    top3.forEach((a, i) => lines.push(`${i + 1}. ${a.playerName}: ${a.text}`));
    lines.push("");
    lines.push("SCOREBOARD (COINS):");
    coinsSortedList(data).forEach((r, i) => lines.push(`${i + 1}. ${r.name} — ${r.coins}`));
    lines.push("");
    lines.push("ALLE ANTWOORDEN:");
    answers.slice().reverse().forEach(a => {
        lines.push(`- [${a.cat}] ${a.playerName}: ${a.text}`);
    });

    const exportText = lines.join("\n");
    $("exportText") && ($("exportText").textContent = exportText);

    $("copyExportBtn") && ($("copyExportBtn").onclick = async () => {
        try {
            await navigator.clipboard.writeText(exportText);
            alert("Gekopieerd!");
        } catch {
            alert("Kopiëren lukt niet. Selecteer en kopieer handmatig.");
        }
    });

    $("downloadExportBtn") && ($("downloadExportBtn").onclick = () => {
        downloadText("sprint-party-retro-export.txt", exportText);
    });
}

async function renderPlayerEnd(data) {
    // my coins
    const myCoins = data.coins?.[session.playerId] ?? 0;
    $("myFinalCoins") && ($("myFinalCoins").textContent = String(myCoins));

    // my highlights = my latest answers
    const ansRef = collection(db, "rooms", session.room, "answers");
    const q = query(ansRef, where("playerId", "==", session.playerId), orderBy("createdAt", "desc"), limit(10));
    const snap = await getDocs(q);

    const wrap = $("myFinalHighlights");
    if (wrap) {
        wrap.innerHTML = "";
        const items = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() }));
        if (items.length === 0) {
            wrap.innerHTML = `<div class="muted small">Geen antwoorden gevonden.</div>`;
        } else {
            items.forEach(a => {
                const div = document.createElement("div");
                div.className = "item";
                div.innerHTML = `
          <div class="muted small">${escapeHtml(a.cat || "")} • ${escapeHtml(a.power || "")}</div>
          <div><b>${escapeHtml(a.text)}</b></div>
        `;
                wrap.appendChild(div);
            });
        }
    }
}

// ---------- Join UI ----------
$("joinBtn").onclick = async () => {
    const room = normalizeRoom($("roomCode").value);
    const name = $("name").value.trim();
    const role = $("role").value;
    const hostCode = $("hostCode") ? $("hostCode").value : "";

    if (!room) return alert("Vul een room code in.");
    if (!name) return alert("Vul je naam in.");

    await joinRoom({ room, role, name, hostCode });

    if (role === "presenter") {
        // add a start button if it isn't there yet
        setTimeout(() => {
            const container = $("presenterView")?.querySelector(".board");
            if (!container) return;

            if (!container.querySelector("#startGameBtn")) {
                const startBtn = document.createElement("button");
                startBtn.id = "startGameBtn";
                startBtn.className = "btn primary";
                startBtn.textContent = "▶ Start game (shuffle turns)";
                startBtn.onclick = presenterStart;
                container.prepend(startBtn);
            }
        }, 300);
    }
};

$("createRoomBtn").onclick = async () => {
    const room = normalizeRoom($("roomCode").value || "RETRO-5SPRINTS");
    $("roomCode").value = room;
    setRoleLinks();
    await createRoom(room);

    // show host code to user (presenter)
    const roomSnap = await getDoc(doc(db, "rooms", room));
    const code = roomSnap.data()?.hostCode;
    alert(`Room "${room}" is aangemaakt.\nHOST CODE: ${code}\n\nOpen Presenter en laat studenten joinen als Player.`);
};

// Auto-fill from URL (?room=...&role=...)
(function bootFromUrl() {
    const url = new URL(location.href);
    const room = url.searchParams.get("room");
    const role = url.searchParams.get("role");
    if (room) $("roomCode").value = normalizeRoom(room);
    if (role && (role === "presenter" || role === "player")) $("role").value = role;
    setRoleLinks();
})();
