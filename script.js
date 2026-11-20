// Project Detailed Data for Modal Lightbox
const projectsData = {
  urban: {
    title: "🚦 URBAN — City OS & Digital Twin",
    badge: "Highload Backend / CyberSec / Telemetry",
    tags: ["FastAPI", "WebSockets", "Docker", "Auto-Rollback", "PostgreSQL"],
    desc: "Платформа умного города для мониторинга критической инфраструктуры в реальном времени. Включает 3D-цифровой двойник объектов, распределённый сбор данных с тысяч датчиков и контур отказоустойчивости.",
    features: [
      "Строгая изоляция сетевых контуров безопасности (Zero Trust сегментация сенсоров)",
      "Механизм автооткатов (Auto-Rollbacks) при обнаружении аномалий в телеметрии",
      "Сверхнизкая задержка передачи событий по WebSockets (p99 < 3ms)",
      "Резервирование узлов и устойчивость к сбоям внешних провайдеров связи"
    ],
    codeSnippet: `// Схема контура безопасности URBAN
[Edge Sensors] -> mTLS -> [Ingest Gateway] -> Queue (Zero-Drop)
                              |
                     [Anomaly Detection]
                              |
               [Auto-Rollback Trigger < 50ms]`
  },
  medcourse: {
    title: "💊 MedCourse — Telegram Platform",
    badge: "E-Health / End-to-End Encryption / FinOps",
    tags: ["Telegram Bot API", "FastAPI", "AES-256", "Outbox Pattern", "2000+ Tests"],
    desc: "Медицинская Telegram-платформа для контроля курсов приёма препаратов, взаимодействия пациентов с клиниками и безопасного хранения истории болезни.",
    features: [
      "Field-Level шифрование персональных и медицинских данных алгоритмом AES-256",
      "Outbox Pattern в БД: 100% гарантия доставки системных уведомлений и напоминаний",
      "Более 2000 модульных и интеграционных тестов с покрытием граничных сценариев",
      "Полная независимость от падений сетевых шлюзов Telegram благодаря очередям ретраев"
    ],
    codeSnippet: `// Outbox Pattern Transaction
async with db.transaction():
    await record_medical_event(patient_id, event_data_encrypted)
    await outbox_repo.enqueue(NotificationTask(type="PILL_REMINDER"))
// Гарантия ACID: уведомление не потеряется даже при краше сервиса`
  },
  wallet: {
    title: "👻 PHANTOM WALLET — FinTech Mini App",
    badge: "Telegram Mini App / High Concurrency / Anti-Race",
    tags: ["Telegram WebApp", "FastAPI", "SQLite WAL", "Pydantic v2", "1180 Tests"],
    desc: "Финтех Telegram Mini App с интегрированным AI-питомцем и геймификацией сбережений. Разработан с фокусом на моментальный отклик и абсолютную финансовую целостность.",
    features: [
      "Защита от race conditions (Double Spending Protection) через строгие блокировки строк баланса",
      "SQLite в режиме Write-Ahead Logging (WAL): сотни параллельных чтений без блокировки пишущего потока",
      "Криптографическая проверка подлинности Telegram WebApp initData (HMAC-SHA256)",
      "1,180 автоматических тестов, проверяющих финансовую логику и стрессовые сценарии списаний"
    ],
    codeSnippet: `// Валидация подписи Telegram initData
secret_key = hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()
data_check = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
assert hmac.compare_digest(data_check, received_hash)  # Zero spoofing`
  },
  cinema: {
    title: "🎬 Nova Cinema — Seat Reservation Engine",
    badge: "Telegram Mini App / Real-time Concurrency",
    tags: ["Telegram Mini App", "FastAPI", "Real-Time Locks", "AsyncIO", "SQLite"],
    desc: "Сервис бронирования билетов в кинотеатры прямо в интерфейсе Telegram. Интерактивная карта зрительного зала и моментальное оформление заказов.",
    features: [
      "Anti-Double-Booking механизм: временная блокировка выбранных кресел (Seat Lock TTL) с автоосвобождением",
      "Бесшовный UX в Telegram WebApp: нативное открытие без необходимости авторизации по логину/паролю",
      "Асинхронный движок на FastAPI с минимальным потреблением оперативной памяти",
      "Интеграция платёжного шлюза с вебхуками подтверждения транзакций"
    ],
    codeSnippet: `// Механизм блокировки кресел
async def lock_seat(hall_id, seat_id, user_id, ttl_seconds=600):
    locked = await cache.set(f"seat:{hall_id}:{seat_id}", user_id, ex=ttl_seconds, nx=True)
    if not locked:
        raise SeatAlreadyTakenException()`
  },
  metta: {
    title: "🛍 METTA_V2 — E-Commerce Monorepo",
    badge: "Fullstack Architecture / Next.js / Prisma",
    tags: ["Next.js 14 App Router", "TypeScript", "Prisma ORM", "PostgreSQL", "RBAC"],
    desc: "Современный масштабируемый интернет-магазин электроники, организованный по принципу чистого модульного монорепозитория (клиентская витрина + защищённая админка).",
    features: [
      "Строгое разделение прав доступа (RBAC): гранулярные роли администраторов, менеджеров и клиентов",
      "Next.js Server Actions и App Router для мгновенной отрисовки каталога и SEO",
      "Типобезопасные запросы к БД через Prisma ORM с автомиграциями",
      "Интеграция корзины, фильтрации характеристик и системы складского остатка"
    ],
    codeSnippet: `// Модульный Bounded Context каталога и остатков
export async function purchaseItem(itemId: string, userId: string) {
  return await prisma.$transaction(async (tx) => {
    const item = await tx.item.update({
      where: { id: itemId, stock: { gt: 0 } },
      data: { stock: { decrement: 1 } }
    });
    return await tx.order.create({ data: { userId, itemId: item.id } });
  });
}`
  }
};

// Filter Projects
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach(card => {
        if (filter === "all") {
          card.style.display = "flex";
        } else {
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filter)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});

// Modal Logic
function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");

  const tagsHtml = data.tags.map(t => `<span class="tag" style="font-size: 0.8rem; padding: 4px 10px;">${t}</span>`).join(" ");
  const featuresHtml = data.features.map(f => `<li style="margin-bottom: 8px; color: #c9d1d9;">${f}</li>`).join("");

  modalContent.innerHTML = `
    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 8px;">
      ${data.badge}
    </div>
    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">${data.title}</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
      ${tagsHtml}
    </div>
    <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px;">
      ${data.desc}
    </p>
    <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
      Ключевые инженерные решения:
    </h4>
    <ul style="padding-left: 20px; margin-bottom: 24px;">
      ${featuresHtml}
    </ul>
    <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
      Архитектурный фрагмент:
    </h4>
    <pre style="background: #090c10; border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #00f0ff; margin-bottom: 28px;"><code>${escapeHtml(data.codeSnippet)}</code></pre>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <a href="https://github.com/phant0mcyber01-hud" target="_blank" class="btn btn-primary">
        Смотреть на GitHub →
      </a>
      <a href="https://t.me/whoami_user01" target="_blank" class="btn btn-outline">
        Обсудить архитектуру проекта
      </a>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("open");
  document.body.style.overflow = "auto";
}

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function escapeHtml(string) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, s => entityMap[s]);
}
