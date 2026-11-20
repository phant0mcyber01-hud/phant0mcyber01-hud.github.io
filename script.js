/* =========================================================
   Phant0m — Portfolio logic
   Чтобы добавить проект: добавь объект в массив PROJECTS ниже.
   ========================================================= */

const GH = "https://github.com/phant0mcyber01-hud";

const PROJECTS = [
  {
    id: "urban",
    featured: true,
    category: ["backend"],
    kicker: "City OS · Digital Twin · Пилот: Фергана",
    title: "URBAN — операционная система умного города",
    short: "Светофоры, освещение и водоканал на одном защищённом ядре. Камеры считают метры очереди, а не людей — никаких лиц и номеров. Подписанные команды, автооткат при потере связи и 3D-двойник района.",
    metrics: [
      { v: "583", l: "теста проходят" },
      { v: "−12–17%", l: "пробок в симуляции" },
      { v: "3 мин", l: "до автоотката" }
    ],
    tags: ["Python 3.11", "FastAPI", "WebSockets", "Docker", "x86 / ARM64"],
    repo: `${GH}/URBAN-system_demo`,
    images: ["urban_1", "urban_2", "urban_3", "urban_4", "urban_5"],
    desc: "Платформа управления городской инфраструктурой: общее ядро (устройства и их ключи, подписанные команды со сроком действия, роли, журнал, обновления) и модули поверх него — светофоры и пробки, уличное освещение, водоканал (только чтение).",
    features: [
      "Privacy by design: камеры считают метры очереди, лица и номера никуда не уходят и не хранятся",
      "Подписанные команды с TTL — истёк срок или пропала связь, контроллер сам возвращается к расписанию",
      "Блокировка перекрёстка при вскрытии шкафа и контроль перегрева edge-устройств",
      "Secure Boot и A/B-обновления для x86 и ARM64 с автоматическим откатом"
    ],
    code: `# Путь команды: оператор -> перекрёсток
[Operator] -> RBAC + audit log
     |
[Sign command + expiry]
     |
[District server] <- WireGuard tunnel
     |
[Edge controller] verify(sig, ttl)
     |-- ok      -> apply plan
     '-- expired -> rollback to schedule`
  },
  {
    id: "medcourse",
    category: ["backend", "telegram"],
    kicker: "E-Health · Telegram",
    title: "MedCourse",
    short: "Telegram-платформа контроля курсов лечения. Шифрование персональных данных AES-256, гарантированная доставка напоминаний через Outbox.",
    tags: ["FastAPI", "AES-256", "Outbox", "2000+ тестов"],
    repo: `${GH}/Med_Course`,
    images: ["medcourse_1", "medcourse_2"],
    desc: "Медицинская Telegram-платформа для контроля приёма препаратов, взаимодействия пациентов с клиниками и безопасного хранения истории.",
    features: [
      "Field-level шифрование медицинских данных алгоритмом AES-256",
      "Outbox Pattern: напоминание не потеряется даже при падении сервиса",
      "Более 2000 модульных и интеграционных тестов",
      "Очереди ретраев — устойчивость к сбоям шлюзов Telegram"
    ],
    code: `# Outbox: событие и уведомление — в одной транзакции
async with db.transaction():
    await record_event(patient_id, encrypted_payload)
    await outbox.enqueue(Notification(type="PILL_REMINDER"))
# ACID: либо оба, либо ничего`
  },
  {
    id: "wallet",
    category: ["telegram", "backend"],
    kicker: "FinTech · Mini App",
    title: "PHANTOM WALLET",
    short: "Финтех Mini App с AI-питомцем. Защита от двойного списания, SQLite в режиме WAL и криптопроверка initData.",
    tags: ["Telegram WebApp", "SQLite WAL", "HMAC", "1180 тестов"],
    repo: GH,
    images: ["wallet_1", "wallet_2", "wallet_3", "wallet_4", "wallet_5", "wallet_6"],
    desc: "Финтех Telegram Mini App с AI-питомцем и геймификацией сбережений. Фокус — мгновенный отклик и абсолютная финансовая целостность.",
    features: [
      "Double-spending protection через строгие блокировки строк баланса",
      "SQLite WAL: сотни параллельных чтений без блокировки записи",
      "Проверка подлинности Telegram initData (HMAC-SHA256)",
      "1 180 тестов финансовой логики и стрессовых сценариев"
    ],
    code: `# Валидация подписи Telegram initData
secret = hmac.new(b"WebAppData", bot_token.encode(), sha256).digest()
calc = hmac.new(secret, data_check_string.encode(), sha256).hexdigest()
assert hmac.compare_digest(calc, received_hash)  # zero spoofing`
  },
  {
    id: "cinema",
    category: ["telegram", "fullstack"],
    kicker: "Booking · Mini App",
    title: "Nova Cinema",
    short: "Бронирование билетов прямо в Telegram: интерактивная схема зала и блокировка мест без двойных продаж.",
    tags: ["Mini App", "FastAPI", "AsyncIO", "Seat Locks"],
    repo: `${GH}/Nova-cinema_v2`,
    images: ["cinema_1", "cinema_2", "cinema_3"],
    desc: "Сервис бронирования билетов в кинотеатр в интерфейсе Telegram: карта зала, мгновенное оформление и оплата.",
    features: [
      "Anti-double-booking: временная блокировка кресла (TTL) с автоосвобождением",
      "Нативный вход через Telegram — без логинов и паролей",
      "Асинхронный движок FastAPI с минимальным потреблением памяти",
      "Вебхуки подтверждения платежей"
    ],
    code: `# Атомарная блокировка кресла
async def lock_seat(hall, seat, user, ttl=600):
    ok = await cache.set(f"seat:{hall}:{seat}", user, ex=ttl, nx=True)
    if not ok:
        raise SeatAlreadyTaken()`
  },
  {
    id: "metta",
    category: ["fullstack", "backend"],
    kicker: "E-Commerce · Monorepo",
    title: "METTA_V2",
    short: "Монорепозиторий магазина электроники: витрина и админка, Prisma, Server Actions и строгий RBAC.",
    tags: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL"],
    repo: GH,
    images: ["metta_1", "metta_2", "metta_3", "metta_4", "metta_5"],
    desc: "Масштабируемый интернет-магазин электроники, организованный как модульный монорепозиторий: клиентская витрина + защищённая админ-панель.",
    features: [
      "RBAC: гранулярные роли администраторов, менеджеров и клиентов",
      "Next.js App Router и Server Actions — быстрый каталог и SEO",
      "Типобезопасные запросы через Prisma с миграциями",
      "Корзина, фильтры по характеристикам и складские остатки"
    ],
    code: `// Покупка без овербукинга склада
export async function purchase(itemId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.item.update({
      where: { id: itemId, stock: { gt: 0 } },
      data: { stock: { decrement: 1 } },
    });
    return tx.order.create({ data: { userId, itemId: item.id } });
  });
}`
  }
];

