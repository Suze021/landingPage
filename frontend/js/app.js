import { fetchPortfolioContent } from "../api/portfolioApi.js";

const { createApp, computed, onMounted, ref, watch } = window.Vue;

const SUPPORTED_LANGUAGES = new Set(["en", "pt-BR"]);

const FALLBACK_CONTENT = Object.freeze({
  en: {
    ui: {
      documentTitle: "Your Name | Portfolio",
      metaDescription: "Minimal portfolio landing page with a professional project selector.",
      navAria: "Main navigation",
      navAbout: "About",
      navProjects: "Projects",
      navContact: "Contact",
      languageAria: "Switch website language to Brazilian Portuguese",
      languageButton: "PT-BR",
      heroTag: "Portfolio / Software Developer",
      heroTitle: "Building focused software with clean execution.",
      heroLead: "This is my personal landing page for resumes and applications. It includes selected projects, a short profile, and direct contact options.",
      heroPrimaryCta: "View Projects",
      heroSecondaryCta: "Get In Touch",
      aboutTitle: "About",
      aboutSubtitle: "Replace this text with your own background, strengths, and the type of role you are targeting.",
      profileTitle: "Profile",
      profileParagraph1: "I focus on practical product development: clear architecture, reliable APIs, and user interfaces that are simple to understand and fast to use.",
      profileParagraph2: "I enjoy collaborating in teams, iterating quickly, and shipping features that make measurable improvements.",
      stackTitle: "Core Stack",
      stackItems: [
        "JavaScript / TypeScript",
        "React / Next.js",
        "Node.js / REST APIs",
        "SQL / Prisma",
        "Git / Testing"
      ],
      projectsTitle: "Selected Projects",
      projectsSubtitle: "Click a project on the left to load details on the right, like a professional showcase selector.",
      selectorAria: "Project selector",
      projectLive: "Live Demo",
      projectCode: "Source Code",
      contactTitle: "Contact",
      contactSubtitle: "Use your real links before publishing this page.",
      contactEmail: "Email",
      footerPrefix: "Copyright",
      footerSuffix: "Minimal portfolio."
    },
    projects: [
      {
        id: "01",
        title: "Project One",
        type: "Full Stack Web App",
        stack: "React / Node / PostgreSQL",
        description: "A production-style app for managing user workflows with authentication, role access, and structured data operations.",
        live: "#",
        code: "#"
      },
      {
        id: "02",
        title: "Project Two",
        type: "Analytics Dashboard",
        stack: "TypeScript / Next.js / Charts",
        description: "A metrics dashboard that aggregates API data, highlights KPI trends, and surfaces key actions through a clean, decision-focused UI.",
        live: "#",
        code: "#"
      },
      {
        id: "03",
        title: "Project Three",
        type: "API + Admin Panel",
        stack: "Express / JWT / SQL",
        description: "An API-driven platform with a secure admin panel for managing records, validation flows, and exportable reports.",
        live: "#",
        code: "#"
      },
      {
        id: "04",
        title: "Project Four",
        type: "Frontend Product Interface",
        stack: "Next.js / CSS / Accessibility",
        description: "A responsive interface optimized for speed and readability, with accessible interactions and component-driven architecture.",
        live: "#",
        code: "#"
      }
    ]
  },
  "pt-BR": {
    ui: {
      documentTitle: "Seu Nome | Portfólio",
      metaDescription: "Landing page minimalista de portfólio com seletor profissional de projetos.",
      navAria: "Navegação principal",
      navAbout: "Sobre",
      navProjects: "Projetos",
      navContact: "Contato",
      languageAria: "Trocar o idioma do site para inglês",
      languageButton: "EN",
      heroTag: "Portfólio / Desenvolvedor de Software",
      heroTitle: "Construindo software com foco e execução limpa.",
      heroLead: "Esta é minha landing page pessoal para currículo e candidaturas. Ela inclui projetos selecionados, um perfil curto e canais diretos de contato.",
      heroPrimaryCta: "Ver Projetos",
      heroSecondaryCta: "Entrar em Contato",
      aboutTitle: "Sobre",
      aboutSubtitle: "Substitua este texto com seu contexto profissional, pontos fortes e o tipo de vaga que você procura.",
      profileTitle: "Perfil",
      profileParagraph1: "Meu foco é desenvolvimento de produtos práticos: arquitetura clara, APIs confiáveis e interfaces simples de entender e rápidas de usar.",
      profileParagraph2: "Gosto de colaborar em equipe, iterar com velocidade e entregar funcionalidades com melhoria mensurável.",
      stackTitle: "Stack Principal",
      stackItems: [
        "JavaScript / TypeScript",
        "React / Next.js",
        "Node.js / APIs REST",
        "SQL / Prisma",
        "Git / Testes"
      ],
      projectsTitle: "Projetos Selecionados",
      projectsSubtitle: "Clique em um projeto à esquerda para carregar os detalhes à direita, como um seletor de showcase profissional.",
      selectorAria: "Seletor de projetos",
      projectLive: "Demo Online",
      projectCode: "Código Fonte",
      contactTitle: "Contato",
      contactSubtitle: "Troque pelos seus links reais antes de publicar esta página.",
      contactEmail: "E-mail",
      footerPrefix: "Copyright",
      footerSuffix: "Portfólio minimalista."
    },
    projects: [
      {
        id: "01",
        title: "Projeto Um",
        type: "Aplicação Web Full Stack",
        stack: "React / Node / PostgreSQL",
        description: "Uma aplicação em padrão de produção para gerenciar fluxos de usuário com autenticação, controle de acesso por papel e operações de dados estruturadas.",
        live: "#",
        code: "#"
      },
      {
        id: "02",
        title: "Projeto Dois",
        type: "Dashboard Analítico",
        stack: "TypeScript / Next.js / Gráficos",
        description: "Um dashboard de métricas que agrega dados de API, destaca tendências de KPI e apresenta ações-chave com interface limpa e orientada à decisão.",
        live: "#",
        code: "#"
      },
      {
        id: "03",
        title: "Projeto Três",
        type: "API + Painel Administrativo",
        stack: "Express / JWT / SQL",
        description: "Uma plataforma orientada por API com painel administrativo seguro para gerenciar registros, validações e relatórios exportáveis.",
        live: "#",
        code: "#"
      },
      {
        id: "04",
        title: "Projeto Quatro",
        type: "Interface de Produto Frontend",
        stack: "Next.js / CSS / Acessibilidade",
        description: "Uma interface responsiva otimizada para velocidade e legibilidade, com interações acessíveis e arquitetura baseada em componentes.",
        live: "#",
        code: "#"
      }
    ]
  }
});

