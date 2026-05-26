export interface Certificate {
  institution: string;
  logo: string;
  title: string;
  date: string;
  image?: string; // thumbnail PNG (aparece no carrossel da home)
  doc?: string;   // arquivo aberto ao clicar (PDF oficial)
}

// Ordem da grade "ver todos": Harvard, TripleTen, Asimov, Unipê.
// (O carrossel da home reordena pra começar na Asimov — ver Certificates.astro.)
export const certificates: Certificate[] = [
  { institution: 'Harvard', logo: 'images/harvard.png', title: 'CS50: Introduction to Computer Science', date: 'Abril 2024 – Agosto 2025', image: 'images/certificado_harvard.png', doc: 'images/certificado_harvard.pdf' },
  { institution: 'TripleTen', logo: 'images/tripleten.png', title: 'Bootcamp em Ciência de Dados (1 ano)', date: 'Agosto 2024 – Setembro 2025', image: 'images/certificado_tripleten.png', doc: 'images/certificado_tripleten.pdf' },
  { institution: 'Asimov Academy', logo: 'images/asimov.png', title: 'Visão Computacional com OpenCV', date: 'Novembro 2025', image: 'images/certificado_asimov_visao.png', doc: 'images/certificado_asimov_visao.pdf' },
  { institution: 'Unipê', logo: 'images/unipe.png', title: 'Machine Learning', date: 'Janeiro 2025 – Junho 2025', doc: 'images/certificado_unipe.pdf' },
];
