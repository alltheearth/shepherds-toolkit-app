import { AlertTriangle, Book, Briefcase, Heart, Home, MessageSquare, Star, User } from "lucide-react";

  export const messages = [
    {
      id: 1,
      name: 'Maria Santos',
      phone: '+55 21 99999-1234',
      category: 'relacionamentos',
      urgency: 'alta',
      lastMessage: 'Pastor, preciso de oração urgente. Meu casamento está passando por uma crise muito difícil...',
      timestamp: '2 min atrás',
      unread: 3,
      sentiment: 'negativo',
      aiSummary: 'Crise matrimonial, pedido de oração e aconselhamento urgente'
    },
    {
      id: 2,
      name: 'João Silva',
      phone: '+55 21 99999-5678',
      category: 'deus',
      urgency: 'media',
      lastMessage: 'Bom dia pastor! Estou passando por um momento de frieza espiritual e gostaria de conversar...',
      timestamp: '15 min atrás',
      unread: 1,
      sentiment: 'neutro',
      aiSummary: 'Frieza espiritual, busca por direcionamento'
    },
    {
      id: 3,
      name: 'Ana Oliveira',
      phone: '+55 21 99999-9012',
      category: 'biblia',
      urgency: 'baixa',
      lastMessage: 'Pastor, tenho uma dúvida sobre a passagem de Romanos 8:28. Poderia me explicar melhor?',
      timestamp: '1 hora atrás',
      unread: 1,
      sentiment: 'positivo',
      aiSummary: 'Dúvida bíblica específica sobre Romanos 8:28'
    },
    {
      id: 4,
      name: 'Pedro Costa',
      phone: '+55 21 99999-3456',
      category: 'emergencia',
      urgency: 'critica',
      lastMessage: 'Pastor, minha mãe está internada no hospital. Por favor, ore por ela. Situação grave.',
      timestamp: '5 min atrás',
      unread: 2,
      sentiment: 'negativo',
      aiSummary: 'Emergência médica familiar, pedido de oração urgente'
    }
  ];

  export const appointments = [
    {
      id: 1,
      type: 'visita',
      title: 'Visita à família Rodrigues',
      person: 'Carlos Rodrigues',
      address: 'Rua das Flores, 123 - Centro',
      date: '2024-09-19',
      time: '14:00',
      notes: 'Família passando por dificuldades financeiras. Levar cesta básica.',
      priority: 'alta'
    },
    {
      id: 2,
      type: 'aconselhamento',
      title: 'Aconselhamento Matrimonial',
      person: 'Casal Ferreira',
      address: 'Igreja - Sala de Aconselhamento',
      date: '2024-09-20',
      time: '19:30',
      notes: 'Terceira sessão. Progresso positivo na comunicação.',
      priority: 'media'
    },
    {
      id: 3,
      type: 'reuniao',
      title: 'Reunião com Diretoria',
      person: 'Conselho da Igreja',
      address: 'Igreja - Sala de Reuniões',
      date: '2024-09-21',
      time: '10:00',
      notes: 'Discussão sobre projetos de expansão e orçamento anual.',
      priority: 'alta'
    }
  ];

export const categories = [
  { id: 'todos', name: 'Todos', icon: MessageSquare, count: 47, color: 'bg-blue-500' },
  { id: 'relacionamentos', name: 'Relacionamentos', icon: Heart, count: 12, color: 'bg-pink-500' },
  { id: 'deus', name: 'Relacionamento com Deus', icon: Star, count: 8, color: 'bg-yellow-500' },
  { id: 'biblia', name: 'Dúvidas Bíblicas', icon: Book, count: 6, color: 'bg-green-500' },
  { id: 'pessoal', name: 'Crescimento Pessoal', icon: User, count: 9, color: 'bg-purple-500' },
  { id: 'familia', name: 'Questões Familiares', icon: Home, count: 7, color: 'bg-orange-500' },
  { id: 'emergencia', name: 'Emergências', icon: AlertTriangle, count: 3, color: 'bg-red-500' },
  { id: 'profissional', name: 'Vida Profissional', icon: Briefcase, count: 2, color: 'bg-indigo-500' }
];
