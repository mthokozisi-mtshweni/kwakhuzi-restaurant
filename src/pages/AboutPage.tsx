import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Target, Users } from 'lucide-react';
import { aboutSections, aboutValues } from '../data/about';
import { photo } from '../data/site';
import './AboutPage.css';

const valueIcons = [Target, Heart, Users];

export default function AboutPage() {
  const page = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = page.current?.querySelectorAll<HTMLElement>('[data-about-reveal]');
    if (!elements) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('about-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .1 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div ref={page} className="about-page">
    <section className="about-cinematic-hero" aria-label="About Kwa’Khuzi">
      <img className="about-hero-photo" src={photo('20.42.23 (1)')} alt="The actual Kwa’Khuzi restaurant building in afternoon sunlight" fetchPriority="high" width="1600" height="1200" />
      <div className="container about-hero-copy"><span className="about-eyebrow">ABOUT KWA’KHUZI</span><h1>More Than<br />a Restaurant.<em>A Taste of Home.</em></h1><p>Discover the story, flavours and people behind the Kwa’Khuzi experience in KwaMhlanga.</p></div>
      <span className="about-hero-pattern" aria-hidden="true" />
    </section>
    <div className="about-editorial-sections">
      {aboutSections.map((section, index) => <section className={`about-editorial ${index % 2 ? 'about-editorial-reversed' : ''}`} key={section.id} aria-labelledby={`about-${section.id}-heading`}>
        <div className="container about-editorial-grid" data-about-reveal>
          <figure className="about-editorial-photo"><img src={section.image} alt={section.alt} loading="lazy" width="800" height="500" />{section.caption && <figcaption>{section.caption}</figcaption>}</figure>
          <div className="about-editorial-copy"><span className="about-eyebrow">{section.eyebrow}</span><h2 id={`about-${section.id}-heading`}>{section.before}<em>{section.highlight}</em>{section.after}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.note && <p className="about-draft-note">{section.note}</p>}</div>
        </div>
      </section>)}
    </div>
    <section className="about-values-section" aria-labelledby="about-values-heading">
      <div className="container" data-about-reveal><h2 id="about-values-heading" className="about-values-heading">OUR VISION & VALUES</h2><p className="about-values-draft">Proposed statements · Awaiting management approval</p><div className="about-values-grid">{aboutValues.map((value, index) => { const Icon = valueIcons[index]; return <article key={value.title}><Icon size={40} strokeWidth={1.6} aria-hidden="true" /><h3>{value.title}</h3><p>{value.text}</p></article>; })}</div></div>
    </section>
    <section className="about-menu-banner" aria-labelledby="about-menu-heading"><img src={photo('20.42.18')} alt="" loading="lazy" width="1600" height="900" /><div className="container" data-about-reveal><h2 id="about-menu-heading">Explore Our <em>Menu</em></h2><p>Discover our traditional meals, generous platters and local favourites.</p><Link className="button" to="/menu">View Our Menu<ArrowRight size={19} /></Link></div><span className="about-banner-pattern" aria-hidden="true" /></section>
  </div>;
}
