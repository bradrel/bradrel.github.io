/* F3 Workout Randomizer
 * Generates a randomized F3-style bootcamp workout: Disclaimer, Warm-o-rama,
 * Mosey, The Thang, Mary, and Circle of Trust.
 * Pure vanilla JS, no dependencies, works fully client-side on GitHub Pages.
 */

(() => {
  "use strict";

  // ---------------------------------------------------------------------
  // Exercise database
  // tag values: upper, lower, full, cardio, core
  // ---------------------------------------------------------------------

  const WARMUPS = [
    { name: "Side Straddle Hop (SSH)", reps: "x20 IC" },
    { name: "Windmill", reps: "x15 IC" },
    { name: "Sun Gods", reps: "x15 IC forward, x15 IC reverse" },
    { name: "Tempo Merkins", reps: "x10 IC" },
    { name: "Michael Phelps", reps: "x15 IC" },
    { name: "Cotton Pickers", reps: "x15 IC" },
    { name: "Seal Claps", reps: "x20 IC" },
    { name: "Tap Downs", reps: "x15 IC" },
    { name: "Arm Circles", reps: "x15 IC forward, x15 IC back" },
    { name: "Willie Mays Hayes", reps: "x10 OYO" },
    { name: "High Knees", reps: "x20 IC" },
    { name: "Little Baby Arm Circles", reps: "x15 IC each direction" },
  ];

  const MOSEY_LINES = [
    "Mosey to the far end of the parking lot and back.",
    "Mosey a lap around the block.",
    "Mosey to the nearest hill and back.",
    "Mosey to the flag pole and circle back.",
    "Mosey two laps around the AO.",
    "Mosey to the far light pole, bear crawl back.",
    "Mosey to the curb, high-knees back.",
    "Mosey out and back, karaoke the return trip.",
  ];

  const THANG = [
    { name: "Merkins", reps: "x15", tag: "upper" },
    { name: "Diamond Merkins", reps: "x12", tag: "upper" },
    { name: "Hand Release Merkins", reps: "x12", tag: "upper" },
    { name: "Carolina Dry Docks", reps: "x10", tag: "upper" },
    { name: "Squats", reps: "x20", tag: "lower" },
    { name: "Low Slow Squats", reps: "x15", tag: "lower" },
    { name: "Lunges", reps: "x10 each leg", tag: "lower" },
    { name: "Bulgarian Split Squat", reps: "x10 each leg", tag: "lower" },
    { name: "Squat Thrusts", reps: "x12", tag: "full" },
    { name: "Burpees", reps: "x10", tag: "cardio" },
    { name: "Mountain Climbers", reps: "x20 IC", tag: "cardio" },
    { name: "Monkey Humpers", reps: "x15 IC", tag: "cardio" },
    { name: "Plank Jacks", reps: "x15", tag: "core" },
    { name: "Imperial Walkers", reps: "x15 IC", tag: "lower" },
    { name: "Smurf Jacks", reps: "x15 IC", tag: "full" },
    { name: "Bear Crawl", reps: "x20 yards", tag: "full" },
    { name: "Crab Cake", reps: "x15", tag: "full" },
    { name: "Peoplemakers", reps: "x10", tag: "full" },
    { name: "Curb Box Cutters", reps: "x15", tag: "core" },
    { name: "Freddie Mercury", reps: "x20 IC", tag: "core" },
    { name: "Coupon Swings", reps: "x15", tag: "full", coupon: true },
    { name: "Coupon Curls", reps: "x15", tag: "upper", coupon: true },
    { name: "Overhead Coupon Press", reps: "x15", tag: "upper", coupon: true },
    { name: "Coupon Squat Press", reps: "x12", tag: "lower", coupon: true },
    { name: "Coupon Rows", reps: "x15", tag: "upper", coupon: true },
  ];

  const MARY = [
    { name: "LBCs (Little Baby Crunches)", reps: "x20 IC" },
    { name: "American Hammers", reps: "x20 IC" },
    { name: "Freddie Mercury", reps: "x20 IC" },
    { name: "Flutter Kicks", reps: "x20 IC" },
    { name: "Plank", reps: "x30 seconds" },
    { name: "Dying Cockroach", reps: "x15" },
    { name: "Peter Parker", reps: "x15 IC" },
    { name: "Box Cutters", reps: "x15 IC" },
    { name: "WWII Sit-ups", reps: "x15 IC" },
    { name: "J-Lo's", reps: "x20 IC" },
    { name: "Gas Pumpers", reps: "x20 IC" },
    { name: "Rosalita", reps: "x25 IC (count down from 25)" },
    { name: "Hello Dollys", reps: "x15 IC" },
    { name: "Freddie Prinze", reps: "x15 IC" },
  ];

  const NAME_ADJ = [
    "Iron",
    "Merciless",
    "Furious",
    "Relentless",
    "Savage",
    "Grinding",
    "Molten",
    "Ruthless",
    "Silent",
    "Rusty",
    "Wicked",
    "Feral",
    "Stubborn",
    "Sideways",
  ];
  const NAME_NOUN = [
    "Buzzard",
    "Anvil",
    "Coyote",
    "Gauntlet",
    "Sledgehammer",
    "Copperhead",
    "Grinder",
    "Crucible",
    "Warthog",
    "Boneyard",
    "Tomahawk",
    "Pitchfork",
    "Cinderblock",
    "Switchback",
  ];

  const DISCLAIMER =
    "As many of you know, this work out is 100% free of charge and no one HAS to do it. There is always a risk of injury when exercising, if that happens, seek help from a healthcare professional. If you have a medical condition, we ask that you consult a physician before viewing or attempting this workout. You agree to hold the writer of this workout harmless from liability. If you don't like the workout, complain to nobody, because nobody made you do it. This workout is a way for men to gather and grow in fitness, fellowship, and faith.";

  const COT_LINES = [
    "Name-a-rama, count-o-rama, announcements, prayer requests. Take it out.",
    "Bring it in for CoT. Names, count, announcements, Naked Man Moleskin, prayer requests.",
    "Circle of Trust: count off, announcements, and a moment for prayer requests.",
  ];

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pick(arr, n) {
    if (n >= arr.length) return shuffle(arr);
    return shuffle(arr).slice(0, n);
  }

  function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickNoImmediateRepeat(pool, count) {
    // Sample `count` items allowing repeats across rounds but never picking
    // the exact same array twice in a row when the pool is small.
    const out = [];
    let remaining = shuffle(pool);
    for (let i = 0; i < count; i++) {
      if (remaining.length === 0) remaining = shuffle(pool);
      out.push(remaining.pop());
    }
    return out;
  }

  function filterByFocus(list, focus) {
    if (focus === "full") return list;
    if (focus === "upper")
      return list.filter((e) => ["upper", "full", "core"].includes(e.tag));
    if (focus === "lower")
      return list.filter((e) => ["lower", "full", "cardio"].includes(e.tag));
    if (focus === "cardio")
      return list.filter((e) => ["cardio", "full", "lower"].includes(e.tag));
    if (focus === "core")
      return list.filter((e) => ["core", "full", "upper"].includes(e.tag));
    return list;
  }

  function generateName() {
    return `The ${pickOne(NAME_ADJ)} ${pickOne(NAME_NOUN)}`;
  }

  // ---------------------------------------------------------------------
  // Workout generation
  // ---------------------------------------------------------------------

  function buildPlan(duration) {
    // returns { warmupCount, rounds, perRound, maryCount }
    switch (duration) {
      case "30":
        return { warmupCount: 3, rounds: 2, perRound: 4, maryCount: 3 };
      case "45":
        return { warmupCount: 4, rounds: 3, perRound: 4, maryCount: 4 };
      case "60":
        return { warmupCount: 5, rounds: 4, perRound: 4, maryCount: 5 };
      default:
        return { warmupCount: 4, rounds: 3, perRound: 4, maryCount: 4 };
    }
  }

  function generateWorkout(settings) {
    const { duration, focus, coupons, mosey } = settings;
    const plan = buildPlan(duration);

    let thangPool = filterByFocus(THANG, focus);
    if (!coupons) thangPool = thangPool.filter((e) => !e.coupon);
    if (thangPool.length < 4) thangPool = THANG.filter((e) => coupons || !e.coupon);

    const maryPool = filterByFocus(MARY, focus === "core" ? "full" : focus);

    const warmups = pick(WARMUPS, plan.warmupCount);
    const rounds = [];
    for (let r = 0; r < plan.rounds; r++) {
      rounds.push(pickNoImmediateRepeat(thangPool, plan.perRound));
    }
    const mary = pick(maryPool.length >= plan.maryCount ? maryPool : MARY, plan.maryCount);
    const moseyLine = mosey ? pickOne(MOSEY_LINES) : null;
    const cot = pickOne(COT_LINES);

    return {
      name: generateName(),
      duration,
      focus,
      coupons,
      warmups,
      moseyLine,
      rounds,
      mary,
      cot,
      generatedAt: new Date(),
    };
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  const FOCUS_LABELS = {
    full: "Full Body",
    upper: "Upper Body",
    lower: "Lower Body",
    cardio: "Cardio Blast",
    core: "Core Crusher",
  };

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderExerciseList(items) {
    const ul = el("ul", "exlist");
    items.forEach((it) => {
      const li = el(
        "li",
        null,
        `<b>${it.name}</b> <span class="reps">${it.reps}</span>`
      );
      ul.appendChild(li);
    });
    return ul;
  }

  function renderWorkout(workout, aoName, qName) {
    const output = document.getElementById("workout-output");
    output.innerHTML = "";
    output.classList.remove("empty");

    const head = el("div", "wo-header");
    const nameEl = el("div", "wo-name", workout.name);
    const meta = el(
      "div",
      "wo-meta",
      `${workout.duration} min &middot; ${FOCUS_LABELS[workout.focus]}${
        aoName ? ` &middot; AO: ${escapeHtml(aoName)}` : ""
      }${qName ? ` &middot; Q: ${escapeHtml(qName)}` : ""}<br>${workout.generatedAt.toLocaleDateString(
        undefined,
        { year: "numeric", month: "long", day: "numeric" }
      )}`
    );
    head.appendChild(nameEl);
    head.appendChild(meta);
    output.appendChild(head);

    // Disclaimer
    const disc = el("div", "section");
    disc.appendChild(el("h3", null, "Disclaimer"));
    disc.appendChild(el("p", "cot-line", DISCLAIMER));
    output.appendChild(disc);

    // Warm-o-rama
    const warm = el("div", "section");
    warm.appendChild(el("h3", null, "Warm-o-rama"));
    warm.appendChild(renderExerciseList(workout.warmups));
    output.appendChild(warm);

    // Mosey
    if (workout.moseyLine) {
      const mosey = el("div", "section");
      mosey.appendChild(el("h3", null, "Mosey"));
      mosey.appendChild(el("p", "mosey-line", workout.moseyLine));
      output.appendChild(mosey);
    }

    // The Thang
    const thang = el("div", "section");
    thang.appendChild(el("h3", null, "The Thang"));
    workout.rounds.forEach((round, idx) => {
      thang.appendChild(el("p", "round-label", `Round ${idx + 1}`));
      thang.appendChild(renderExerciseList(round));
    });
    output.appendChild(thang);

    // Mary
    const mary = el("div", "section");
    mary.appendChild(el("h3", null, "Mary"));
    mary.appendChild(renderExerciseList(workout.mary));
    output.appendChild(mary);

    // COT
    const cot = el("div", "section");
    cot.appendChild(el("h3", null, "Circle of Trust"));
    cot.appendChild(el("p", "cot-line", workout.cot));
    output.appendChild(cot);
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------------------------------------------------------------------
  // Text export (for copy / share)
  // ---------------------------------------------------------------------

  function workoutToText(workout, aoName, qName) {
    const lines = [];
    lines.push(workout.name.toUpperCase());
    const metaBits = [
      `${workout.duration} min`,
      FOCUS_LABELS[workout.focus],
    ];
    if (aoName) metaBits.push(`AO: ${aoName}`);
    if (qName) metaBits.push(`Q: ${qName}`);
    lines.push(metaBits.join(" | "));
    lines.push(
      workout.generatedAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    lines.push("");
    lines.push("DISCLAIMER");
    lines.push(DISCLAIMER);
    lines.push("");
    lines.push("WARM-O-RAMA");
    workout.warmups.forEach((w) => lines.push(`- ${w.name} ${w.reps}`));
    lines.push("");
    if (workout.moseyLine) {
      lines.push("MOSEY");
      lines.push(workout.moseyLine);
      lines.push("");
    }
    lines.push("THE THANG");
    workout.rounds.forEach((round, idx) => {
      lines.push(`Round ${idx + 1}:`);
      round.forEach((e) => lines.push(`- ${e.name} ${e.reps}`));
    });
    lines.push("");
    lines.push("MARY");
    workout.mary.forEach((m) => lines.push(`- ${m.name} ${m.reps}`));
    lines.push("");
    lines.push("CIRCLE OF TRUST");
    lines.push(workout.cot);
    return lines.join("\n");
  }

  // ---------------------------------------------------------------------
  // Toast
  // ---------------------------------------------------------------------

  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // ---------------------------------------------------------------------
  // URL sharing (encode settings as query params)
  // ---------------------------------------------------------------------

  function settingsFromURL() {
    const p = new URLSearchParams(window.location.search);
    if (!p.has("d")) return null;
    return {
      duration: p.get("d") || "45",
      focus: p.get("f") || "full",
      coupons: p.get("c") === "1",
      mosey: p.get("m") !== "0",
      ao: p.get("ao") || "",
      q: p.get("q") || "",
      seed: p.get("s") || null,
    };
  }

  function buildShareURL(settings) {
    const p = new URLSearchParams();
    p.set("d", settings.duration);
    p.set("f", settings.focus);
    p.set("c", settings.coupons ? "1" : "0");
    p.set("m", settings.mosey ? "1" : "0");
    if (settings.ao) p.set("ao", settings.ao);
    if (settings.q) p.set("q", settings.q);
    const url = new URL(window.location.href);
    url.search = p.toString();
    return url.toString();
  }

  // ---------------------------------------------------------------------
  // Wire up
  // ---------------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", () => {
    const durationSel = document.getElementById("duration");
    const focusSel = document.getElementById("focus");
    const couponsChk = document.getElementById("coupons");
    const moseyChk = document.getElementById("mosey");
    const aoInput = document.getElementById("ao-name");
    const qInput = document.getElementById("q-name");
    const generateBtn = document.getElementById("generate-btn");
    const copyBtn = document.getElementById("copy-btn");
    const shareBtn = document.getElementById("share-btn");
    const printBtn = document.getElementById("print-btn");

    let currentWorkout = null;

    // restore saved names
    try {
      aoInput.value = localStorage.getItem("f3-ao-name") || "";
      qInput.value = localStorage.getItem("f3-q-name") || "";
    } catch (e) {
      /* localStorage unavailable, ignore */
    }

    function readSettings() {
      return {
        duration: durationSel.value,
        focus: focusSel.value,
        coupons: couponsChk.checked,
        mosey: moseyChk.checked,
      };
    }

    function persistNames() {
      try {
        localStorage.setItem("f3-ao-name", aoInput.value.trim());
        localStorage.setItem("f3-q-name", qInput.value.trim());
      } catch (e) {
        /* ignore */
      }
    }

    function doGenerate() {
      const settings = readSettings();
      currentWorkout = generateWorkout(settings);
      renderWorkout(currentWorkout, aoInput.value.trim(), qInput.value.trim());
      persistNames();
      copyBtn.disabled = false;
      shareBtn.disabled = false;
      printBtn.disabled = false;

      const url = new URL(window.location.href);
      url.search = buildShareURL({ ...settings, ao: aoInput.value.trim(), q: qInput.value.trim() }).split("?")[1];
      window.history.replaceState({}, "", url);
    }

    generateBtn.addEventListener("click", doGenerate);

    copyBtn.addEventListener("click", async () => {
      if (!currentWorkout) return;
      const text = workoutToText(
        currentWorkout,
        aoInput.value.trim(),
        qInput.value.trim()
      );
      try {
        await navigator.clipboard.writeText(text);
        showToast("Workout copied to clipboard");
      } catch (e) {
        showToast("Could not copy — select and copy manually");
      }
    });

    shareBtn.addEventListener("click", async () => {
      const settings = readSettings();
      const url = buildShareURL({
        ...settings,
        ao: aoInput.value.trim(),
        q: qInput.value.trim(),
      });
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied — reopening it regenerates these settings");
      } catch (e) {
        showToast(url);
      }
    });

    printBtn.addEventListener("click", () => {
      window.print();
    });

    [durationSel, focusSel, couponsChk, moseyChk].forEach((elm) =>
      elm.addEventListener("change", () => {
        /* settings change alone doesn't regenerate; user clicks Generate */
      })
    );

    // Apply settings from URL (share link) and auto-generate
    const fromURL = settingsFromURL();
    if (fromURL) {
      durationSel.value = fromURL.duration;
      focusSel.value = fromURL.focus;
      couponsChk.checked = fromURL.coupons;
      moseyChk.checked = fromURL.mosey;
      if (fromURL.ao) aoInput.value = fromURL.ao;
      if (fromURL.q) qInput.value = fromURL.q;
    }
    doGenerate();
  });
})();
