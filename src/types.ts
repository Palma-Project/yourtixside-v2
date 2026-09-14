export interface ActivityLog {
  id: string;
  type: 'gate' | 'form' | 'voting' | 'document';
  text: string;
  time: string;
  status: 'emerald' | 'crimson' | 'amber';
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export type RoleType = 'creator' | 'customer' | 'superadmin';
