export interface Certificate {
  institution: string;
  logo: string;
  title: string;
  date: string;
  image?: string; // imagem do certificado (quando existe, vira clicável)
}

export const certificates: Certificate[] = [
  { institution: 'Harvard', logo: 'images/harvard.png', title: 'CS50: Introduction to Computer Science', date: '2024 – 2025', image: 'images/certificado_harvard.png' },
  { institution: 'TripleTen', logo: 'images/tripleten.png', title: 'Bootcamp em Ciência de Dados (1 ano)', date: '2024 – 2025', image: 'images/certificado_tripleten.png' },
  { institution: 'Asimov Academy', logo: 'images/asimov.png', title: 'Visão Computacional com OpenCV', date: '2025', image: 'images/certificado_asimov_visao.png' },
  { institution: 'TripleTen', logo: 'images/tripleten.png', title: 'Machine Learning', date: '2025' },
];
