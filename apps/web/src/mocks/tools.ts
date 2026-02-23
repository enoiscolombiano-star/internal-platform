export interface Tool {  
  id: number  
  ferramenta: string  
  frequencia: 'Mensal' | 'Trimestral' | 'Anual'  
  valor: number  
  observacao: string  
  custoDiarioCalculado: number  
  custoMensalEstimado: number  
}  
  
export const tools: Tool[] = [  
  {  
    id: 1,  
    ferramenta: 'Meta Business Suite',  
    frequencia: 'Mensal',  
    valor: 0.00,  
    observacao: 'Ferramenta gratuita do Facebook',  
    custoDiarioCalculado: 0.00,  
    custoMensalEstimado: 0.00,  
  },  
  {  
    id: 2,  
    ferramenta: 'Canva Pro',  
    frequencia: 'Mensal',  
    valor: 54.90,  
    observacao: 'Design de criativos',  
    custoDiarioCalculado: 1.83,  
    custoMensalEstimado: 54.90,  
  },  
  {  
    id: 3,  
    ferramenta: 'Notion Team',  
    frequencia: 'Mensal',  
    valor: 80.00,  
    observacao: 'Gestão de projetos e documentação',  
    custoDiarioCalculado: 2.67,  
    custoMensalEstimado: 80.00,  
  },  
  {  
    id: 4,  
    ferramenta: 'Google Workspace',  
    frequencia: 'Mensal',  
    valor: 120.00,  
    observacao: 'E-mail e armazenamento',  
    custoDiarioCalculado: 4.00,  
    custoMensalEstimado: 120.00,  
  },  
  {  
    id: 5,  
    ferramenta: 'Hotmart',  
    frequencia: 'Anual',  
    valor: 1200.00,  
    observacao: 'Plataforma de vendas',  
    custoDiarioCalculado: 3.29,  
    custoMensalEstimado: 100.00,  
  },  
  {  
    id: 6,  
    ferramenta: 'Adobe Creative Cloud',  
    frequencia: 'Mensal',  
    valor: 180.00,  
    observacao: 'Edição de vídeos e imagens',  
    custoDiarioCalculado: 6.00,  
    custoMensalEstimado: 180.00,  
  },  
  {  
    id: 7,  
    ferramenta: 'Typeform Pro',  
    frequencia: 'Trimestral',  
    valor: 210.00,  
    observacao: 'Formulários e pesquisas',  
    custoDiarioCalculado: 2.33,  
    custoMensalEstimado: 70.00,  
  },  
  {  
    id: 8,  
    ferramenta: 'Zapier Professional',  
    frequencia: 'Mensal',  
    valor: 99.00,  
    observacao: 'Automações e integrações',  
    custoDiarioCalculado: 3.30,  
    custoMensalEstimado: 99.00,  
  },  
]