import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Menu as MenuIcon, X, UtensilsCrossed, Users, Heart, Play, MessageCircle, ChevronRight, Mail, CalendarDays } from 'lucide-react';
import { navigation, photo, site } from './data/site';
import PremiumMenu from './components/PremiumMenu';
import PremiumGallery from './components/PremiumGallery';
import PremiumReviews from './components/PremiumReviews';
import PremiumContact from './components/PremiumContact';
import AboutPage from './pages/AboutPage';
import FloatingSocial from './components/FloatingSocial';
import aboutImage from "./assets/About/Golden-Hour Welcome at Kwa’Khuzi Restaurant-2.png";
import './App.css';

function Button({to,children,outline=false}:{to:string;children:React.ReactNode;outline?:boolean}) {return <Link className={`button ${outline?'outline':''}`} to={to}>{children}<ArrowRight size={17}/></Link>}
function Heading({label,title,children}:{label:string;title:string;children?:React.ReactNode}){return <div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2><span className="gold-rule"/>{children}</div>}
function Header() {
  const { pathname } = useLocation();
  const [menuState, setMenuState] = useState({ path: pathname, open: false });
  const open = menuState.path === pathname && menuState.open;
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuState({ path: pathname, open: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuState({ path: pathname, open: false });
        toggle.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) {
        setMenuState({ path: pathname, open: false });
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, pathname]);

  return <header className={`header ${pathname === '/' ? 'over-hero' : ''} ${scrolled || open ? 'is-scrolled' : ''}`}>
    <Link className="header-brand" to="/" onClick={closeMenu} aria-label="Kwa’Khuzi home">
      <img className="logo" src={site.logo} alt="Kwa’Khuzi Traditional Restaurant" />
    </Link>
    <nav ref={nav} id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      {navigation.map(([url, label]) => <NavLink end={url === '/'} key={url} to={url} onClick={closeMenu}>{label}</NavLink>)}
    </nav>
    <a className="header-phone" href={site.telephone}><Phone size={20} />{site.phone}</a>
    <Link className="button visit" to="/contact" onClick={closeMenu}><MapPin size={20} />Visit Us</Link>
    <button ref={toggle} className="mobile-toggle icon-button" onClick={() => setMenuState({ path: pathname, open: !open })}
      aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
      {open ? <X /> : <MenuIcon />}
    </button>
  </header>;
}

const scenes = [
  { image: '/images/hero/updated-aerial.webp', label: 'The Venue', alt: 'Golden-hour aerial view of the restaurant courtyard and tables', position: '50% 55%' },
  { image: '/images/hero/updated-entrance.webp', label: 'Entrance', alt: 'The two-storey restaurant entrance in warm afternoon light', position: '50% 55%' },
  { image: '/images/hero/updated-welcome.webp', label: 'Welcome', alt: 'Guests approaching the restaurant entrance and courtyard', position: '50% 55%' },
  { image: '/images/hero/updated-courtyard.webp', label: 'Courtyard', alt: 'Golden-hour courtyard tables and covered outdoor seating', position: '50% 55%' },
  { image: '/images/hero/updated-patio.webp', label: 'Patio', alt: 'Guests gathered around outdoor patio tables', position: '50% 55%' },
  { image: '/images/hero/updated-dining.webp', label: 'Dining', alt: 'Guests dining beneath the thatched lounge roof', position: '50% 55%' },
  { image: '/images/hero/updated-lounge.webp', label: 'Lounge', alt: 'Warmly lit lounge chairs and bar beneath the wooden ceiling', position: '50% 55%' },
  { image: '/images/hero/updated-bar.webp', label: 'Bar Area', alt: 'The open bar and woven seating with warm and purple lighting', position: '50% 55%' },
  { image: '/images/hero/updated-gathering.webp', label: 'Gathering', alt: 'Guests relaxing in the lounge and dining area', position: '50% 55%' },
];
const experienceVideo = new URL('./assets/images/WhatsApp Video 2026-11-15 at 20.42.26.mp4', import.meta.url).href;

function ExperienceModal({ onClose, returnFocus }: { onClose: () => void; returnFocus: React.RefObject<HTMLButtonElement | null> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = returnFocus.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      element?.close();
      previousFocus?.focus();
    };
  }, [returnFocus]);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return <dialog ref={dialog} className="experience-modal" aria-labelledby="experience-title" onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="experience-panel">
      <div className="experience-heading">
        <div><span className="eyebrow">A LOOK AROUND OUR HOME</span><h2 id="experience-title">The Kwa’Khuzi Experience</h2></div>
        <button className="icon-button" autoFocus onClick={onClose} aria-label="Close restaurant video"><X /></button>
      </div>
      <video ref={video} controls playsInline preload="metadata" poster={photo('20.42.26 (1)')}>
        <source src={experienceVideo} type="video/mp4" />
        Your browser does not support this video. <a href={experienceVideo}>Open the restaurant video</a>.
      </video>
      <p>A real glimpse of Kwa’Khuzi, KwaMhlanga. <a href={experienceVideo} target="_blank" rel="noreferrer">Open video separately <ArrowRight size={14} /></a></p>
    </div>
  </dialog>;
}