function normalizeLanguage(language) {
  if (typeof language !== "string") {
    return "en";
  }

  const trimmed = language.trim();
  return SUPPORTED_LANGUAGES.has(trimmed) ? trimmed : "en";
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function sanitizeText(value, maxLength = 240) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeUrl(value) {
  if (typeof value !== "string") {
    return "#";
  }

  const trimmed = value.trim();
  if (trimmed === "#") {
    return "#";
  }

  try {
    const parsed = new URL(trimmed, window.location.origin);
    const safeProtocols = new Set(["http:", "https:", "mailto:"]);
    if (!safeProtocols.has(parsed.protocol)) {
      return "#";
    }
    return parsed.href;
  } catch {
    return "#";
  }
}

function sanitizeUi(rawUi) {
  const safeUi = rawUi || {};
  const stackItems = Array.isArray(safeUi.stackItems)
    ? safeUi.stackItems.map((item) => sanitizeText(item, 60)).filter(Boolean).slice(0, 10)
    : [];

  return {
    documentTitle: sanitizeText(safeUi.documentTitle, 90),
    metaDescription: sanitizeText(safeUi.metaDescription, 180),
    navAria: sanitizeText(safeUi.navAria, 80),
    navAbout: sanitizeText(safeUi.navAbout, 40),
    navProjects: sanitizeText(safeUi.navProjects, 40),
    navContact: sanitizeText(safeUi.navContact, 40),
    languageAria: sanitizeText(safeUi.languageAria, 120),
    languageButton: sanitizeText(safeUi.languageButton, 20),
    heroTag: sanitizeText(safeUi.heroTag, 90),
    heroTitle: sanitizeText(safeUi.heroTitle, 140),
    heroLead: sanitizeText(safeUi.heroLead, 280),
    heroPrimaryCta: sanitizeText(safeUi.heroPrimaryCta, 40),
    heroSecondaryCta: sanitizeText(safeUi.heroSecondaryCta, 40),
    aboutTitle: sanitizeText(safeUi.aboutTitle, 40),
    aboutSubtitle: sanitizeText(safeUi.aboutSubtitle, 220),
    profileTitle: sanitizeText(safeUi.profileTitle, 40),
    profileParagraph1: sanitizeText(safeUi.profileParagraph1, 280),
    profileParagraph2: sanitizeText(safeUi.profileParagraph2, 280),
    stackTitle: sanitizeText(safeUi.stackTitle, 40),
    stackItems,
    projectsTitle: sanitizeText(safeUi.projectsTitle, 60),
    projectsSubtitle: sanitizeText(safeUi.projectsSubtitle, 220),
    selectorAria: sanitizeText(safeUi.selectorAria, 120),
    projectLive: sanitizeText(safeUi.projectLive, 40),
    projectCode: sanitizeText(safeUi.projectCode, 40),
    contactTitle: sanitizeText(safeUi.contactTitle, 60),
    contactSubtitle: sanitizeText(safeUi.contactSubtitle, 220),
    contactEmail: sanitizeText(safeUi.contactEmail, 30),
    footerPrefix: sanitizeText(safeUi.footerPrefix, 80),
    footerSuffix: sanitizeText(safeUi.footerSuffix, 120)
  };
}

function sanitizeProjectList(rawProjects) {
  if (!Array.isArray(rawProjects)) {
    return Object.freeze([]);
  }

  return Object.freeze(
    rawProjects.slice(0, 12).map((project, index) => ({
      id: sanitizeText(project.id, 12) || String(index + 1).padStart(2, "0"),
      title: sanitizeText(project.title, 80) || "Untitled Project",
      type: sanitizeText(project.type, 80) || "Project",
      stack: sanitizeText(project.stack, 120) || "Stack not provided",
      description: sanitizeText(project.description, 420) || "No description provided.",
      live: sanitizeUrl(project.live),
      code: sanitizeUrl(project.code)
    }))
  );
}

function getFallbackLocale(language) {
  const normalized = normalizeLanguage(language);
  return FALLBACK_CONTENT[normalized] || FALLBACK_CONTENT.en;
}

createApp({
  setup() {
    const language = ref("en");
    const activeIndex = ref(0);
    const isLanguageSwitching = ref(false);
    const isSwitching = ref(false);
    const localeByLanguage = ref({});

    async function loadLocale(languageCode) {
      const normalized = normalizeLanguage(languageCode);
      if (localeByLanguage.value[normalized]) {
        return localeByLanguage.value[normalized];
      }

      try {
        const content = await fetchPortfolioContent(normalized);
        localeByLanguage.value = {
          ...localeByLanguage.value,
          [normalized]: content
        };
      } catch (error) {
        localeByLanguage.value = {
          ...localeByLanguage.value,
          [normalized]: getFallbackLocale(normalized)
        };
      }

      return localeByLanguage.value[normalized];
    }

    const localePack = computed(() => {
      return localeByLanguage.value[language.value] || getFallbackLocale(language.value);
    });

    const t = computed(() => sanitizeUi(localePack.value.ui));
    const projects = computed(() => sanitizeProjectList(localePack.value.projects));

    const currentProject = computed(() => {
      return projects.value[activeIndex.value] || projects.value[0] || {
        id: "00",
        title: "",
        type: "",
        stack: "",
        description: "",
        live: "#",
        code: "#"
      };
    });

    const safeLiveUrl = computed(() => sanitizeUrl(currentProject.value.live));
    const safeCodeUrl = computed(() => sanitizeUrl(currentProject.value.code));

    function applyDocumentTexts() {
      const descriptionMeta = document.querySelector("meta[name='description']");
      document.documentElement.lang = language.value;
      document.title = t.value.documentTitle || "Portfolio";

      if (descriptionMeta) {
        descriptionMeta.setAttribute("content", t.value.metaDescription || "");
      }
    }

    function setProject(index) {
      if (
        index === activeIndex.value ||
        index < 0 ||
        index >= projects.value.length ||
        isSwitching.value
      ) {
        return;
      }

      isSwitching.value = true;
      window.setTimeout(() => {
        activeIndex.value = index;
        isSwitching.value = false;
      }, 170);
    }

    async function toggleLanguage() {
      if (isLanguageSwitching.value) {
        return;
      }

      const nextLanguage = language.value === "en" ? "pt-BR" : "en";
      isLanguageSwitching.value = true;

      await delay(90);
      await loadLocale(nextLanguage);
      language.value = nextLanguage;

      if (activeIndex.value >= projects.value.length) {
        activeIndex.value = 0;
      }

      await delay(130);
      isLanguageSwitching.value = false;
    }

    watch(language, () => {
      applyDocumentTexts();
    });

    watch(projects, (projectList) => {
      if (activeIndex.value >= projectList.length) {
        activeIndex.value = 0;
      }
    });

    onMounted(async () => {
      const yearEl = document.getElementById("year");
      if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
      }

      await loadLocale(language.value);
      void loadLocale(language.value === "en" ? "pt-BR" : "en");
      applyDocumentTexts();

      const revealNodes = document.querySelectorAll(".reveal");

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        }, { threshold: 0.2 });

        revealNodes.forEach((el) => observer.observe(el));
        return;
      }

      revealNodes.forEach((el) => el.classList.add("in"));
    });

    return {
      activeIndex,
      currentProject,
      isLanguageSwitching,
      isSwitching,
      projects,
      safeCodeUrl,
      safeLiveUrl,
      setProject,
      t,
      toggleLanguage
    };
  }
}).mount("#app");
