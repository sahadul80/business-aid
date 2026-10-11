'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CLIENTS, CONTACT, SERVICES, WORK_TAGS, type Cat } from '@/lib/data';
import { Globe, HeroScene, Ring14, SCENES, v } from './Scenes';

/* ---------- hooks ---------- */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function useCount(to: number, run: boolean, ms = 1600, from = 0) {
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, ms, from]);
  return Math.round(n);
}

/* ---------- TagInput (multi-select chips with suggestions) ---------- */
export function TagInput({ options, value, onChange, placeholder, label }: { options: string[]; value: string[]; onChange: (v: string[]) => void; placeholder?: string; label: string }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const id = useId();
  const list = options.filter((o) => !value.includes(o) && o.toLowerCase().includes(q.toLowerCase()));
  const add = (t: string) => { onChange([...value, t]); setQ(''); setHi(0); };
  return (
    <div className="tagin" onFocus={() => setOpen(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <div className="tagbox">
        {value.map((t) => (
          <span className="chip on pop-in" key={t}>{t}<button type="button" aria-label={`Remove ${t}`} onClick={() => onChange(value.filter((x) => x !== t))}>×</button></span>
        ))}
        <input
          aria-label={label} role="combobox" aria-expanded={open} aria-controls={id} aria-autocomplete="list"
          value={q} placeholder={value.length ? '' : placeholder}
          onChange={(e) => { setQ(e.target.value); setHi(0); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); if (list[hi]) add(list[hi]); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, list.length - 1)); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
            else if (e.key === 'Backspace' && !q && value.length) onChange(value.slice(0, -1));
          }}
        />
      </div>
      {open && list.length > 0 && (
        <ul className="sug" id={id} role="listbox">
          {list.map((o, i) => (
            <li key={o} role="option" aria-selected={i === hi}>
              <button type="button" tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onClick={() => add(o)}>{o}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Nav / footer / WhatsApp ---------- */
const BUSINESS_AID_LOGO = '/busines-aid-logo.png';

const Logo = () => (
  <a href="#top" className="logo" aria-label="Business Aid home">
    <img className="brand-logo" src={BUSINESS_AID_LOGO} alt="Business Aid — Where business gets better" />
  </a>
);

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Logo />
        <nav aria-label="Primary" className="links">
          <a href="#services">Services</a><a href="#ezsell">EZsell</a><a href="#contact">Contact</a>
        </nav>
        <a className="btn sm" href="#contact">Free consultation</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <Logo />
        <address>{CONTACT.address}<br /><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></address>
        <p><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a> · <a href="https://ezsell.xyz/">ezsell.xyz</a></p>
      </div>
    </footer>
  );
}

export function WhatsApp() {
  return (
    <a className="wa" href={`https://wa.me/${CONTACT.wa}`} aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
    </a>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = useCount(8, seen, 1600, 1);
  return (
    <section id="top" className="hero">
      <div className="wrap hero-in" ref={ref}>
        <div className="hero-l">
          <h1 className="tag">Where business gets better</h1>
          <p className="hero-description">Business growth, digital marketing, and essential tax and company-compliance support for e-commerce brands and entrepreneurs.</p>
          <div className="big" aria-label="Eight times sales growth in five months">
            <span className="n">{n}</span><span className="x an pulse">×</span>
          </div>
          <div className="months" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <i key={i} className="an dotfill" style={v(i)} />)}</div>
          <p className="cap">jbhalalfood.com, 5 months</p>
          <div className="cta"><a className="btn" href="#contact">Book a free consultation</a><a className="btn ghost" href="#services">Explore our services</a></div>
        </div>
        <HeroScene />
      </div>
    </section>
  );
}

/* ---------- Services: service details on the left, service navigation on the right ---------- */
const SERVICE_DESCRIPTIONS: Record<string, string> = {
  seo: 'Help customers find your products in Google and other search engines, while making your brand easier for AI answer tools to understand and recommend.',
  content: 'Create clear, engaging product and social media content that explains your offer, builds customer confidence, and supports more informed buying decisions.',
  media: 'Plan and manage paid campaigns across platforms such as Facebook, Instagram, and Google, with clear goals and performance tracking.',
  strategy: 'Turn your business goals into a practical plan for positioning, customer acquisition, sales improvement, and sustainable growth.',
  tax: 'Get guidance on income tax return filing, tax planning, TIN-related matters, and preparing responses to tax notices.',
  rjsc: 'Get help understanding company or partnership formation, required documents, RJSC filings, and ongoing company record and compliance requirements.',
  audit: 'Organise records and supporting documents for audit requirements, and coordinate with the relevant accounting or audit professionals.',
};

export function Services() {
  const [cat, setCat] = useState<Cat>('growth');
  const [slug, setSlug] = useState('seo');
  const list = SERVICES.filter((service) => service.cat === cat);
  const active = list.find((service) => service.slug === slug) ?? list[0];
  const Scene = SCENES[active.slug];
  const pick = (category: Cat) => {
    setCat(category);
    setSlug(SERVICES.find((service) => service.cat === category)!.slug);
  };

  return (
    <section id="services" className="sec services-section">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow">Our services</p>
          <h2 className="section-title">Growth and compliance, under one roof.</h2>
          <p className="section-copy">From attracting online customers to managing tax and company filings, choose practical support that matches your business needs.</p>
        </div>

        <div className="svc service-explorer">
          <aside className="service-navigation" aria-label="Choose a service">
            <p className="nav-label">Choose a service area</p>
            <div className="category-options" role="tablist" aria-label="Service areas">
              {(['growth', 'legal'] as Cat[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={cat === category}
                  className={`category-option ${category}`}
                  onClick={() => pick(category)}
                >
                  <span className="category-title">{category === 'growth' ? 'E-commerce' : 'Legal Aid'}</span>
                  <span className="category-subtitle">{category === 'growth' ? 'Growth & marketing' : 'Tax & company compliance'}</span>
                  <span className="category-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <div className="submenu" role="tablist" aria-label={`${cat === 'growth' ? 'E-commerce' : 'Legal Aid'} services`}>
              <p className="submenu-heading">{cat === 'growth' ? 'Growth services' : 'Legal aid services'}</p>
              {list.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  role="tab"
                  aria-selected={service.slug === active.slug}
                  className="row"
                  onClick={() => setSlug(service.slug)}
                >
                  <i className={cat} aria-hidden="true" />
                  <span>{service.name}</span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="detail" key={active.slug}>
            <div className="scene-wrap pop-in">{Scene()}</div>
            <div className="service-copy">
              <p className="service-kicker">{cat === 'growth' ? 'E-commerce growth & marketing' : 'Legal aid & compliance'}</p>
              <h3>{active.name}</h3>
              <p className="service-description">{SERVICE_DESCRIPTIONS[active.slug]}</p>
              <h4>How we can help</h4>
              <ul className="chips">{active.items.map((item) => <li className="chip" key={item}>{item}</li>)}</ul>
              <a className="btn" href="#contact" onClick={() => window.dispatchEvent(new CustomEvent('ba:service', { detail: active.name }))}>Discuss this service</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Selected work: high-resolution brand marks and clear service references ---------- */
const BRAND_LABELS: Record<string, string> = {
  'jbhalalfood.com': 'JB HALAL FOOD',
  'gulfgainsborough.co.uk': 'GULF GAINSBOROUGH',
  'thefishbazar.com': 'THE FISH BAZAR',
  'farmzila.com.bd': 'FARMZILA',
  'smartmeals.online': 'SMART MEALS',
  'japangoodsbd.com': 'JAPAN GOODS',
  'mrsolutionbd.com': 'MR SOLUTION',
  'rongdhonubd.com': 'RONGDHONU',
  'facebook.com/shop.radience': 'RADIENCE',
  'unicornbd.com': 'UNICORN BD',
  'ariosebd.com': 'ARIOSE',
  'koyabazar.com': 'KOYA BAZAR',
};

function brandLabel(client: (typeof CLIENTS)[number]) {
  return BRAND_LABELS[client.name] ?? client.name;
}

function workTagLabel(tag: string) {
  const labels: Record<string, string> = {
    'Content creation': 'Content',
    'Legal / tech support': 'Legal / tech',
    'Web / digital presence': 'Web / digital',
  };
  return labels[tag] ?? tag;
}

function PartnerLogo({ client, compact = false }: { client: (typeof CLIENTS)[number]; compact?: boolean }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const origin = new URL(client.href).origin;
  const iconSources = [
    client.logoPath,
    client.logoUrl,
    `${origin}/apple-touch-icon.png`,
    `${origin}/favicon.ico`,
    `https://www.google.com/s2/favicons?domain=${client.logoDomain}&sz=512`,
  ].filter((src): src is string => Boolean(src));
  const source = iconSources[sourceIndex];

  return (
    <div className={`partner-logo-surface${compact ? ' compact' : ''}`} role="img" aria-label={`${brandLabel(client)} logo`}>
      {source ? (
        <img
          key={source}
          className="partner-logo-image"
          src={source}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setSourceIndex((index) => Math.min(index + 1, iconSources.length))}
        />
      ) : (
        <span className="partner-logo-fallback" aria-hidden="true">{compact ? brandLabel(client).split(/\s+/).map((part) => part[0]).join('').slice(0, 3) : brandLabel(client)}</span>
      )}
    </div>
  );
}

function WorkMarqueeItem({ client, duplicate = false }: { client: (typeof CLIENTS)[number]; duplicate?: boolean }) {
  return (
    <a
      className="work-marquee-item"
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={duplicate ? undefined : `Visit ${brandLabel(client)}`}
    >
      <span className="work-marquee-logo"><PartnerLogo client={client} compact /></span>
      <span className="work-marquee-name">{brandLabel(client)}</span>
      <span className="work-marquee-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

export function Work() {
  const [tags, setTags] = useState<string[]>([]);
  const shown = CLIENTS.filter((client) => !tags.length || tags.some((tag) => client.tags.includes(tag)));
  return (
    <section id="work" className="sec tint work-section">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">Client work across industries.</h2>
          <p className="section-copy">Explore client businesses across e-commerce, food delivery, retail, home services, and international markets, alongside the services Business Aid has provided.</p>
        </div>
        <div className="work-filter-row">
          <p>Explore by service</p>
          <TagInput label="Filter work by service" options={WORK_TAGS} value={tags} onChange={setTags} placeholder="Choose a service to filter" />
        </div>
        <div className="client-grid">
          {shown.map((client, index) => (
            <article
              key={client.name}
              className={`client-card ${client.result ? 'client-featured' : ''}`}
              style={{ animationDelay: `${(index % 6) * 55}ms` }}
            >
              <a className="client-logo-link" href={client.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name}`}>
                <PartnerLogo client={client} />
              </a>
              <div className="client-details">
                <div className="client-site-row">
                  <a className="client-site" href={client.href} target="_blank" rel="noopener noreferrer" aria-label={`Website: ${client.name}`}>
                    {client.name}<span aria-hidden="true">↗</span>
                  </a>
                  {client.result && <span className="client-result">{client.result}</span>}
                </div>
                <p className="client-business-type">{client.businessType}</p>
                <div className="client-services" aria-label={`Services provided: ${client.tags.join(', ')}`}>
                  {client.tags.map((tag) => <span className="client-service-pill" key={tag}>{workTagLabel(tag)}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        {shown.length === 0 && <p className="empty-work">No client examples match that service. Remove a filter to see more work.</p>}
        <p className="work-note">Client names and logos identify the referenced businesses. Services listed reflect the current project framework; publish client work and performance claims only with appropriate approval.</p>

        <div className="work-marquee" aria-label="Client and partner businesses">
          <p className="work-marquee-kicker">Businesses across our client portfolio</p>
          <div className="work-marquee-window">
            <div className="work-marquee-track">
              <div className="work-marquee-group">
                {CLIENTS.map((client) => <WorkMarqueeItem key={`marquee-${client.name}`} client={client} />)}
              </div>
              <div className="work-marquee-group" aria-hidden="true">
                {CLIENTS.map((client) => <WorkMarqueeItem key={`marquee-copy-${client.name}`} client={client} duplicate />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
export function Why() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = useCount(14, seen, 1800);
  return (
    <section className="sec dark">
      <div className="wrap why" ref={ref}>
        <div className="ring-wrap" role="img" aria-label="Fourteen years of experience">
          <Ring14 /><span className="ring-n">{n}</span>
        </div>
        <Globe />
      </div>
    </section>
  );
}

/* ---------- EZsell: embedded website on the left, product details on the right ---------- */
export function EZsell() {
  return (
    <section id="ezsell" className="sec ez-section">
      <div className="wrap">
        <div className="ez-layout">
          <div className="ez-preview">
            <div className="iframe-bar"><span className="browser-dots"><i/><i/><i/></span><span>ezsell.xyz</span><a href="https://ezsell.xyz/" target="_blank" rel="noopener noreferrer">Open full site ↗</a></div>
            <iframe title="EZsell full website preview" src="https://ezsell.xyz/" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
            <p className="iframe-note">Scroll inside the preview to explore EZsell. If the site blocks embedding, open it in a new tab.</p>
          </div>

          <div className="ez-copy">
            <span className="eyebrow">Our product</span>
            <h2 className="section-title">Meet EZsell.</h2>
            <p className="section-copy">A selling platform for e-commerce and Facebook-based businesses, with AI-assisted customer conversations.</p>
            <div className="ez-benefits">
              <h3>Made for online sellers</h3>
              <ul>
                <li><span aria-hidden="true">✓</span><span><b>Support customer conversations</b><small>Introduce an AI sales agent into the selling experience.</small></span></li>
                <li><span aria-hidden="true">✓</span><span><b>Built around online selling</b><small>Explore a product designed for e-commerce and F-commerce workflows.</small></span></li>
                <li><span aria-hidden="true">✓</span><span><b>Explore before you decide</b><small>Browse the live website here or open it in a separate tab.</small></span></li>
              </ul>
            </div>
            <div className="cta ez-links">
              <a className="btn" href="https://ezsell.xyz/" target="_blank" rel="noopener noreferrer">Visit EZsell ↗</a>
              <a className="btn ghost" href="https://facebook.com/EzSellAI" target="_blank" rel="noopener noreferrer">Follow on Facebook ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const on = (e: Event) => { const service = (e as CustomEvent<string>).detail; setServices((previous) => (previous.includes(service) ? previous : [...previous, service])); };
    window.addEventListener('ba:service', on);
    return () => window.removeEventListener('ba:service', on);
  }, []);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hello Business Aid, I'm ${name} (${phone}). Interested in: ${services.join(', ') || 'General'}. ${msg}`;
    window.open(`https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };
  return (
    <section id="contact" className="sec tint contact-section">
      <div className="wrap">
        <div className="section-intro contact-intro">
          <p className="eyebrow">Contact us</p>
          <h2 className="section-title">Let’s talk about your business.</h2>
          <p className="section-copy">Tell us what you want to improve or where you need compliance support, and we’ll help you identify the right next step.</p>
        </div>
        <div className="contact">
          <div className="info">
            <a className="big-link" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <address>{CONTACT.address}</address>
            <p className="contact-helper">Prefer a quick conversation? Contact us by phone or WhatsApp.</p>
            <a className="btn ghost contact-whatsapp" href={`https://wa.me/${CONTACT.wa}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          </div>
          <form className="form" onSubmit={submit}>
            <label>Name<input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
            <label>Phone or WhatsApp<input required value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" /></label>
            <div className="fld"><span>What do you need help with?</span>
              <TagInput label="Services you need" options={[...SERVICES.map((service) => service.name), 'EZsell', 'General enquiry']} value={services} onChange={setServices} placeholder="Choose one or more services" />
            </div>
            <label>How can we help?<textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Briefly describe what you need." /></label>
            <button className="btn" type="submit">{sent ? 'Open WhatsApp again' : 'Send enquiry on WhatsApp'}</button>
            <p className="form-note">Your message will open in WhatsApp so you can review it before sending.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
