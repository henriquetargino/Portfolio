export interface Article {
  cover: string;
  pub: string;
  title: string;
  excerpt: string;
  pubEn?: string;     // publicação traduzida (EN) — opcional
  excerptEn?: string; // resumo traduzido (EN) — opcional
  href: string;
}

export const articles: Article[] = [
  {
    cover: 'images/ai_soccer_heatmap.png',
    pub: 'Medium · 13 min de leitura · 2026',
    pubEn: 'Medium · 13 min read · 2026',
    title: "I trained an AI to play football for a billion steps. Here's what broke.",
    excerpt:
      'Um postmortem de 3 meses construindo uma IA de futebol 1v1 com PPO: os modos de falha silenciosos, as dezenas de runs fracassados e o que finalmente funcionou.',
    excerptEn:
      'A 3-month postmortem of building a 1v1 football AI with PPO: the silent failure modes, the dozens of failed runs, and what finally worked.',
    href: 'https://medium.com/@henriquetarginoalbuquerque/i-trained-an-ai-to-play-football-for-a-billion-steps-heres-what-broke-742328956196',
  },
];
