import { Author } from '../types';

export const AUTHORS: Record<string, Author> = {
  elena: {
    id: 'elena',
    name: 'Elena Rostova, CFP®',
    title: 'Lead Financial Editor & Certified Financial Planner',
    credentials: 'CFP® Board Registered #389214, B.S. in Economics',
    bio: 'Elena is a Certified Financial Planner™ professional with over 12 years of experience analyzing consumer budgeting systems, emergency liquidity, and personal wealth frameworks. She specializes in translating complex financial concepts into actionable consumer guidance.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    reviewedBy: 'WealthPulse Editorial Board',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance, CFA',
    title: 'Senior Banking & Consumer Credit Analyst',
    credentials: 'CFA Charterholder, M.S. in Finance',
    bio: 'Marcus has spent more than a decade examining consumer lending, credit scoring algorithms, and interest rate movements across retail banking. He is committed to helping consumers minimize high-interest debt and maximize risk-adjusted cash yields.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    reviewedBy: 'Elena Rostova, CFP®',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Jenkins, CPA',
    title: 'Tax & Retirement Strategy Editor',
    credentials: 'CPA Licensed, B.B.A. in Accounting',
    bio: 'Sarah is a licensed Certified Public Accountant with deep expertise in personal tax planning, tax-advantaged retirement vehicles (401k, IRA, HSA), and long-term asset allocation models for working professionals.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    reviewedBy: 'Marcus Vance, CFA',
  },
};
