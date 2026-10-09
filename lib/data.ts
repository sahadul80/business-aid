export type Cat = 'growth' | 'legal';

export const CATS: Record<Cat, string> = { growth: 'E-commerce', legal: 'Legal Aid' };

export interface Service { slug: string; cat: Cat; name: string; items: string[] }

// Service 1: E-commerce Solution (SEO, Content creation, Media buying, Business strategy)
// Service 2: Legal Aid (bullets from framework section 3.2)
export const SERVICES: Service[] = [
  { slug: 'seo', cat: 'growth', name: 'SEO & AEO', items: ['Technical SEO', 'On-page SEO', 'Off-page authority', 'AI answer engines', 'E-commerce SEO', 'Rank reporting'] },
  { slug: 'content', cat: 'growth', name: 'Content creation', items: ['Content management', 'Social content', 'Catalog content'] },
  { slug: 'media', cat: 'growth', name: 'Media buying', items: ['Facebook ads', 'Google ads', 'GA4 + Meta Pixel'] },
  { slug: 'strategy', cat: 'growth', name: 'Business strategy', items: ['Growth roadmap', 'Sales management', 'Sales development'] },
  { slug: 'tax', cat: 'legal', name: 'Income tax', items: ['ITR filing', 'Tax planning', 'TIN registration', 'Notice handling', 'Appeal & tribunal', 'TDS / VDS advisory', 'Exemptions'] },
  { slug: 'rjsc', cat: 'legal', name: 'RJSC registration', items: ['Formation in 3 working days', 'MoA / AoA drafting', 'Return filing', 'Share allotment / transfer', 'Failed-AGM resolution', 'Company revival'] },
  { slug: 'audit', cat: 'legal', name: 'Audit assistance', items: ['Audit report assistance'] },
];

export const WORK_TAGS = ['SEO & AEO', 'Media buying', 'Content', 'Strategy', 'Legal / tech'];

export interface Client { name: string; industry: string; tags: string[]; result?: string }
export const CLIENTS: Client[] = [
  { name: 'jbhalalfood.com', industry: 'Halal grocery, Japan-wide delivery', tags: ['Content', 'Legal / tech', 'Media buying', 'SEO & AEO'], result: '8×' },
  { name: 'gulfgainsborough.co.uk', industry: 'UK-based business', tags: ['Legal / tech'] },
  { name: 'thefishbazar.com', industry: 'Seafood delivery, Dhaka', tags: ['Content', 'Media buying', 'SEO & AEO'] },
  { name: 'farmzila.com.bd', industry: 'Safe, natural food', tags: ['Strategy'] },
  { name: 'smartmeals.online', industry: 'Farmzila Ltd. concern', tags: ['Content', 'Strategy'] },
  { name: 'japangoodsbd.com', industry: 'Japanese products, Bangladesh', tags: ['SEO & AEO', 'Media buying', 'Content', 'Strategy'] },
  { name: 'mrsolutionbd.com', industry: 'Interior architecture', tags: ['Legal / tech'] },
  { name: 'rongdhonubd.com', industry: 'Custom home painting', tags: ['Strategy', 'Legal / tech', 'Content', 'Media buying'] },
  { name: 'facebook.com/shop.radience', industry: 'Clothing, F-commerce', tags: ['Media buying', 'Content'] },
  { name: 'unicornbd.com', industry: 'Small e-commerce', tags: ['Media buying', 'Content'] },
  { name: 'ariosebd.com', industry: 'Small e-commerce', tags: ['SEO & AEO', 'Media buying', 'Content'] },
];

export const CONTACT = {
  phone: '+880 1711 293197', wa: '8801711293197', email: 'info@thebizaid.com',
  address: '7B, House No.: Cha-71/4, Badda Lake Drive Road, Gulshan, Dhaka-1212',
};
