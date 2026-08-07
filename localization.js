(() => {
  const supportedLocales = ["en", "sk", "uk"];
  const queryLocale = new URLSearchParams(window.location.search).get("lang");
  const pathLocale = window.location.pathname.split("/").filter(Boolean)[0];
  const locale = supportedLocales.includes(queryLocale)
    ? queryLocale
    : (supportedLocales.includes(pathLocale) ? pathLocale : "en");

  const runtime = {
    en: {
      categories: {
        language: "language",
        workflow: "workflow",
        framework: "framework",
        database: "database",
        architecture: "architecture",
        infrastructure: "infrastructure",
        testing: "testing"
      },
      themeTarget: target => `Switch to ${target} theme`,
      projectNoun: count => count === 1 ? "project" : "projects",
      usedIn: count => `Used in ${count} featured ${count === 1 ? "project" : "projects"}`
    },
    sk: {
      categories: {
        language: "jazyk",
        workflow: "pracovný postup",
        framework: "framework",
        database: "databáza",
        architecture: "architektúra",
        infrastructure: "infraštruktúra",
        testing: "testovanie"
      },
      themeTarget: target => `Prepnúť na ${target === "dark" ? "tmavý" : "svetlý"} režim`,
      projectNoun: count => count === 1 ? "projekt" : (count >= 2 && count <= 4 ? "projekty" : "projektov"),
      usedIn: count => `Použité v ${count} ${count === 1 ? "projekte" : (count >= 2 && count <= 4 ? "projektoch" : "projektoch")}`
    },
    uk: {
      categories: {
        language: "мова",
        workflow: "робочий процес",
        framework: "фреймворк",
        database: "база даних",
        architecture: "архітектура",
        infrastructure: "інфраструктура",
        testing: "тестування"
      },
      themeTarget: target => `Перемкнути на ${target === "dark" ? "темну" : "світлу"} тему`,
      projectNoun: count => count === 1 ? "проєкт" : (count >= 2 && count <= 4 ? "проєкти" : "проєктів"),
      usedIn: count => `Використано у ${count} ${count === 1 ? "проєкті" : "проєктах"}`
    }
  };

  const packs = {
    sk: {
      meta: {
        title: "Vadym Bahen — Softvérový vývojár",
        description: "Vadym Bahen — softvérový vývojár, ktorý prepája rozhrania, Java služby, AI modely a databázy.",
        ogDescription: "Od rozhrania po infraštruktúru. Pozrite si moje softvérové projekty, architektúru a technickú cestu.",
        twitterDescription: "Od rozhrania po infraštruktúru.",
        url: "https://vadymbahen.pages.dev/sk/",
        ogLocale: "sk_SK"
      },
      text: {
        ".skip-link": "Preskočiť na obsah",
        ".nav-links a:nth-child(1)": "O mne",
        ".nav-links a:nth-child(2)": "Zručnosti",
        ".nav-links a:nth-child(3)": "Projekty",
        ".nav-links a:nth-child(4)": "Cesta",
        ".nav-links a:nth-child(5)": "Napíšte mi",
        ".menu-button .sr-only": "Prepnúť navigáciu",
        ".hero-lede": "Softvérový vývojár so silným backendovým základom, ktorý prepája rozhrania, Java služby, AI modely a dáta pod nimi.",
        ".hero-stats div:nth-child(1) dd": "študent 3. ročníka",
        ".hero-stats div:nth-child(2) dd": "dokončených projektov",
        ".hero-stats div:nth-child(3) dd": "systémov na objavenie",
        "#diagram-title": "Architektúra systému FactCheck",
        "#diagram-desc": "Rozšírenie Chrome sa pripája k Spring Boot API, ktoré komunikuje so službou modelov FastAPI, databázou MySQL a CI/Git workflow.",
        "#about .section-index": "01 / O MNE",
        "#about .about-copy .large-copy": "Som Vadym Bahen, študent tretieho ročníka aplikovanej informatiky, ktorého baví premieňať prepojené nápady na fungujúci softvér.",
        "#about .about-copy > p:nth-child(2)": "Mojím najsilnejším základom je backendový vývoj, no nechcem zostať iba v jednej vrstve. Tvorím Java služby, desktopové a prehliadačové aplikácie, AI integrácie a databázové schémy — a prepájam ich do systémov, ktoré ľudia dokážu reálne používať.",
        "#about .fact-grid div:nth-child(1) span": "lokalita",
        "#about .fact-grid div:nth-child(1) strong": "Košice, Slovensko",
        "#about .fact-grid div:nth-child(2) span": "vzdelanie",
        "#about .fact-grid div:nth-child(3) span": "jazyky",
        "#about .fact-grid div:nth-child(3) strong": "Ukrajinčina — materinský jazyk · Slovenčina B2 · Angličtina B1",
        "#about .fact-grid div:nth-child(4) span": "zameranie",
        "#about .fact-grid div:nth-child(4) strong": "Softvérové inžinierstvo · Full stack",
        "#skills .section-index": "02 / ZRUČNOSTI",
        "#skills .section-heading h2": "Technická schéma",
        "#skills .section-heading > p": "Skutočné použitie v šiestich predstavených projektoch — nie ľubovoľné percentá.",
        "#skills .schema-head span:nth-child(1)": "zručnosť",
        "#skills .schema-head span:nth-child(2)": "kategória",
        "#skills .schema-head span:nth-child(3)": "použité v projektoch",
        "#projects .section-heading .section-index": "03 / PROJEKTY",
        "#projects .section-heading h2": "Vybrané projekty",
        "#projects .section-heading > p": "Systémy vytvorené tímovou prácou, hackathonmi a samostatným učením.",
        "#projects .project-card:nth-child(1) .project-badge": "VÝBER · TÍM 4 ĽUDÍ",
        "#projects .project-card:nth-child(1) .project-kicker": "Projekt s mentormi z Infobipu",
        "#projects .project-card:nth-child(1) > div:nth-child(2) > p:not(.project-kicker)": "Vytvoril som backend v Spring Boote pre chatovací widget využívajúci AI pod vedením dvoch inžinierov z Infobipu. Integroval som REST API, spolupracoval cez Git workflow a spúšťal MySQL pomocou Docker Compose.",
        "#projects .project-card:nth-child(2) .project-badge": "VÝBER · BUILD WEEK",
        "#projects .project-card:nth-child(2) > div:nth-child(2) > p:not(.project-kicker)": "Rozšírenie pre Chrome na overovanie tvrdení. Navrhol som architektúru systému a vytvoril backend v Spring Boote prepojený so službou modelov v Python/FastAPI využívajúcou Qwen a DeBERTa.",
        "#projects .project-card:nth-child(3) .project-badge": "VÝBER · LIVE FULL STACK",
        "#projects .project-card:nth-child(3) .project-kicker": "Nasadený full-stack produkt",
        "#projects .project-card:nth-child(3) > div:nth-child(2) > p:not(.project-kicker)": "Platforma chránená pomocou JWT na správu pracovných žiadostí, plánovanie udalostí, analýzu pokroku a porovnávanie požiadaviek ponuky s osobnými zručnosťami pomocou Gemini. Nasadená cez Firebase, Render a Neon.",
        "#projects .project-card:nth-child(4) .project-badge": "VÝBER · LIVE ML SYSTÉM",
        "#projects .project-card:nth-child(4) .project-kicker": "Kompletná prediktívna údržba",
        "#projects .project-card:nth-child(4) > div:nth-child(2) > p:not(.project-kicker)": "Systém na odhad rizika poruchy zahŕňajúci porovnanie modelov, tvorbu príznakov, vnorenú krížovú validáciu, ladenie prahu, FastAPI inferenciu a React dashboard. Produkčný Random Forest dosahuje recall 0,84 vo vnorenej CV a beží v Cloud Run.",
        "#projects .project-card:nth-child(5) > div:nth-child(2) > p": "Desktopová aplikácia v JavaFX a REST backend v Spring Boote s kompletným návrhom ER/EER schémy, MySQL/HikariCP a viacmodulovou štruktúrou Maven.",
        "#projects .project-card:nth-child(6) .project-kicker": "2. miesto · univerzitný hackathon",
        "#projects .project-card:nth-child(6) > div:nth-child(2) > p:not(.project-kicker)": "Pomocník pri nákupe potravín využívajúci pandas na spracovanie dát a Google Gemini API na tvorbu inteligentnejších odporúčaní.",
        "#projects .case-study:nth-child(1) .project-kicker": "PRÍPADOVÁ ŠTÚDIA / 01",
        "#projects .case-study:nth-child(1) .case-heading > span": "Tímová realizácia",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(1) h4": "Problém",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(1) p": "Prepojiť chat využívajúci AI so spoľahlivou aplikačnou a dátovou vrstvou.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(2) h4": "Moja úloha",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(2) p": "Zodpovedal som za backend v Spring Boote a REST integráciu v štvorčlennom študentskom tíme.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(3) h4": "Prístup",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(3) p": "Definoval som hranice API, prepojil tok chatu a zabezpečil konzistentný beh MySQL cez Docker Compose.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(4) h4": "Výsledok",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(4) p": "Dodali sme funkčný tímový prototyp cez Git workflow pod vedením dvoch inžinierov z Infobipu.",
        "#projects .case-study:nth-child(2) .project-kicker": "PRÍPADOVÁ ŠTÚDIA / 02",
        "#projects .case-study:nth-child(2) .case-heading > span": "Integrácia systému",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(1) h4": "Problém",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(1) p": "Overovať tvrdenia z rozšírenia prehliadača a zároveň oddeliť používateľské rozhranie, aplikačnú logiku a ML inferenciu.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(2) h4": "Moja úloha",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(2) p": "Počas OpenAI Build Week som navrhol architektúru systému a vytvoril backend v Spring Boote.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(3) h4": "Prístup",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(3) p": "Prepojil som rozšírenie s Java REST API a samostatnou službou FastAPI využívajúcou Qwen a DeBERTa.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(4) h4": "Výsledok",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(4) p": "Vznikol kompletný hackathonový systém s jasnými hranicami služieb a nasadením cez Docker.",
        "#path .section-index": "04 / CESTA",
        "#path .section-heading h2": "Staviam ďalej",
        "#path .section-heading > p": "Každý krok pridáva ďalšiu vrstvu systému.",
        "#path .timeline li:nth-child(1) .time": "SEP 2024 — SÚČASNOSŤ",
        "#path .timeline li:nth-child(2) .time": "FEB–JÚN 2026",
        "#path .timeline li:nth-child(3) .time": "JÚL 2026",
        "#path .timeline li:nth-child(1) h3": "Aplikovaná informatika · UPJŠ",
        "#path .timeline li:nth-child(1) p": "Budujem si pevné základy v informatike, softvérovom inžinierstve a dátových systémoch v Košiciach.",
        "#path .timeline li:nth-child(2) p": "V štvorčlennom tíme s dvoma mentormi z praxe sme vytvorili funkčnú službu využívajúcu AI.",
        "#path .timeline li:nth-child(3) p": "Prepojil som rozšírenie prehliadača, Java API, Python modelovú službu, databázu a proces nasadenia do jedného systému.",
        "#path .timeline li:nth-child(4) .time": "TERAZ",
        "#path .timeline li:nth-child(4) h3": "Hľadám ďalší uzol",
        "#path .timeline li:nth-child(4) p": "Hľadám stáž alebo pracovnú pozíciu v softvérovom inžinierstve — od backendovo orientovanej po full-stack — v Košiciach alebo okolí. Som otvorený krátkodobému presťahovaniu.",
        "#contact .section-index": "05 / KONTAKT",
        "#contact > .contact-inner > p:not(.section-index)": "Rád si o tom vypočujem.",
        "footer .footer-inner > span:nth-child(2)": "Navrhnuté ako systém. Vytvorené ručne."
      },
      html: {
        ".eyebrow": "<span class=\"status-dot\"></span> Otvorený príležitostiam v softvérovom inžinierstve · Košice, SK",
        ".hero-copy h1": "Tvorím softvérové systémy <span>od začiatku do konca.</span>",
        ".hero-actions .button.primary": "Pozrieť projekty <span aria-hidden=\"true\">↓</span>",
        ".hero-actions .button.secondary": "Stiahnuť CV <span aria-hidden=\"true\">↓</span>",
        ".diagram-legend span:nth-child(1)": "<i class=\"mint-key\"></i> tok požiadaviek",
        ".diagram-legend span:nth-child(2)": "<i class=\"amber-key\"></i> tok dát",
        "#about h2": "Naprieč celým<br>softvérovým systémom.",
        "#projects .project-card:nth-child(1) .project-actions a:nth-of-type(1)": "Prípadová štúdia <span>→</span>",
        "#projects .project-card:nth-child(1) .project-actions a:nth-of-type(2)": "Zdrojový kód <span>↗</span>",
        "#projects .project-card:nth-child(2) .project-actions a:nth-of-type(1)": "Prípadová štúdia <span>→</span>",
        "#projects .project-card:nth-child(2) .project-actions a:nth-of-type(2)": "Zdrojový kód <span>↗</span>",
        "#projects .project-card:nth-child(3) .project-actions a:nth-of-type(1)": "Živá ukážka <span>↗</span>",
        "#projects .project-card:nth-child(3) .project-actions a:nth-of-type(2)": "Zdrojový kód <span>↗</span>",
        "#projects .project-card:nth-child(4) .project-actions a:nth-of-type(1)": "Živá ukážka <span>↗</span>",
        "#projects .project-card:nth-child(4) .project-actions a:nth-of-type(2)": "Zdrojový kód <span>↗</span>",
        "#projects .project-card:nth-child(5) .project-actions a": "Zdrojový kód <span>↗</span>",
        "#projects .project-card:nth-child(6) .project-actions a": "Zdrojový kód <span>↗</span>",
        "#projects .case-study:nth-child(2) .case-link": "Pozrieť repozitár <span>↗</span>",
        "#contact h2": "Máte stáž, pracovnú príležitosť alebo softvérový projekt, ktorý stojí za vytvorenie?",
        "#contact .button.primary": "Začať konverzáciu <span>↗</span>",
        "#contact .contact-links a:last-child": "Stiahnuť CV ↓",
        "footer .back-to-top": "Späť hore ↑"
      },
      attrs: {
        ".site-header nav": { "aria-label": "Hlavná navigácia" },
        ".architecture": { "aria-label": "Diagram architektúry prepájajúci rozšírenie Chrome, backend, AI, databázu a CI služby" },
        ".schema-table": { "aria-label": "Technické zručnosti" },
        ".language-switcher": { "aria-label": "Výber jazyka" }
      }
    },
    uk: {
      meta: {
        title: "Vadym Bahen — Розробник програмного забезпечення",
        description: "Vadym Bahen — розробник програмного забезпечення, який поєднує інтерфейси, Java-сервіси, AI-моделі та бази даних.",
        ogDescription: "Від інтерфейсу до інфраструктури. Перегляньте мої програмні проєкти, архітектурні рішення та технічний шлях.",
        twitterDescription: "Від інтерфейсу до інфраструктури.",
        url: "https://vadymbahen.pages.dev/uk/",
        ogLocale: "uk_UA"
      },
      text: {
        ".skip-link": "Перейти до вмісту",
        ".nav-links a:nth-child(1)": "Про мене",
        ".nav-links a:nth-child(2)": "Навички",
        ".nav-links a:nth-child(3)": "Проєкти",
        ".nav-links a:nth-child(4)": "Шлях",
        ".nav-links a:nth-child(5)": "Написати",
        ".menu-button .sr-only": "Перемкнути навігацію",
        ".hero-lede": "Розробник програмного забезпечення із сильною backend-базою, який поєднує інтерфейси, Java-сервіси, AI-моделі та дані під ними.",
        ".hero-stats div:nth-child(1) dd": "студент 3 курсу",
        ".hero-stats div:nth-child(2) dd": "завершених проєктів",
        ".hero-stats div:nth-child(3) dd": "систем для вивчення",
        "#diagram-title": "Архітектура системи FactCheck",
        "#diagram-desc": "Розширення Chrome підключається до Spring Boot API, яке взаємодіє із сервісом моделей FastAPI, базою MySQL та CI/Git процесом.",
        "#about .section-index": "01 / ПРО МЕНЕ",
        "#about .about-copy .large-copy": "Я Vadym Bahen, студент третього курсу прикладної інформатики, якому подобається перетворювати пов’язані ідеї на робоче програмне забезпечення.",
        "#about .about-copy > p:nth-child(2)": "Моя найсильніша основа — backend-розробка, але я не хочу залишатися лише в одному шарі. Я створюю Java-сервіси, настільні та браузерні застосунки, AI-інтеграції й схеми баз даних, а потім поєдную їх у системи, якими люди можуть реально користуватися.",
        "#about .fact-grid div:nth-child(1) span": "локація",
        "#about .fact-grid div:nth-child(1) strong": "Кошиці, Словаччина",
        "#about .fact-grid div:nth-child(2) span": "освіта",
        "#about .fact-grid div:nth-child(3) span": "мови",
        "#about .fact-grid div:nth-child(3) strong": "Українська — рідна · Словацька B2 · Англійська B1",
        "#about .fact-grid div:nth-child(4) span": "напрям",
        "#about .fact-grid div:nth-child(4) strong": "Програмна інженерія · Full stack",
        "#skills .section-index": "02 / НАВИЧКИ",
        "#skills .section-heading h2": "Технічна схема",
        "#skills .section-heading > p": "Реальне використання у шести представлених проєктах — без довільних відсотків.",
        "#skills .schema-head span:nth-child(1)": "навичка",
        "#skills .schema-head span:nth-child(2)": "категорія",
        "#skills .schema-head span:nth-child(3)": "використано у проєктах",
        "#projects .section-heading .section-index": "03 / ПРОЄКТИ",
        "#projects .section-heading h2": "Вибрані проєкти",
        "#projects .section-heading > p": "Системи, створені завдяки командній роботі, хакатонам і самостійному навчанню.",
        "#projects .project-card:nth-child(1) .project-badge": "ВИБРАНЕ · КОМАНДА З 4",
        "#projects .project-card:nth-child(1) .project-kicker": "Проєкт із менторами Infobip",
        "#projects .project-card:nth-child(1) > div:nth-child(2) > p:not(.project-kicker)": "Створив Spring Boot backend для чат-віджета на основі AI під керівництвом двох інженерів Infobip. Інтегрував REST API, працював у Git-процесі та запускав MySQL через Docker Compose.",
        "#projects .project-card:nth-child(2) .project-badge": "ВИБРАНЕ · BUILD WEEK",
        "#projects .project-card:nth-child(2) > div:nth-child(2) > p:not(.project-kicker)": "Розширення Chrome для перевірки тверджень. Спроєктував архітектуру системи та створив Spring Boot backend, підключений до сервісу моделей на Python/FastAPI з Qwen і DeBERTa.",
        "#projects .project-card:nth-child(3) .project-badge": "ВИБРАНЕ · LIVE FULL STACK",
        "#projects .project-card:nth-child(3) .project-kicker": "Розгорнутий full-stack продукт",
        "#projects .project-card:nth-child(3) > div:nth-child(2) > p:not(.project-kicker)": "Захищена JWT платформа для відстеження відгуків, планування подій, аналізу прогресу та порівняння вимог вакансії з особистими навичками за допомогою Gemini. Розгорнута у Firebase, Render і Neon.",
        "#projects .project-card:nth-child(4) .project-badge": "ВИБРАНЕ · LIVE ML-СИСТЕМА",
        "#projects .project-card:nth-child(4) .project-kicker": "Наскрізне прогнозне обслуговування",
        "#projects .project-card:nth-child(4) > div:nth-child(2) > p:not(.project-kicker)": "Система оцінювання ризику відмови: порівняння моделей, feature engineering, вкладена крос-валідація, налаштування порога, FastAPI-інференс і React dashboard. Продакшн Random Forest має recall 0,84 у вкладеній CV та розгорнутий у Cloud Run.",
        "#projects .project-card:nth-child(5) > div:nth-child(2) > p": "Настільний застосунок JavaFX і REST backend на Spring Boot із повним проєктуванням ER/EER-схеми, MySQL/HikariCP та багатомодульною структурою Maven.",
        "#projects .project-card:nth-child(6) .project-kicker": "2 місце · університетський хакатон",
        "#projects .project-card:nth-child(6) > div:nth-child(2) > p:not(.project-kicker)": "Помічник для купівлі продуктів, який використовує pandas для обробки даних і Google Gemini API для створення розумніших рекомендацій.",
        "#projects .case-study:nth-child(1) .project-kicker": "КЕЙС / 01",
        "#projects .case-study:nth-child(1) .case-heading > span": "Командна реалізація",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(1) h4": "Проблема",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(1) p": "Поєднати чат на основі AI з надійними прикладним і data-шарами.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(2) h4": "Моя роль",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(2) p": "Відповідав за Spring Boot backend і REST-інтеграцію в студентській команді з чотирьох людей.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(3) h4": "Підхід",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(3) p": "Визначив межі API, підключив потік чату та забезпечив однаковий запуск MySQL через Docker Compose.",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(4) h4": "Результат",
        "#projects .case-study:nth-child(1) .case-grid > div:nth-child(4) p": "Команда створила робочий прототип у Git-процесі під керівництвом двох інженерів Infobip.",
        "#projects .case-study:nth-child(2) .project-kicker": "КЕЙС / 02",
        "#projects .case-study:nth-child(2) .case-heading > span": "Інтеграція системи",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(1) h4": "Проблема",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(1) p": "Перевіряти твердження з браузерного розширення, зберігаючи незалежними інтерфейс, прикладну логіку та ML-інференс.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(2) h4": "Моя роль",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(2) p": "Під час OpenAI Build Week спроєктував архітектуру системи та створив Spring Boot backend.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(3) h4": "Підхід",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(3) p": "Підключив розширення до Java REST API та окремого FastAPI-сервісу, що використовує Qwen і DeBERTa.",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(4) h4": "Результат",
        "#projects .case-study:nth-child(2) .case-grid > div:nth-child(4) p": "Створив наскрізну хакатонну систему з чіткими межами сервісів і розгортанням через Docker.",
        "#path .section-index": "04 / ШЛЯХ",
        "#path .section-heading h2": "Рухаюся далі",
        "#path .section-heading > p": "Кожен крок додає ще один шар до системи.",
        "#path .timeline li:nth-child(1) .time": "ВЕР 2024 — ДОТЕПЕР",
        "#path .timeline li:nth-child(2) .time": "ЛЮТ–ЧЕР 2026",
        "#path .timeline li:nth-child(3) .time": "ЛИП 2026",
        "#path .timeline li:nth-child(1) h3": "Прикладна інформатика · UPJŠ",
        "#path .timeline li:nth-child(1) p": "Формую міцну основу в інформатиці, програмній інженерії та системах даних у Кошицях.",
        "#path .timeline li:nth-child(2) p": "У команді з чотирьох людей і з двома індустріальними менторами створив практичний сервіс на основі AI.",
        "#path .timeline li:nth-child(3) p": "Об’єднав браузерне розширення, Java API, Python-сервіс моделей, базу даних і процес розгортання в одну систему.",
        "#path .timeline li:nth-child(4) .time": "ЗАРАЗ",
        "#path .timeline li:nth-child(4) h3": "Шукаю наступний вузол",
        "#path .timeline li:nth-child(4) p": "Шукаю стажування або роботу у сфері програмної інженерії — від backend-орієнтованої до full-stack — у Кошицях або поблизу. Відкритий до короткострокового переїзду.",
        "#contact .section-index": "05 / КОНТАКТ",
        "#contact > .contact-inner > p:not(.section-index)": "Буду радий почути про це.",
        "footer .footer-inner > span:nth-child(2)": "Спроєктовано як систему. Створено вручну."
      },
      html: {
        ".eyebrow": "<span class=\"status-dot\"></span> Відкритий до можливостей у програмній інженерії · Кошиці, SK",
        ".hero-copy h1": "Створюю програмні системи <span>від початку до кінця.</span>",
        ".hero-actions .button.primary": "Переглянути проєкти <span aria-hidden=\"true\">↓</span>",
        ".hero-actions .button.secondary": "Завантажити CV <span aria-hidden=\"true\">↓</span>",
        ".diagram-legend span:nth-child(1)": "<i class=\"mint-key\"></i> потік запитів",
        ".diagram-legend span:nth-child(2)": "<i class=\"amber-key\"></i> потік даних",
        "#about h2": "У межах усієї<br>програмної системи.",
        "#projects .project-card:nth-child(1) .project-actions a:nth-of-type(1)": "Переглянути кейс <span>→</span>",
        "#projects .project-card:nth-child(1) .project-actions a:nth-of-type(2)": "Переглянути код <span>↗</span>",
        "#projects .project-card:nth-child(2) .project-actions a:nth-of-type(1)": "Переглянути кейс <span>→</span>",
        "#projects .project-card:nth-child(2) .project-actions a:nth-of-type(2)": "Переглянути код <span>↗</span>",
        "#projects .project-card:nth-child(3) .project-actions a:nth-of-type(1)": "Відкрити демо <span>↗</span>",
        "#projects .project-card:nth-child(3) .project-actions a:nth-of-type(2)": "Переглянути код <span>↗</span>",
        "#projects .project-card:nth-child(4) .project-actions a:nth-of-type(1)": "Відкрити демо <span>↗</span>",
        "#projects .project-card:nth-child(4) .project-actions a:nth-of-type(2)": "Переглянути код <span>↗</span>",
        "#projects .project-card:nth-child(5) .project-actions a": "Переглянути код <span>↗</span>",
        "#projects .project-card:nth-child(6) .project-actions a": "Переглянути код <span>↗</span>",
        "#projects .case-study:nth-child(2) .case-link": "Переглянути репозиторій <span>↗</span>",
        "#contact h2": "Маєте стажування, робочу можливість або програмний проєкт, який варто створити?",
        "#contact .button.primary": "Почати розмову <span>↗</span>",
        "#contact .contact-links a:last-child": "Завантажити CV ↓",
        "footer .back-to-top": "Нагору ↑"
      },
      attrs: {
        ".site-header nav": { "aria-label": "Основна навігація" },
        ".architecture": { "aria-label": "Схема архітектури, що поєднує розширення Chrome, backend, AI, базу даних і CI-сервіси" },
        ".schema-table": { "aria-label": "Технічні навички" },
        ".language-switcher": { "aria-label": "Вибір мови" }
      }
    }
  };

  const setMeta = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.content = value;
  };

  const pack = packs[locale];
  if (pack) {
    document.title = pack.meta.title;
    setMeta('meta[name="description"]', pack.meta.description);
    setMeta('meta[property="og:title"]', pack.meta.title);
    setMeta('meta[property="og:description"]', pack.meta.ogDescription);
    setMeta('meta[property="og:url"]', pack.meta.url);
    setMeta('meta[property="og:locale"]', pack.meta.ogLocale);
    setMeta('meta[name="twitter:title"]', pack.meta.title);
    setMeta('meta[name="twitter:description"]', pack.meta.twitterDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = pack.meta.url;

    Object.entries(pack.text).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });
    Object.entries(pack.html).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = value;
    });
    Object.entries(pack.attrs).forEach(([selector, attributes]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    });
  }

  document.querySelectorAll(".language-switcher a").forEach(link => {
    const active = link.dataset.lang === locale;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
    link.addEventListener("click", () => {
      if (window.location.hash) link.href = `${link.href.split("#")[0]}${window.location.hash}`;
    });
  });

  window.portfolioLocale = {
    code: locale,
    ...runtime[locale]
  };
})();
