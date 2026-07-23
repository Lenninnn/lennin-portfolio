const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach(section => observer.observe(section));

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const contactStatus = contactForm.querySelector('[data-contact-status]');

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const whatsappMessage = [
      `Hola Lennin, soy ${name}.`,
      `Mi correo es ${email}.`,
      '',
      message,
    ].join('\n');
    const whatsappUrl = `${contactForm.action}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    contactStatus.textContent = 'WhatsApp se abrió en una pestaña nueva.';
    contactStatus.className = 'contact-form-status is-success';
  });
}

const heroForms = document.querySelectorAll(".hero-form");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroForms.length && !reduceMotion.matches) {
  let pointerX = 0;
  let pointerY = 0;
  const motionProfiles = [...heroForms].map((_, index) => ({
    phase: Math.random() * Math.PI * 2 + index,
    speed: .72 + Math.random() * .48,
    xRange: 20 + Math.random() * 34,
    yRange: 10 + Math.random() * 22,
    opacityBase: .065 + Math.random() * .025,
    opacityRange: .035 + Math.random() * .035,
    scaleRange: .018 + Math.random() * .028,
  }));

  window.addEventListener("pointermove", event => {
    pointerX = (event.clientX / window.innerWidth - .5) * 2;
    pointerY = (event.clientY / window.innerHeight - .5) * 2;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  });

  function animateHeroForms(time) {
    heroForms.forEach((form, index) => {
      const profile = motionProfiles[index];
      const t = time * .0001 * profile.speed;
      const driftX = (
        Math.sin(t + profile.phase) * .72 +
        Math.sin(t * .37 + profile.phase * 2.13) * .28
      ) * profile.xRange;
      const driftY = (
        Math.cos(t * .63 + profile.phase) * .68 +
        Math.sin(t * .29 + profile.phase * 1.47) * .32
      ) * profile.yRange;
      const parallax = 5 + index * 2;
      const x = driftX + pointerX * parallax;
      const y = driftY + pointerY * parallax;
      const presence = (Math.sin(t * .21 + profile.phase) + 1) / 2;
      const scale = .955 + Math.sin(t * .43 + profile.phase) * profile.scaleRange;
      form.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      form.style.opacity = String(profile.opacityBase + presence * profile.opacityRange);
    });

    requestAnimationFrame(animateHeroForms);
  }

  requestAnimationFrame(animateHeroForms);
}

const projectCarousel = document.querySelector("[data-project-carousel]");

const projects = [
  {
    title: "GOMETRICAL",
    type: "SaaS",
    filters: ["saas"],
    tagline: "Campañas, inversión y métricas en un solo panel",
    description:
      "SaaS para análisis de campañas conectado a Meta Ads y Google Ads, con acceso por usuario, métricas de inversión y seguimiento de resultados.",
    detail:
      "El proyecto incluye autenticación, control por roles, endpoints en PHP, base de datos MySQL, pagos con Wompi y medición con GTM. La interfaz está pensada para leer costos, rendimiento y oportunidades de optimización sin depender de reportes externos.",
    technologies: ["PHP", "MySQL", "Meta Ads API", "Google Ads API", "Wompi", "GTM", "JavaScript"],
    link: "https://gometrical.com/",
    image: "assets/projects/gometrical-01.png",
    motionFrames: [
      "assets/projects/gometrical-01.png",
      "assets/projects/gometrical-02.png",
      "assets/projects/gometrical-03.png",
      "assets/projects/gometrical-04.png",
      "assets/projects/gometrical-05.png",
      "assets/projects/gometrical-06.png",
      "assets/projects/gometrical-07.png",
      "assets/projects/gometrical-08.png",
      "assets/projects/gometrical-09.png",
      "assets/projects/gometrical-10.png",
      "assets/projects/gometrical-11.png",
    ],
    previewDuration: 58,
    previewTravel: "-50%",
    accent: "#f4f4f0",
    glow: "rgba(255, 255, 255, 0.08)",
  },
  {
    title: "SYNQBEE CRM",
    type: "SaaS",
    filters: ["saas"],
    tagline: "Leads, embudo comercial y reportes",
    description:
      "CRM SaaS para gestionar leads en tiempo real desde Meta Ads, asignarlos a asesores y medir el avance comercial por campaña.",
    detail:
      "El sistema centraliza hasta 25.000 leads mensuales, usa embudo visual, roles por equipo, métricas CPA, ROAS, ticket y conversión, bots de respuesta y reportes de ROI. La operación redujo el tiempo de respuesta 78% y mejoró el cierre 19%.",
    technologies: ["PHP", "MySQL", "Meta Ads API", "CRM", "Automatizaciones", "Roles", "Reportes ROI"],
    link: "https://synqbee.com/",
    image: "assets/projects/synqbee-scroll.png",
    motion: "assets/projects/synqbee-scroll.png",
    previewDuration: 42,
    previewTravel: "-50%",
    accent: "#f4f4f0",
    glow: "rgba(255, 255, 255, 0.08)",
  },
  {
    title: "NOVANK",
    type: "Prototipo UI/UX",
    filters: ["uiux"],
    tagline: "Prototipo bancario móvil",
    description:
      "Prototipo navegable en Figma para una experiencia bancaria móvil con pantallas de cuenta, transferencias, seguridad, soporte y modo inversionista.",
    detail:
      "NoVank organiza 15 pantallas exportadas desde Figma: inicio, cuenta, tarjetas, inversiones, bolsillos, créditos, seguridad, perfil, transferencias, soporte, bloqueo, alertas y estados de confirmación. La intención es validar una app bancaria clara, moderna y confiable antes de pasar a desarrollo.",
    technologies: ["Figma", "UI/UX", "Prototipo", "App móvil", "Flujos de usuario", "QA"],
    link:
      "https://www.figma.com/proto/TTIX0VuROATkd1PPZjlitQ/NoVank?node-id=0-1&p=f&t=uefjHeofufUvhnT4-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&fuid=1342127653413737913",
    image: "assets/projects/NoVank/01 Inicio Completo.png",
    motion: "assets/projects/novank-full.svg",
    previewDuration: 44,
    previewStartOffset: 0,
    previewTravel: "-50%",
    accent: "#ff9b42",
    glow: "rgba(255, 155, 66, 0.16)",
  },
  {
    title: "DIVIX WEBINAR",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Identidades bajo ataque",
    description:
      "Página de aterrizaje para un webinar de ciberseguridad enfocado en credenciales comprometidas, MFA, cumplimiento regulatorio y una demostración en vivo de GreenRADIUS.",
    detail:
      "El sitio combina hero comercial, formulario de inscripción, aceptación de política de privacidad, agenda del evento, expertos y CTA de registro. Además cuenta con backend y panel de administración para revisar personas registradas, datos enviados y seguimiento del evento.",
    technologies: ["HTML", "CSS", "JavaScript", "Backend de formularios", "Registros", "Panel admin"],
    link: "https://divixwebinar.com/",
    image: "assets/projects/divix-webinnar.png",
    motion: "assets/projects/divix-webinnar-full.svg",
    previewDuration: 32,
    accent: "#f2f2ef",
    glow: "rgba(242, 242, 239, 0.16)",
  },
  {
    title: "DELICIAS BENDITAS",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Vista completa: el sitio recorre su contenido automáticamente",
    description:
      "Experiencia web para una marca de alimentos colombianos con catálogo, líneas de producto, consejos de preparación y recorrido comercial.",
    detail:
      "El sitio construye una presencia de marca completa: productos congelados, listos y horneados, carrito sincronizado, acceso de usuario, consejos, contacto y WhatsApp. La vista del portafolio reproduce el recorrido completo en formato de escritorio y el enlace permite continuar hacia sus flujos interactivos.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "Catálogo", "Carrito", "Responsive", "WhatsApp"],
    link: "https://darkgray-emu-217076.hostingersite.com/",
    image: "assets/projects/delicias-benditas-full.png",
    motion: "assets/projects/delicias-benditas-full.png",
    previewDuration: 70,
    previewTravel: "-50%",
    accent: "#801D3A",
    glow: "rgba(128, 29, 58, 0.14)",
  },
  {
    title: "DEL VINILO AL ALGORITMO",
    type: "Proyecto académico",
    filters: ["academic"],
    tagline: "Interactúa aquí: usa scroll, sonido y controles de exploración",
    description:
      "Narrativa web inmersiva sobre la evolución de la distribución musical: del vinilo y el cassette al streaming guiado por algoritmos.",
    detail:
      "La investigación se transforma en experiencia. El visitante atraviesa etapas, compara ritual físico y velocidad digital, entra a un museo interactivo y explora escenarios con controles de movimiento e interacción. No es una lectura lineal: está diseñada para descubrirse usando scroll, sonido y participación.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "Canvas 3D", "Narrativa interactiva", "Audio", "UX inmersiva"],
    link: "https://antiquewhite-newt-357769.hostingersite.com/",
    image: "assets/portfolio-preview.png",
    accent: "#C9A56A",
    glow: "rgba(201, 165, 106, 0.14)",
  },
  {
    title: "ELEMENTO INMOBILIARIO",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Propiedades, confianza y leads",
    description:
      "Sitio web inmobiliario para presentar apartamentos, casas, proyectos destacados y asesoría personalizada en el sur del Valle de Aburrá y el Caribe antioqueño.",
    detail:
      "La experiencia guía a compradores y vendedores con beneficios claros, inventario de propiedades, fichas visuales, WhatsApp y formulario de contacto. También incorpora backend y panel admin para gestionar mensajes, registros e información enviada desde el sitio.",
    technologies: ["HTML", "CSS", "JavaScript", "UI inmobiliaria", "CTA WhatsApp", "Panel admin"],
    link: "https://www.elementoinmobiliario.com.co/",
    image: "assets/projects/elemento-inmobiliario.png",
    motion: "assets/projects/elemento-inmobiliario-full.svg",
    previewDuration: 42,
    accent: "#c7d2a7",
    glow: "rgba(199, 210, 167, 0.18)",
  },
  {
    title: "GLOBAL REACH",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Procesos migratorios con claridad",
    description:
      "Sitio web corporativo bilingüe para servicios migratorios en Estados Unidos, con evaluación de perfil, agenda de citas, servicios y testimonios.",
    detail:
      "El sitio organiza más de 18 años de experiencia en una narrativa clara: naturalización, petición familiar, ajuste de estatus, asilo, permisos de trabajo y procesos consulares. El flujo incluye formularios, WhatsApp, backend y panel administrativo para revisar solicitudes y datos de contacto.",
    technologies: ["HTML", "CSS", "JavaScript", "UI bilingüe", "Formularios de leads", "Panel admin"],
    link: "https://globalreach-usa.com/",
    image: "assets/projects/global-reach.png",
    motion: "assets/projects/global-reach-full.svg",
    previewDuration: 34,
    accent: "#9bb7c8",
    glow: "rgba(155, 183, 200, 0.17)",
  },
  {
    title: "SOUNDGEAR",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Soluciones de sonido profesional",
    description:
      "Sitio web para una marca de audio profesional enfocada en diseñar experiencias sonoras para restaurantes, iglesias, discotecas, auditorios y espacios educativos.",
    detail:
      "El sitio comunica servicios de instalación, asesoría y diseño acústico con una estética tecnológica y premium. Integra llamados a analizar el espacio, navegación por tipos de clientes, contacto directo, backend y panel administrativo para gestionar solicitudes.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "UI de servicios", "Formularios de leads", "Panel admin"],
    link: "https://soundgearaudio.com/",
    image: "assets/projects/soundgear.png",
    motion: "assets/projects/soundgear-full.svg",
    previewDuration: 32,
    accent: "#e4d1b5",
    glow: "rgba(228, 209, 181, 0.17)",
  },
  {
    title: "OUTDOOR LIGHTING",
    type: "Sitio web",
    filters: ["websites"],
    tagline: "Iluminación exterior profesional",
    description:
      "Sitio web para una empresa de iluminación exterior profesional, con servicios, beneficios, galería visual y solicitud de cotización.",
    detail:
      "La página vende una experiencia visual fuerte: patios, fachadas y espacios comerciales iluminados con diseño profesional. Integra formularios de quote/contacto, llamados claros, backend y panel admin para revisar solicitudes enviadas por clientes potenciales.",
    technologies: ["HTML", "CSS", "JavaScript", "Galería visual", "Formulario de cotización", "Panel admin"],
    link: "https://outdoorlighting-fl.com/",
    image: "assets/projects/outdoor-lighting.png",
    motion: "assets/projects/outdoor-lighting-services-full.svg",
    previewDuration: 68,
    accent: "#f2f2ef",
    glow: "rgba(242, 242, 239, 0.16)",
  },
];

const projectFilters = [
  { label: "SaaS", value: "saas" },
  { label: "Sitios web", value: "websites" },
  { label: "UI/UX", value: "uiux" },
  { label: "Académicos", value: "academic" },
];

function initProjectCarousel() {
  if (!projectCarousel || !projects.length) return;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = hasGsap && typeof window.ScrollTrigger !== "undefined";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wrapIndex = hasGsap
    ? gsap.utils.wrap(0, projects.length)
    : index => ((index % projects.length) + projects.length) % projects.length;

  const els = {
    index: projectCarousel.querySelector("[data-project-index]"),
    type: projectCarousel.querySelector("[data-project-type]"),
    title: projectCarousel.querySelector("[data-project-title]"),
    description: projectCarousel.querySelector("[data-project-description]"),
    detail: projectCarousel.querySelector("[data-project-detail]"),
    tech: projectCarousel.querySelector("[data-project-tech]"),
    tagline: projectCarousel.querySelector("[data-project-tagline]"),
    image: projectCarousel.querySelector("[data-project-image]"),
    motionPreview: projectCarousel.querySelector("[data-project-motion-preview]"),
    motionTrack: projectCarousel.querySelector("[data-project-motion-track]"),
    motionShots: projectCarousel.querySelectorAll("[data-project-motion-shot]"),
    frame: projectCarousel.querySelector("[data-project-frame]"),
    liveWindow: projectCarousel.querySelector("[data-project-live-window]"),
    link: projectCarousel.querySelector("[data-project-link]"),
    liveLink: projectCarousel.querySelector("[data-project-live-link]"),
    liveDomain: projectCarousel.querySelector("[data-project-live-domain]"),
    highlights: projectCarousel.querySelector("[data-project-highlights]"),
    mainCard: projectCarousel.querySelector("[data-main-card]"),
    dots: projectCarousel.querySelector("[data-project-dots]"),
    filters: projectCarousel.querySelector("[data-project-filters]"),
    projectList: projectCarousel.querySelector("[data-project-list]"),
    prev: projectCarousel.querySelector("[data-project-prev]"),
    next: projectCarousel.querySelector("[data-project-next]"),
    panelButtons: projectCarousel.querySelectorAll("[data-panel-target]"),
    panels: projectCarousel.querySelectorAll("[data-project-panel]"),
    sideLabel: document.querySelector("#proyectos .side-text span"),
  };

  const animatedText = [
    els.index,
    els.type,
    els.title,
    els.description,
    els.detail,
    els.tech,
    els.tagline,
    els.link,
    els.liveLink,
    els.highlights,
  ].filter(Boolean);

  const animatedCards = [els.mainCard].filter(Boolean);

  let activeIndex = 0;
  let activeFilter = "saas";
  let visibleIndexes = getVisibleIndexes(activeFilter);
  let activePanel = "projects";
  let isAnimating = false;
  let isSwitchingPanel = false;
  let isPaused = false;
  let autoPlay;

  function projectNumber(index) {
    return String(index + 1).padStart(2, "0");
  }

  function getVisibleIndexes(filter = activeFilter) {
    return projects
      .map((project, index) => (project.filters.includes(filter) ? index : null))
      .filter(index => index !== null);
  }

  function getVisiblePosition(index = activeIndex) {
    const position = visibleIndexes.indexOf(index);
    return position === -1 ? 0 : position;
  }

  function isExternalLink(link) {
    return /^https?:\/\//.test(link);
  }

  function getLinkDomain(link) {
    if (!isExternalLink(link)) return "Disponible pronto";

    try {
      return new URL(link).hostname.replace(/^www\./, "");
    } catch {
      return "Ver sitio";
    }
  }

  function setLink(anchor, project) {
    if (!anchor) return;

    const external = isExternalLink(project.link);
    anchor.href = project.link;
    anchor.target = external ? "_blank" : "";
    anchor.rel = external ? "noopener noreferrer" : "";
  }

  function getProjectHighlights(project) {
    const highlightsByProject = {
      "GOMETRICAL": [
        { icon: "↗", label: "2 fuentes", detail: "Meta y Google Ads reunidos" },
        { icon: "◫", label: "Pago real", detail: "Checkout firmado con Wompi" },
        { icon: "◎", label: "Decisión", detail: "Costos y retorno en contexto" },
      ],
      "SYNQBEE CRM": [
        { icon: "↗", label: "25K+ / mes", detail: "Leads procesados" },
        { icon: "⌁", label: "−78%", detail: "Tiempo de primera respuesta" },
        { icon: "◇", label: "+19%", detail: "Mejora promedio de cierre" },
      ],
      "NOVANK": [
        { icon: "◫", label: "15 vistas", detail: "Flujo bancario completo" },
        { icon: "↔", label: "Prototipo", detail: "Navegable antes de desarrollar" },
        { icon: "◎", label: "QA", detail: "Estados y confirmaciones reales" },
      ],
      "DIVIX WEBINAR": [
        { icon: "↗", label: "Registro", detail: "Inscripción orientada a conversión" },
        { icon: "◫", label: "Agenda", detail: "Contenido y expertos ordenados" },
        { icon: "⌁", label: "Operación", detail: "Registros visibles en admin" },
      ],
      "DELICIAS BENDITAS": [
        { icon: "◇", label: "3 líneas", detail: "Congelados, listos y horneados" },
        { icon: "↗", label: "Carrito", detail: "Compra y cuenta conectadas" },
        { icon: "◎", label: "Recorrido", detail: "Marca, producto y preparación" },
      ],
      "DEL VINILO AL ALGORITMO": [
        { icon: "◇", label: "4 eras", detail: "Vinilo, cassette, CD y streaming" },
        { icon: "↗", label: "Museo 3D", detail: "Exploración con movimiento y acciones" },
        { icon: "◎", label: "Inmersión", detail: "Scroll, narrativa, sonido e interacción" },
      ],
      "ELEMENTO INMOBILIARIO": [
        { icon: "⌂", label: "Inventario", detail: "Propiedades con contexto" },
        { icon: "↗", label: "100/100", detail: "SEO técnico en PageSpeed" },
        { icon: "⌁", label: "Lead", detail: "WhatsApp y formulario conectados" },
      ],
      "GLOBAL REACH": [
        { icon: "↔", label: "2 idiomas", detail: "Arquitectura ES / EN" },
        { icon: "◫", label: "6 rutas", detail: "Servicios migratorios claros" },
        { icon: "↗", label: "13K+", detail: "Casos comunicados" },
      ],
      "SOUNDGEAR": [
        { icon: "≈", label: "Audio", detail: "Servicios explicados por espacio" },
        { icon: "◇", label: "Sistema", detail: "Identidad visual consistente" },
        { icon: "↗", label: "Contacto", detail: "Solicitud directa y medible" },
      ],
      "OUTDOOR LIGHTING": [
        { icon: "✦", label: "Galería", detail: "La luz como argumento" },
        { icon: "⌂", label: "2 públicos", detail: "Residencial y comercial" },
        { icon: "↗", label: "Quote", detail: "Cotización sin fricción" },
      ],
    };

    if (highlightsByProject[project.title]) return highlightsByProject[project.title];

    if (project.filters.includes("saas")) {
      return [
        { label: "Panel", detail: "Producto visual y datos" },
        { label: "Módulos", detail: "Componentes reutilizables" },
        { label: "Admin", detail: "Control de operación" },
      ];
    }

    if (project.filters.includes("uiux")) {
      return [
        { label: "Prototipo", detail: "Navegable en Figma" },
        { label: "Flujos", detail: "15 pantallas reales" },
        { label: "QA", detail: "Hotspots y estados" },
      ];
    }

    return [
      { label: "Sitio", detail: "Vista pública completa" },
      { label: "Leads", detail: "Formularios y registros" },
      { label: "Admin", detail: "Panel de gestión" },
    ];
  }

  function renderProjectHighlights(project) {
    if (!els.highlights) return;

    const iconSvg = item => {
      const text = `${item.label} ${item.detail}`.toLowerCase();
      const svg = path => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

      if (/fuentes|idiomas|api|conect/.test(text)) return svg('<path d="M8 7h-2a4 4 0 0 0 0 8h2"/><path d="M16 7h2a4 4 0 0 1 0 8h-2"/><path d="M8 12h8"/>');
      if (/pago|wompi|quote|cotiza/.test(text)) return svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>');
      if (/respuesta|tiempo/.test(text)) return svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>');
      if (/25k|leads|registro|lead/.test(text)) return svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>');
      if (/19%|100\/100|mejora|seo|retorno/.test(text)) return svg('<path d="M3 17l6-6 4 4 8-9"/><path d="M15 6h6v6"/>');
      if (/vistas|catálogo|galería|inventario/.test(text)) return svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>');
      if (/decisión|qa|operación|admin/.test(text)) return svg('<circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/>');
      return svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>');
    };

    els.highlights.innerHTML = getProjectHighlights(project)
      .map(item => `<div class="project-highlight"><i>${iconSvg(item)}</i><span>${item.label}</span><small>${item.detail}</small></div>`)
      .join("");
  }

  const technologyIcons = {
    "HTML": "html5",
    "CSS": "css",
    "JavaScript": "javascript",
    "PHP": "php",
    "MySQL": "mysql",
    "Figma": "figma",
    "WordPress": "wordpress",
    "WooCommerce": "woocommerce",
    "Meta Ads API": "meta",
    "Google Ads API": "googleads",
    "GTM": "googletagmanager",
  };

  const coreTechnologies = new Set([
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "MySQL",
    "Figma",
    "WordPress",
    "WooCommerce",
  ]);

  function renderTechnology(technology) {
    const icon = technologyIcons[technology];
    const image = icon
      ? `<img src="https://cdn.simpleicons.org/${icon}/111111" alt="" loading="lazy" aria-hidden="true">`
      : "";

    return `<span class="${icon ? "has-tech-icon" : ""}">${image}<b>${technology}</b></span>`;
  }

  function renderTechnologyGroups(technologies) {
    const core = technologies.filter(technology => coreTechnologies.has(technology));
    const capabilities = technologies.filter(technology => !coreTechnologies.has(technology));
    const group = (label, className, items) => items.length
      ? `<div class="project-tech-group ${className}"><small>${label}</small><div>${items.map(renderTechnology).join("")}</div></div>`
      : "";

    return [
      group("Lenguajes y base", "is-core", core),
      group("Integraciones y características", "is-capability", capabilities),
    ].join("");
  }

  function updateDots() {
    if (!els.dots) return;

    [...els.dots.children].forEach((dot, index) => {
      const isActive = Number(dot.dataset.projectIndex) === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function updateProjectList() {
    if (!els.projectList) return;

    [...els.projectList.children].forEach(chip => {
      const projectIndex = Number(chip.dataset.projectChipIndex);
      const isVisible = visibleIndexes.includes(projectIndex);
      const isActive = projectIndex === activeIndex;

      chip.hidden = !isVisible;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateFilters() {
    if (!els.filters) return;

    [...els.filters.children].forEach(button => {
      const isActive = button.dataset.projectFilter === activeFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderProject(index) {
    activeIndex = wrapIndex(index);

    const project = projects[activeIndex];
    const visiblePosition = getVisiblePosition(activeIndex);
    const hasMotionPreview = Boolean(project.motion || project.motionFrames?.length);
    const hasLivePreview = hasMotionPreview || isExternalLink(project.link);

    projectCarousel.dataset.projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    projectCarousel.style.setProperty("--project-accent", project.accent);
    projectCarousel.style.setProperty("--project-glow", project.glow);
    projectCarousel.style.setProperty("--preview-duration", `${project.previewDuration || 18}s`);
    const previewStartOffset =
      typeof project.previewStartOffset === "number"
        ? `${project.previewStartOffset}px`
        : project.previewStartOffset || "0px";

    projectCarousel.style.setProperty("--preview-start-offset", previewStartOffset);
    projectCarousel.style.setProperty("--preview-travel", project.previewTravel || "-50%");
    projectCarousel.style.setProperty("--preview-iterations", project.previewLoop === false ? "1" : "infinite");
    projectCarousel.classList.toggle("has-project-screenshot", project.image.startsWith("assets/projects/"));
    projectCarousel.classList.toggle("has-live-preview", hasLivePreview);
    projectCarousel.classList.toggle("has-motion-preview", hasMotionPreview);

    els.index.textContent = projectNumber(visiblePosition);
    els.type.textContent = project.type;
    els.title.textContent = project.title;
    els.description.textContent = project.description;
    els.detail.textContent = project.detail;
    els.tagline.textContent = project.tagline;
    setLink(els.liveLink, project);
    els.link.href = "#contacto";
    els.link.target = "";
    els.link.rel = "";
    els.link.textContent = "Hablemos";
    if (els.liveDomain) els.liveDomain.textContent = getLinkDomain(project.link);
    els.image.style.backgroundImage = `url("${project.image}")`;
    if (els.motionTrack) {
      const baseFrames = project.motionFrames?.length
        ? project.motionFrames
        : project.motion
          ? [project.motion]
          : [];
      const previewFrames = project.previewLoop === false ? baseFrames : [...baseFrames, ...baseFrames];

      els.motionTrack.innerHTML = previewFrames
        .map(source => `<img class="project-motion-shot" src="${source}" alt="" loading="eager">`)
        .join("");
    }
    if (els.motionTrack && hasMotionPreview) {
      els.motionTrack.style.animation = "none";
      void els.motionTrack.offsetHeight;
      els.motionTrack.style.animation = "";
    }
    if (els.liveWindow && els.frame) {
      els.liveWindow.hidden = !hasLivePreview;
      els.liveWindow.classList.toggle("is-motion-preview", hasMotionPreview);
      els.liveWindow.classList.toggle("is-live-frame", hasLivePreview && !hasMotionPreview);

      if (!hasMotionPreview && hasLivePreview && els.frame.getAttribute("src") !== project.link) {
        els.frame.src = project.link;
        els.frame.title = `Vista en vivo de ${project.title}`;
      }

      if (!hasLivePreview || hasMotionPreview) {
        els.frame.removeAttribute("src");
      }
    }
    els.tech.innerHTML = renderTechnologyGroups(project.technologies);
    renderProjectHighlights(project);

    updateDots();
    updateProjectList();
  }

  function stopAutoPlay() {
    if (autoPlay) {
      autoPlay.kill();
      autoPlay = null;
    }
  }

  function scheduleAutoPlay() {
    stopAutoPlay();

    if (
      !hasGsap ||
      isPaused ||
      activePanel !== "projects" ||
      visibleIndexes.length < 2 ||
      prefersReducedMotion.matches
    ) return;

    const activeProject = projects[activeIndex];
    const hasActiveMotion = Boolean(activeProject?.motion || activeProject?.motionFrames?.length);
    const delay = hasActiveMotion ? (activeProject.previewDuration || 18) + 1.4 : 5.2;

    autoPlay = gsap.delayedCall(delay, () => {
      const currentPosition = getVisiblePosition(activeIndex);
      const nextPosition = (currentPosition + 1) % visibleIndexes.length;
      changeProject(visibleIndexes[nextPosition], 1);
    });
  }

  function setActivePanelButton(target) {
    els.panelButtons.forEach(button => {
      const isActive = button.dataset.panelTarget === target;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function getPanel(name) {
    return [...els.panels].find(panel => panel.dataset.projectPanel === name);
  }

  function switchPanel(target) {
    if (!target || target === activePanel || isSwitchingPanel) return;

    const currentPanel = getPanel(activePanel);
    const nextPanel = getPanel(target);

    if (!currentPanel || !nextPanel) return;

    const goingToAbout = target === "about";
    activePanel = target;
    isSwitchingPanel = true;
    setActivePanelButton(target);

    if (els.sideLabel) {
      els.sideLabel.textContent = goingToAbout ? "Perfil" : "Proyectos";
    }

    if (goingToAbout) {
      isPaused = true;
      stopAutoPlay();
    }

    if (!hasGsap || prefersReducedMotion.matches) {
      currentPanel.hidden = true;
      nextPanel.hidden = false;
      isSwitchingPanel = false;

      if (!goingToAbout) {
        isPaused = false;
        scheduleAutoPlay();
      }

      return;
    }

    gsap.killTweensOf([currentPanel, nextPanel]);

    const direction = goingToAbout ? 1 : -1;

    gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        currentPanel.hidden = true;
        gsap.set(currentPanel, { clearProps: "all" });
        gsap.set(nextPanel, { clearProps: "all" });
        isSwitchingPanel = false;

        if (!goingToAbout) {
          isPaused = false;
          scheduleAutoPlay();
        }
      },
    })
      .to(currentPanel, {
        autoAlpha: 0,
        y: -28 * direction,
        duration: 0.34,
      })
      .add(() => {
        currentPanel.hidden = true;
        nextPanel.hidden = false;
        gsap.set(nextPanel, {
          autoAlpha: 0,
          y: 32 * direction,
        });
      })
      .to(nextPanel, {
        autoAlpha: 1,
        y: 0,
        duration: 0.56,
      });
  }

  function changeProject(nextIndex, direction = 1) {
    const targetIndex = wrapIndex(nextIndex);

    if (targetIndex === activeIndex || isAnimating) return;

    stopAutoPlay();

    if (!hasGsap || prefersReducedMotion.matches) {
      renderProject(targetIndex);
      scheduleAutoPlay();
      return;
    }

    isAnimating = true;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        isAnimating = false;
        scheduleAutoPlay();
      },
    });

    tl.to(animatedText, {
      autoAlpha: 0,
      y: 22 * direction,
      duration: 0.28,
      stagger: 0.025,
    })
      .to(
        els.mainCard,
        {
          autoAlpha: 0.24,
          y: -16,
          scale: 0.985,
          duration: 0.34,
        },
        0
      )
      .add(() => renderProject(targetIndex))
      .fromTo(
        els.mainCard,
        { autoAlpha: 0, y: 22, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.58 },
        ">-0.02"
      )
      .fromTo(
        animatedText,
        { autoAlpha: 0, y: -22 * direction },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.035,
        },
        "<0.08"
      );
  }

  function createDots() {
    if (!els.dots) return;

    els.dots.innerHTML = "";

    visibleIndexes.forEach(projectIndex => {
      const project = projects[projectIndex];
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "project-dot";
      dot.dataset.projectIndex = String(projectIndex);
      dot.setAttribute("aria-label", `Ir al proyecto ${project.title}`);
      dot.addEventListener("click", () => {
        const direction = visibleIndexes.indexOf(projectIndex) > getVisiblePosition(activeIndex) ? 1 : -1;
        changeProject(projectIndex, direction);
      });
      els.dots.appendChild(dot);
    });
  }

  function createFilterControls() {
    if (!els.filters) return;

    els.filters.innerHTML = "";

    projectFilters.forEach(filter => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "project-filter";
      button.dataset.projectFilter = filter.value;
      button.setAttribute("aria-pressed", filter.value === activeFilter ? "true" : "false");
      button.textContent = filter.label;
      button.addEventListener("click", () => applyFilter(filter.value));
      els.filters.appendChild(button);
    });
  }

  function createProjectList() {
    if (!els.projectList) return;

    els.projectList.innerHTML = "";

    projects.forEach((project, index) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "project-name-chip";
      chip.dataset.projectChipIndex = String(index);
      chip.setAttribute("aria-pressed", "false");
      chip.setAttribute("aria-label", `Abrir proyecto: ${project.title}`);
      chip.textContent = project.title;
      chip.addEventListener("click", () => {
        const direction = visibleIndexes.indexOf(index) > getVisiblePosition(activeIndex) ? 1 : -1;
        changeProject(index, direction);
      });
      els.projectList.appendChild(chip);
    });
  }

  function applyFilter(filter) {
    if (filter === activeFilter || isAnimating || isSwitchingPanel) return;

    activeFilter = filter;
    visibleIndexes = getVisibleIndexes(filter);

    if (!visibleIndexes.length) {
      visibleIndexes = getVisibleIndexes("saas");
      activeFilter = "saas";
    }

    const nextIndex = visibleIndexes.includes(activeIndex) ? activeIndex : visibleIndexes[0];

    createDots();
    updateFilters();

    if (nextIndex === activeIndex) {
      renderProject(activeIndex);
      scheduleAutoPlay();
      return;
    }

    changeProject(nextIndex, 1);
  }

  function bindControls() {
    els.prev.addEventListener("click", () => {
      const currentPosition = getVisiblePosition(activeIndex);
      const previousPosition = (currentPosition - 1 + visibleIndexes.length) % visibleIndexes.length;
      changeProject(visibleIndexes[previousPosition], -1);
    });

    els.next.addEventListener("click", () => {
      const currentPosition = getVisiblePosition(activeIndex);
      const nextPosition = (currentPosition + 1) % visibleIndexes.length;
      changeProject(visibleIndexes[nextPosition], 1);
    });

    els.panelButtons.forEach(button => {
      button.addEventListener("click", () => switchPanel(button.dataset.panelTarget));
    });

    projectCarousel.addEventListener("mouseenter", () => {
      isPaused = true;
      stopAutoPlay();
    });

    projectCarousel.addEventListener("mouseleave", () => {
      isPaused = false;
      scheduleAutoPlay();
    });

    projectCarousel.addEventListener("focusin", () => {
      isPaused = true;
      stopAutoPlay();
    });

    projectCarousel.addEventListener("focusout", () => {
      isPaused = false;
      scheduleAutoPlay();
    });
  }

  function initGsap() {
    if (!hasGsap) return;

    if (hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 761px)",
        isMobile: "(max-width: 760px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      context => {
        const { isDesktop, reduceMotion } = context.conditions;

        if (reduceMotion) return;

        gsap.set(animatedCards, {
          transformOrigin: "center center",
        });

        gsap.fromTo(
          animatedCards,
          {
            autoAlpha: 0,
            y: isDesktop ? 54 : 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: hasScrollTrigger
              ? {
                  trigger: projectCarousel,
                  start: "top 72%",
                  once: true,
                }
              : undefined,
          }
        );

        gsap.fromTo(
          animatedText,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.045,
            ease: "power3.out",
            scrollTrigger: hasScrollTrigger
              ? {
                  trigger: projectCarousel,
                  start: "top 72%",
                  once: true,
                }
              : undefined,
          }
        );
      }
    );

    if (hasScrollTrigger) {
      ScrollTrigger.create({
        trigger: projectCarousel,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          isPaused = false;
          scheduleAutoPlay();
        },
        onEnterBack: () => {
          isPaused = false;
          scheduleAutoPlay();
        },
        onLeave: () => {
          isPaused = true;
          stopAutoPlay();
        },
        onLeaveBack: () => {
          isPaused = true;
          stopAutoPlay();
        },
      });
    }
  }

  createFilterControls();
  createProjectList();
  createDots();
  updateFilters();
  renderProject(0);
  bindControls();
  initGsap();
  scheduleAutoPlay();

}

initProjectCarousel();
