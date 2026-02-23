export interface OperationalRecord {  
  id: number  
  data: string  
  conta: string  
  gastosAnuncio: number  
  imposto: number  
  vendas: number  
  custoFerramentas: number  
  lucroBruto: number  
  lucroLiquido: number  
}  
  
export const operationalRecords: OperationalRecord[] = [  
  {  
    id: 1,  
    data: '2024-02-01',  
    conta: 'Conta Principal',  
    gastosAnuncio: 1500.00,  
    imposto: 225.00,  
    vendas: 4500.00,  
    custoFerramentas: 150.00,  
    lucroBruto: 3000.00,  
    lucroLiquido: 2625.00,  
  },  
  {  
    id: 2,  
    data: '2024-02-02',  
    conta: 'Conta Principal',  
    gastosAnuncio: 1800.00,  
    imposto: 270.00,  
    vendas: 5200.00,  
    custoFerramentas: 150.00,  
    lucroBruto: 3400.00,  
    lucroLiquido: 2980.00,  
  },  
  {  
    id: 3,  
    data: '2024-02-03',  
    conta: 'Conta Secundária',  
    gastosAnuncio: 800.00,  
    imposto: 120.00,  
    vendas: 2400.00,  
    custoFerramentas: 75.00,  
    lucroBruto: 1600.00,  
    lucroLiquido: 1405.00,  
  },  
  {  
    id: 4,  
    data: '2024-02-04',  
    conta: 'Conta Principal',  
    gastosAnuncio: 2000.00,  
    imposto: 300.00,  
    vendas: 6000.00,  
    custoFerramentas: 150.00,  
    lucroBruto: 4000.00,  
    lucroLiquido: 3550.00,  
  },  
  {  
    id: 5,  
    data: '2024-02-05',  
    conta: 'Conta Teste',  
    gastosAnuncio: 500.00,  
    imposto: 75.00,  
    vendas: 1500.00,  
    custoFerramentas: 50.00,  
    lucroBruto: 1000.00,  
    lucroLiquido: 875.00,  
  },  
  {  
    id: 6,  
    data: '2024-02-06',  
    conta: 'Conta Secundária',  
    gastosAnuncio: 1200.00,  
    imposto: 180.00,  
    vendas: 3600.00,  
    custoFerramentas: 75.00,  
    lucroBruto: 2400.00,  
    lucroLiquido: 2145.00,  
  },  
  {  
    id: 7,  
    data: '2024-02-07',  
    conta: 'Conta Principal',  
    gastosAnuncio: 1700.00,  
    imposto: 255.00,  
    vendas: 5100.00,  
    custoFerramentas: 150.00,  
    lucroBruto: 3400.00,  
    lucroLiquido: 2995.00,  
  },  
  {  
    id: 8,  
    data: '2024-02-08',  
    conta: 'Conta Teste',  
    gastosAnuncio: 600.00,  
    imposto: 90.00,  
    vendas: 1800.00,  
    custoFerramentas: 50.00,  
    lucroBruto: 1200.00,  
    lucroLiquido: 1060.00,  
  },  
  {  
    id: 9,  
    data: '2024-02-09',  
    conta: 'Conta Secundária',  
    gastosAnuncio: 900.00,  
    imposto: 135.00,  
    vendas: 2700.00,  
    custoFerramentas: 75.00,  
    lucroBruto: 1800.00,  
    lucroLiquido: 1590.00,  
  },  
  {  
    id: 10,  
    data: '2024-02-10',  
    conta: 'Conta Principal',  
    gastosAnuncio: 2200.00,  
    imposto: 330.00,  
    vendas: 6600.00,  
    custoFerramentas: 150.00,  
    lucroBruto: 4400.00,  
    lucroLiquido: 3920.00,  
  },  
]