const img = (name) => `assets/projects/${name}.jpg`;
const plural = (n) => (n % 10 === 1 && n % 100 !== 11 ? "скриншот" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "скриншота" : "скриншотов");

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ghIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`;

/* ---------- Render project cards ---------- */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map((p) => {
    const metrics = p.metrics
      ? `<div class="metrics">${p.metrics.map((m) => `<div class="metric"><b>${m.v}</b><small>${m.l}</small></div>`).join("")}</div>`
      : "";
    return `
      <article class="card spot reveal ${p.featured ? "featured" : ""}" data-id="${p.id}" data-category="${p.category.join(" ")}" tabindex="0" role="button" aria-label="Открыть проект ${escapeHtml(p.title)}">
        <div class="card-media">
          <img src="${img(p.images[0])}" alt="${escapeHtml(p.title)}" loading="lazy">
          <span class="media-badge">◧ ${p.images.length} ${plural(p.images.length)}</span>
        </div>
        <div class="card-body">
          <span class="card-kicker">${p.kicker}</span>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.short}</p>
          ${metrics}
          <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <div class="card-foot">
            <span class="card-open">Галерея и архитектура <span class="arr">→</span></span>
            <a href="${p.repo}" target="_blank" rel="noopener" class="icon-btn" title="Код на GitHub" data-stop>${ghIcon}</a>
          </div>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-stop]")) return;
      openModal(card.dataset.id);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card.dataset.id); }
    });
  });
}

/* ---------- Tabs / filter ---------- */
function initTabs() {
  const tabs = document.getElementById("filterTabs");
  const indicator = tabs.querySelector(".tab-indicator");
  const buttons = [...tabs.querySelectorAll(".tab")];

  const move = (btn) => {
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      move(btn);
      const f = btn.dataset.filter;
      document.querySelectorAll("#projectsGrid .card").forEach((card) => {
        const show = f === "all" || card.dataset.category.split(" ").includes(f);
        card.classList.toggle("is-hidden", !show);
        if (show) {
          card.animate(
            [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }],
            { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        }
      });
    });
  });

  const sync = () => move(tabs.querySelector(".tab.active"));
  requestAnimationFrame(sync);
  window.addEventListener("resize", sync);
  document.fonts && document.fonts.ready.then(sync);
}

