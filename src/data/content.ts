import imgGestaoEmpresarial from '../assets/images/service_gestao_empresarial_1795598480115.jpg';
import imgOrientacaoFinanceira from '../assets/images/service_orientacao_financeira_1795598479724.jpg';
import imgConsultoriaEmpresarial from '../assets/images/service_consultoria_empresarial_1795598481736.jpg';
import imgFormacaoProfissional from '../assets/images/service_formacao_profissional_1795598481415.jpg';
import imgPalestrasEventos from '../assets/images/service_palestras_eventos_1795598481377.jpg';

/**
 * Conteúdo editável do website de Eliana Quintas.
 */

export interface HeroStatement {
  index: string;
  statement: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
}

export type ExperienceCategory = 'Todas' | 'Formação' | 'Consultoria' | 'Palestras';

export interface ExperienceItem {
  id: string;
  category: Exclude<ExperienceCategory, 'Todas'>;
  title: string;
  formatLabel: string;
  placeholderCaption: string;
}

export const SITE_BRAND = {
  displayName: 'Eliana Quintas',
  fullName: 'Eliana Quintas',
  roleSummary: 'Gestora de Empresas · Formadora · Consultora · Palestrante',
  instagramHandle: '@elianaquintas_14',
  instagramUrl: 'https://www.instagram.com/elianaquintas_14/',
  heroPortraitPath: '/assets/aistudio/file_00000000c90c81f48e2abf6e6b0ddf43_35374c53.png',
};

export const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#consultoria', label: 'Consultoria' },
  { href: '#contactos', label: 'Contactos' },
] as const;

export const HERO_CONTENT = {
  headlineWhiteLine1: 'Conhecimento',
  headlineWhiteLine2: 'que orienta.',
  headlineGoldLine1: 'Estratégia',
  headlineGoldLine2: 'que desenvolve.',
  introLine: 'Trabalhamos com empresas para desenvolver uma gestão mais eficiente.',
  primaryCta: 'Solicitar uma consultoria',
  secondaryCta: 'Conhecer os meus serviços',
  scrollCue: 'Descubra mais',
  statements: [
    {
      index: '01',
      statement: 'Orientamos empresas na gestão financeira e na tomada de decisões.',
    },
    {
      index: '02',
      statement: 'Desenvolvemos competências através de consultoria e formação profissional.',
    },
  ] satisfies HeroStatement[],
};

export const ABOUT_CONTENT = {
  kicker: 'Sobre',
  headline: 'Direção prática para empresas que querem trabalhar, atender e crescer melhor.',
  emphasisQuote: 'Melhorar como a empresa trabalha, atende e cresce.',
  paragraphs: [
    'Eliana Quintas acompanha empresas e lideranças na organização da gestão interna, na qualidade do atendimento ao cliente e na estruturação de decisões mais seguras.',
    'O trabalho integra consultoria, orientação financeira e formação prática de equipas, sempre ajustado à realidade concreta de cada negócio.',
  ],
  pillars: [
    { title: 'Gestão', detail: 'Rotinas e prioridades claras' },
    { title: 'Atendimento', detail: 'Experiência alinhada à marca' },
    { title: 'Decisão', detail: 'Leitura consciente do negócio' },
  ],
};

