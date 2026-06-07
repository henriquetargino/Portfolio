export type Area = 'ml' | 'cv' | 'agents' | 'data';

export interface Tool {
  name: string;
  symbol: string;
  area: Area;
}

export const tools: Tool[] = [
  { name: 'Python', symbol: 'Py', area: 'ml' },
  { name: 'PyTorch', symbol: 'Pt', area: 'ml' },
  { name: 'scikit-learn', symbol: 'Sk', area: 'ml' },
  { name: 'TensorFlow', symbol: 'Tf', area: 'ml' },
  { name: 'Keras', symbol: 'Ke', area: 'ml' },
  { name: 'PPO', symbol: 'Pp', area: 'ml' },
  { name: 'Gymnasium', symbol: 'Gy', area: 'ml' },
  { name: 'OpenCV', symbol: 'Cv', area: 'cv' },
  { name: 'MediaPipe', symbol: 'Mp', area: 'cv' },
  { name: 'YOLO', symbol: 'Yo', area: 'cv' },
  { name: 'LLMs', symbol: 'Lm', area: 'agents' },
  { name: 'RAG', symbol: 'Rg', area: 'agents' },
  { name: 'Vector Search', symbol: 'Vs', area: 'agents' },
  { name: 'LangChain', symbol: 'Lc', area: 'agents' },
  { name: 'LangGraph', symbol: 'Lg', area: 'agents' },
  { name: 'Pydantic AI', symbol: 'Pa', area: 'agents' },
  { name: 'n8n', symbol: 'N8', area: 'agents' },
  { name: 'NumPy', symbol: 'Np', area: 'data' },
  { name: 'Pandas', symbol: 'Pd', area: 'data' },
  { name: 'Matplotlib', symbol: 'Ml', area: 'data' },
  { name: 'Plotly', symbol: 'Pl', area: 'data' },
  { name: 'Streamlit', symbol: 'St', area: 'data' },
];

export const areaColor: Record<Area, string> = {
  ml: 'var(--hl-ml)',
  cv: 'var(--hl-cv)',
  agents: 'var(--hl-agent)',
  data: 'var(--hl-data)',
};

export const areaLabel: Record<Area, { en: string; pt: string }> = {
  ml: { en: 'ML & Neural Nets', pt: 'ML & Redes Neurais' },
  cv: { en: 'Computer Vision', pt: 'Visão Computacional' },
  agents: { en: 'AI Agents', pt: 'Agentes de IA' },
  data: { en: 'Data & Viz', pt: 'Dados & Viz' },
};