/* ---------- Modal + gallery ---------- */
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
let gallery = { list: [], i: 0 };
let lastFocus = null;

function openModal(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  gallery = { list: p.images.map(img), i: 0 };

  const commented = escapeHtml(p.code)
    .split("\n")
    .map((line) => (/^\s*(#|\/\/)/.test(line) ? `<span class="tok-c">${line}</span>` : line))
    .join("\n");

  modalContent.innerHTML = `
    <span class="m-kicker">${p.kicker}</span>
    <h2 class="m-title">${p.title}</h2>
    <p class="m-desc">${p.desc}</p>

    <div class="gallery">
      <div class="g-stage" id="gStage">
        <img id="gImg" src="${gallery.list[0]}" alt="${escapeHtml(p.title)} — скриншот 1">
        ${gallery.list.length > 1 ? `
          <button class="g-nav g-prev" data-g="-1" aria-label="Предыдущий скриншот">‹</button>
          <button class="g-nav g-next" data-g="1" aria-label="Следующий скриншот">›</button>` : ""}
        <span class="g-count" id="gCount">1 / ${gallery.list.length}</span>
      </div>
      ${gallery.list.length > 1 ? `
      <div class="g-thumbs">
        ${gallery.list.map((src, i) => `<button class="g-thumb ${i === 0 ? "active" : ""}" data-gi="${i}" aria-label="Скриншот ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}
      </div>` : ""}
    </div>

    <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>

    <div class="m-grid">
      <div class="m-block">
        <h4>Ключевые инженерные решения</h4>
        <ul class="m-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div class="m-block">
        <h4>Фрагмент архитектуры</h4>
        <div class="code">
          <div class="code-bar"><span>${p.id}.snippet</span><button class="copy-btn" id="copyBtn">copy</button></div>
          <pre><code>${commented}</code></pre>
        </div>
      </div>
    </div>

    <div class="m-actions">
      <a href="${p.repo}" target="_blank" rel="noopener" class="btn btn-light">${ghIcon} Код на GitHub</a>
      <a href="https://t.me/whoami_user01" target="_blank" rel="noopener" class="btn btn-ghost">Обсудить проект</a>
    </div>
  `;

  modalContent.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => step(+b.dataset.g)));
  modalContent.querySelectorAll("[data-gi]").forEach((b) => b.addEventListener("click", () => show(+b.dataset.gi)));
  document.getElementById("copyBtn").addEventListener("click", (e) => {
    navigator.clipboard && navigator.clipboard.writeText(p.code).then(() => {
      e.target.textContent = "copied ✓";
      setTimeout(() => (e.target.textContent = "copy"), 1500);
    });
  });
  initSwipe(document.getElementById("gStage"));

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-panel").scrollTop = 0;
  setTimeout(() => modal.querySelector(".modal-close").focus({ preventScroll: true }), 50);
}

function show(i) {
  const n = gallery.list.length;
  gallery.i = (i + n) % n;
  const el = document.getElementById("gImg");
  el.classList.add("fade");
  setTimeout(() => {
    el.src = gallery.list[gallery.i];
    el.onload = () => el.classList.remove("fade");
    if (el.complete) el.classList.remove("fade");
  }, 150);
  document.getElementById("gCount").textContent = `${gallery.i + 1} / ${n}`;
  modalContent.querySelectorAll(".g-thumb").forEach((t, k) => {
    t.classList.toggle("active", k === gallery.i);
    if (k === gallery.i) t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  });
}
const step = (d) => show(gallery.i + d);

function initSwipe(el) {
  if (!el) return;
  let x0 = null;
  el.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  el.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}

modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal, .showcase");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
  els.forEach((el, i) => {
    if (el.closest(".hero-inner")) el.style.transitionDelay = `${i * 80}ms`;
    io.observe(el);
  });
}

/* ---------- Spotlight follow ---------- */
function initSpotlight() {
  if (window.matchMedia("(hover: none)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest(".spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* ---------- Animated counters ---------- */
function initCounters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const nums = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased).toLocaleString("ru-RU") + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initTabs();
  initNav();
  initReveal();
  initSpotlight();
  initCounters();
});

window.openModal = openModal;
window.closeModal = closeModal;