function Hero() {
  const [slide, setSlide] = useState(1);
  const [loadedScenes, setLoadedScenes] = useState<number[]>([1]);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hidden, setHidden] = useState(document.hidden);
  const [videoOpen, setVideoOpen] = useState(false);
  const experienceTrigger = useRef<HTMLButtonElement>(null);
  const stopped = reducedMotion || hidden || videoOpen;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => setHidden(document.hidden);
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      media.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const nextIndex = (slide + 1) % scenes.length;
    const next = new Image();
    next.src = scenes[nextIndex].image;
    let cancelled = false;
    const decoded = next.decode();
    void decoded.then(() => {
      if (!cancelled) setLoadedScenes(current => current.includes(nextIndex) ? current : [...current, nextIndex]);
    }).catch(() => { /* Retain the current background if the next image is unavailable. */ });
    if (stopped) return () => { cancelled = true; };
    const timer = window.setTimeout(async () => {
      try { await decoded; } catch { return; }
      if (!cancelled) setSlide(nextIndex);
    }, 5000);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [slide, stopped]);

  return <section className={`hero cinematic-hero ${stopped ? 'paused' : ''}`} aria-label="Welcome to Kwa’Khuzi">
    {scenes.map((scene, index) => <div key={scene.image} className={`hero-scene ${slide === index ? 'active' : ''}`} aria-hidden={slide !== index}>
      {loadedScenes.includes(index) && <img src={scene.image} alt={scene.alt} style={{ objectPosition: scene.position }} fetchPriority={index === 1 ? 'high' : 'low'} loading={index === 1 ? 'eager' : 'lazy'} />}
    </div>)}
    <div className="hero-shade" />
    <div className="hero-content container">
      <span className="eyebrow">WELCOME TO KWA’KHUZI</span>
      <h1><span>A Taste of Home.</span><em>A Legacy of Love.</em></h1>
      <p>Discover traditional flavours, generous platters and authentic hospitality in the heart of KwaMhlanga.</p>
      <div className="actions">
        <Button to="/menu"><UtensilsCrossed size={21} />Explore Our Menu</Button>
        <button ref={experienceTrigger} className="button experience-button" onClick={() => setVideoOpen(true)} aria-haspopup="dialog"><span className="play-ring"><Play size={15} /></span>The Kwa’Khuzi Experience</button>
      </div>
    </div>
    {videoOpen && <ExperienceModal onClose={() => setVideoOpen(false)} returnFocus={experienceTrigger} />}
  </section>;
}

function Intro({full=false}:{full?:boolean}){return <section id="introduction" className="section cream patterned"><div className="container intro-grid"><div className="image-frame"><img src={aboutImage} alt="The actual Kwa’Khuzi restaurant entrance" loading="lazy"/><span className="image-note">KwaMhlanga, Mpumalanga</span></div><div><Heading label="OUR HOME. YOUR TABLE." title="Welcome to Kwa’Khuzi"/><p>A place for familiar flavours, generous meals and good company. At Kwa’Khuzi, traditional South African food brings us together around the table.</p><p>Join us in KwaMhlanga, near Solomon Mahlangu Stadium, for a meal that feels like coming home.</p><Button to={full?'/menu':'/about'} outline>{full?'Discover our menu':'A little more about us'}</Button></div><div className="values">{[[UtensilsCrossed,'Traditional flavours'],[Users,'Made for sharing'],[Heart,'A taste of home']].map(([Icon,label])=>{const I=Icon as typeof Heart;return <div key={String(label)}><I size={26}/><span>{String(label)}</span></div>})}</div></div></section>}


