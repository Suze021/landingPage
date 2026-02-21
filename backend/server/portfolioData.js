"use strict";

const SUPPORTED_LANGUAGES = new Set(["en", "pt-BR"]);

const LOCALE_CONTENT = Object.freeze({
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

function getPortfolioContent(language) {
  const normalized = normalizeLanguage(language);
  const payload = LOCALE_CONTENT[normalized] || LOCALE_CONTENT.en;
  return JSON.parse(JSON.stringify(payload));
}

module.exports = {
  getPortfolioContent,
  normalizeLanguage
};