export const SERVICES_CONTENT = {
  kicker: 'Áreas de Atuação',
  headline: 'Serviços para a gestão e o crescimento empresarial.',
  emphasisSummary: 'Cinco frentes estruturadas para organizar processos, finanças e equipas.',
  items: [
    {
      id: 'gestao-empresarial',
      number: '01.',
      title: 'Gestão Empresarial',
      summary: 'Organização de processos, prioridades e rotinas de trabalho para maior consistência operacional.',
      detail: 'Foco: estrutura interna e acompanhamento de equipas.',
      image: imgGestaoEmpresarial,
      imageAlt: 'Sala executiva contemporânea preparada para reuniões de gestão empresarial.',
    },
    {
      id: 'orientacao-financeira',
      number: '02.',
      title: 'Orientação Financeira para Empresas',
      summary: 'Apoio na leitura dos números do negócio, controlo de custos e planeamento de tesouraria.',
      detail: 'Foco: clareza financeira para decisões mais seguras.',
      image: imgOrientacaoFinanceira,
      imageAlt: 'Secretária executiva em madeira escura com bloco financeiro e caneta.',
    },
    {
      id: 'consultoria-empresarial',
      number: '03.',
      title: 'Consultoria Empresarial',
      summary: 'Diagnóstico próximo da empresa e plano de ação prático entre gestão, equipa e clientes.',
      detail: 'Foco: diagnóstico operacional e plano de melhorias.',
      image: imgConsultoriaEmpresarial,
      imageAlt: 'Espaço reservado de consultoria empresarial com poltronas claras e orquídeas.',
    },
    {
      id: 'formacao-profissional',
      number: '04.',
      title: 'Formação Profissional',
      summary: 'Capacitação prática de equipas em atendimento ao cliente, postura profissional e produtividade.',
      detail: 'Foco: programas presenciais ajustados à realidade da empresa.',
      image: imgFormacaoProfissional,
      imageAlt: 'Sala de formação corporativa organizada com mesas e cadernos de trabalho.',
    },
    {
      id: 'palestras-eventos',
      number: '05.',
      title: 'Palestras e Eventos',
      summary: 'Intervenções em conferências e encontros corporativos sobre gestão, liderança e atendimento.',
      detail: 'Foco: palestras e painéis em eventos institucionais.',
      image: imgPalestrasEventos,
      imageAlt: 'Auditório moderno iluminado com púlpito em madeira e latão.',
    },
  ] satisfies ServiceItem[],
};

export const EXPERIENCE_CONTENT = {
  kicker: 'Experiência Profissional',
  headline: 'Registos de formações, consultoria e eventos.',
  subtitle: 'Espaços reservados para fotografias reais das atividades realizadas.',
  emphasisModes: ['Formação Presencial', 'Consultoria Executiva', 'Palestras e Eventos'],
  categories: ['Todas', 'Formação', 'Consultoria', 'Palestras'] as ExperienceCategory[],
  items: [
    {
      id: 'exp-formacao-equipas',
      category: 'Formação',
      title: 'Formação com Equipas',
      formatLabel: 'Formação · Presencial',
      placeholderCaption: 'Espaço para fotografia real de formação',
    },
    {
      id: 'exp-palestras-eventos',
      category: 'Palestras',
      title: 'Palestras Corporativas',
      formatLabel: 'Palestras · Eventos',
      placeholderCaption: 'Espaço para fotografia real em evento',
    },
    {
      id: 'exp-consultoria-reuniao',
      category: 'Consultoria',
      title: 'Sessões de Consultoria',
      formatLabel: 'Consultoria · Liderança',
      placeholderCaption: 'Espaço para fotografia real de consultoria',
    },
    {
      id: 'exp-workshop-atendimento',
      category: 'Formação',
      title: 'Workshops de Atendimento',
      formatLabel: 'Formação · Clientes e Marca',
      placeholderCaption: 'Espaço para fotografia real de workshop',
    },
  ] satisfies ExperienceItem[],
};

export const CONSULTATION_CONTENT = {
  kicker: 'Solicitar Consultoria',
  headline: 'Agende uma primeira conversa.',
  description: 'Escolha a data, preencha os dados e envie o resumo diretamente por WhatsApp.',
  steps: ['01. Escolha o serviço', '02. Selecione a data', '03. Envie por WhatsApp'],
  demoNotice: 'Os dados preenchidos geram um resumo pronto para envio direto no WhatsApp.',
};

export const CONTACT_CONTENT = {
  kicker: 'Contactos',
  headline: 'Fale diretamente connosco.',
  emphasisLine: 'Atendimento a empresas, equipas e eventos corporativos.',
  whatsappDisplay: '+244 923 685 128',
  whatsappDigits: '244923685128',
  whatsappNote: 'Atendimento direto',
  emailDisplay: 'contacto@elianaquintas.com',
  emailNote: 'Email profissional',
  instagramHandle: '@elianaquintas_14',
  instagramUrl: 'https://www.instagram.com/elianaquintas_14/',
  locationLabel: 'Presencial e Online',
};