function Footer() {
  const socialLinks = [
    { label: 'Facebook', url: site.socialLinks.facebook, icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1.1.3-2 2-2h2V1.5A22 22 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v8" fill="currentColor" stroke="none" /></svg> },
    { label: 'Instagram', url: site.socialLinks.instagram, icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
    { label: 'TikTok', url: site.socialLinks.tiktok, icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3c.3 2.4 1.6 3.8 4 4v3a9 9 0 0 1-4-1.3V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z" fill="currentColor" stroke="none" /></svg> },
    { label: 'WhatsApp', url: site.whatsappConfirmed ? site.whatsapp : null, icon: <MessageCircle size={22} /> },
  ];
  return <footer className="restaurant-footer">
    <div className="container restaurant-footer-columns">
      <div className="restaurant-footer-brand">
        <Link to="/" aria-label="Kwa’Khuzi home"><img className="footer-brand-logo" src={site.logo} alt="Kwa’Khuzi Traditional Restaurant" loading="lazy" /></Link>
        <p>A place where great food, African heritage and warm hospitality come together.</p>
        <div className="restaurant-footer-socials" aria-label="Social media">{socialLinks.map(social => social.url
          ? <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Kwa’Khuzi on ${social.label}`}>{social.icon}</a>
          : <span key={social.label} className="footer-social-pending" role="img" aria-label={`${social.label} link awaiting confirmation`} title={`${social.label} link awaiting confirmation`}>{social.icon}</span>)}</div>
        {socialLinks.some(social => !social.url) && <small className="footer-social-note">More social links coming soon.</small>}
      </div>
      <nav className="restaurant-footer-column" aria-label="Footer navigation"><h2>Quick Links</h2><ul className="restaurant-footer-links">{navigation.map(([url, label]) => <li key={url}><Link to={url}><ChevronRight size={17} aria-hidden="true" />{label}</Link></li>)}</ul></nav>
      <div className="restaurant-footer-column"><h2>Contact Us</h2><ul className="restaurant-footer-contact">
        <li><Phone size={21} aria-hidden="true" /><a href={site.telephone}>{site.phone}</a></li>
        <li><MessageCircle size={22} aria-hidden="true" /><a href={site.whatsapp} target="_blank" rel="noreferrer noopener" aria-label={`WhatsApp ${site.phone}`}>{site.phone}</a></li>
        <li><Mail size={22} aria-hidden="true" />{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <span className="footer-detail-pending">Email to be confirmed</span>}</li>
        <li><MapPin size={23} aria-hidden="true" /><div><a href={site.maps} target="_blank" rel="noreferrer noopener">{site.name}<br />{site.location}<br />Mpumalanga</a>{!site.googleMapsEmbedUrl && <small className="footer-map-note">Google Maps venue search</small>}</div></li>
      </ul></div>
      <div className="restaurant-footer-column restaurant-footer-hours"><h2>Operating Hours</h2><CalendarDays size={32} aria-hidden="true" />{site.openingHours
        ? <ul>{site.openingHours.map(row => <li key={row.days}><span>{row.days}</span><span>{row.hours}</span></li>)}</ul>
        : <p>Hours to be confirmed.<br /><a href={site.telephone}>Please call before your visit.</a></p>}</div>
    </div>
    <div className="container restaurant-footer-bottom"><p>© {site.copyrightYear} Kwa’Khuzi Traditional Restaurant. All Rights Reserved.</p><p className="restaurant-footer-credit">Designed &amp; Developed by <a href="https://bendalotech.co.za" target="_blank" rel="noopener noreferrer">Bendalo Technology &amp; Innovation</a></p></div>
  </footer>;
}


function Home(){return <><Hero/><Intro/><PremiumMenu/><PremiumGallery/><PremiumReviews/><PremiumContact/></>}



const metadata:Record<string,[string,string]>={'/':['A Taste of Home','Traditional South African meals and sharing platters in KwaMhlanga. Explore Kwa’Khuzi.'],'/menu':['Our Menu','Explore traditional meals, chicken combos, sharing platters and more at Kwa’Khuzi.'],'/about':['About Kwa’Khuzi','Discover traditional South African food, shared dining spaces and the Kwa’Khuzi restaurant experience in KwaMhlanga.'],'/gallery':['Gallery','Explore authentic food and restaurant photographs from Kwa’Khuzi.'],'/reviews':['Customer Reviews','Find public reviews and share your Kwa’Khuzi experience.'],'/contact':['Visit & Contact','Contact Kwa’Khuzi and find the restaurant near Solomon Mahlangu Stadium.']};
function RouteEffects(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0);const [title,description]=metadata[pathname]||['Page Not Found','Find your way back to Kwa’Khuzi.'];document.title=pathname==='/about'?'About Kwa’Khuzi | Traditional Restaurant in KwaMhlanga':`${title} | Kwa’Khuzi Traditional Restaurant`;document.querySelector('meta[name="description"]')?.setAttribute('content',description);document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);document.querySelector('meta[property="og:description"]')?.setAttribute('content',description)},[pathname]);return null}
function App(){return <BrowserRouter><RouteEffects/><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/menu" element={<PremiumMenu full/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/gallery" element={<PremiumGallery full/>}/><Route path="/reviews" element={<PremiumReviews full/>}/><Route path="/contact" element={<PremiumContact full/>}/><Route path="*" element={<section className="section cream empty-state"><span className="eyebrow">404 · A LITTLE OFF THE MENU</span><h1>Let’s get you back home.</h1><p>We couldn’t find that page. There’s plenty more to explore.</p><Button to="/">Back to Home</Button></section>}/></Routes></main><Footer/><FloatingSocial/></BrowserRouter>}
export default App;
