export interface Cost {  
  id: number  
  name: string  
  category: string  
  periodicity: string  
  value: number  
  dailyCost: number  
}  
  
export const costs: Cost[] = [  
  {  
    id: 1,  
    name: 'EC2 Instance t3.medium',  
    category: 'Compute',  
    periodicity: 'Por hora',  
    value: 0.0416,  
    dailyCost: 0.9984,  
  },  
  {  
    id: 2,  
    name: 'S3 Bucket - Storage',  
    category: 'Storage',  
    periodicity: 'Mensal',  
    value: 45.00,  
    dailyCost: 1.50,  
  },  
  {  
    id: 3,  
    name: 'RDS PostgreSQL db.t3.small',  
    category: 'Database',  
    periodicity: 'Por hora',  
    value: 0.034,  
    dailyCost: 0.816,  
  },  
  {  
    id: 4,  
    name: 'CloudFront Distribution',  
    category: 'Network',  
    periodicity: 'Mensal',  
    value: 120.00,  
    dailyCost: 4.00,  
  },  
  {  
    id: 5,  
    name: 'Lambda Functions',  
    category: 'Compute',  
    periodicity: 'Mensal',  
    value: 15.50,  
    dailyCost: 0.52,  
  },  
  {  
    id: 6,  
    name: 'EBS Volume 100GB',  
    category: 'Storage',  
    periodicity: 'Mensal',  
    value: 10.00,  
    dailyCost: 0.33,  
  },  
  {  
    id: 7,  
    name: 'VPC NAT Gateway',  
    category: 'Network',  
    periodicity: 'Por hora',  
    value: 0.045,  
    dailyCost: 1.08,  
  },  
  {  
    id: 8,  
    name: 'ElastiCache Redis',  
    category: 'Database',  
    periodicity: 'Por hora',  
    value: 0.068,  
    dailyCost: 1.632,  
  },  
]