import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, CalendarDays, ChevronLeft, ChevronRight, Expand, Images, LayoutGrid, Users, UtensilsCrossed, X } from 'lucide-react';
import { gallery, galleryCategories } from '../data/gallery';
import type { GalleryImage } from '../data/gallery';
import './PremiumGallery.css';

const filterIcons = [LayoutGrid, Building2, UtensilsCrossed, CalendarDays, Users];

function GalleryLightbox({ images, initialIndex, trigger, onClose }: {
  images: GalleryImage[]; initialIndex: number; trigger: HTMLButtonElement; onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [closing, setClosing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const current = images[index];
  const move = (step: number) => { if (!closing) setIndex(value => (value + step + images.length) % images.length); };

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger.focus();
    };
  }, [trigger]);

  useEffect(() => {
    const next = new Image();
    next.src = images[(index + 1) % images.length].src;
  }, [index, images]);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  return <dialog ref={dialog} className={`premium-gallery-lightbox ${closing ? 'is-closing' : ''}`} aria-label="Kwa’Khuzi photograph viewer"
    onCancel={event => { event.preventDefault(); setClosing(true); }}
    onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); setClosing(true); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }}
    onClick={event => { if (event.target === event.currentTarget) setClosing(true); }}>
    <button type="button" className="gallery-viewer-close" onClick={() => setClosing(true)} aria-label="Close gallery image" autoFocus><X size={24} /></button>
    <button type="button" className="gallery-viewer-arrow gallery-viewer-prev" disabled={images.length < 2 || closing} onClick={() => move(-1)} aria-label="Previous gallery image"><ChevronLeft size={28} /></button>
    <figure className="gallery-viewer-figure"
      onPointerDown={event => { if (event.pointerType === 'touch') swipeStart.current = { x: event.clientX, y: event.clientY }; }}
      onPointerCancel={() => { swipeStart.current = null; }}
      onPointerUp={event => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? -1 : 1);
      }}>
      <img key={current.src} src={current.src} alt={current.alt} draggable="false" />
      <figcaption aria-live="polite"><span>{current.alt}<small>{current.category}</small></span><span className="gallery-viewer-counter">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></figcaption>
    </figure>
    <button type="button" className="gallery-viewer-arrow gallery-viewer-next" disabled={images.length < 2 || closing} onClick={() => move(1)} aria-label="Next gallery image"><ChevronRight size={28} /></button>
  </dialog>;
}

export default function PremiumGallery({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState('All');
  const [selection, setSelection] = useState<{ index: number; trigger: HTMLButtonElement } | null>(null);
  const section = useRef<HTMLElement>(null);
  const matches = gallery.filter(item => category === 'All' || item.category === category);
  const images = full ? matches : matches.slice(0, 8);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('gallery-in-view'); observer.disconnect(); }
    }, { threshold: .05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} className={`premium-gallery ${full ? 'premium-gallery-full' : 'premium-gallery-preview'}`} aria-label={full ? 'Full restaurant gallery' : 'Restaurant gallery preview'}>
    <span className="gallery-corner gallery-corner-top" aria-hidden="true" /><span className="gallery-corner gallery-corner-bottom" aria-hidden="true" /><span className="gallery-corner gallery-corner-right" aria-hidden="true" />
    <div className="container premium-gallery-inner">
      {full && <Link to="/" className="gallery-back-link"><ArrowLeft size={15} />Back to Home</Link>}
      <div className="premium-gallery-heading">
        <span className="premium-gallery-eyebrow">OUR GALLERY</span>
        {full ? <h1>A Look Inside <em>Kwa’Khuzi</em></h1> : <h2>A Look Inside <em>Kwa’Khuzi</em></h2>}
        <p>Explore our venue, food, atmosphere and the authentic Kwa’Khuzi experience.</p>
      </div>
      <div className="premium-gallery-filters" aria-label="Gallery categories">
        {galleryCategories.map((name, index) => {
          const Icon = filterIcons[index];
          return <button type="button" key={name} className={category === name ? 'selected' : ''} aria-pressed={category === name} onClick={() => setCategory(name)}><Icon size={21} aria-hidden="true" /><span>{name}</span></button>;
        })}
      </div>
      <p className="gallery-results" role="status">{images.length ? `${full ? matches.length : images.length} photographs · ${category}` : `No photographs in ${category} yet`}</p>
      {images.length ? <div className="premium-gallery-grid" key={category}>
        {images.map((item, index) => <button type="button" className="premium-gallery-card" key={item.src} style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}
          aria-label={`Enlarge: ${item.alt}`} onClick={event => setSelection({ index, trigger: event.currentTarget })}>
          <img src={item.src} alt={item.alt} loading="lazy" width="640" height="480" />
          <span className="gallery-card-overlay"><span>{item.alt}</span><Expand size={22} aria-hidden="true" /></span>
        </button>)}
      </div> : <div className="gallery-empty-state"><CalendarDays size={34} aria-hidden="true" /><h3>More moments to come.</h3><p>Approved event photographs will appear here when available.</p><button className="button" onClick={() => setCategory('All')}>Explore all photographs<ArrowRight size={16} /></button></div>}
      {!full && <div className="premium-gallery-cta"><Link className="button" to="/gallery"><Images size={23} />View Full Gallery<ArrowRight size={23} /></Link></div>}
    </div>
    {selection && <GalleryLightbox images={images} initialIndex={selection.index} trigger={selection.trigger} onClose={() => setSelection(null)} />}
  </section>;
}
