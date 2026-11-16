import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Beef, CalendarDays, ChefHat, CupSoda, Flame, IceCreamBowl, Plus, Salad, Search, Sandwich, Soup, UtensilsCrossed, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { menu, menuCategories } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { photo } from '../data/site';
import './PremiumMenu.css';

const categoryIcons: Record<string, LucideIcon> = {
  All: UtensilsCrossed, 'Traditional Meals': Soup, 'Chicken Combos': Flame,
  'Platters to Share': Beef, 'Dagwood & Wraps': Sandwich, 'Chips & More': ChefHat,
  'Weekly Specials': CalendarDays, Extras: Salad, Desserts: IceCreamBowl, Drinks: CupSoda,
};
const money = (price: number) => `R${price.toFixed(2)}`;

function MenuHeading({ full }: { full: boolean }) {
  return <div className="premium-menu-heading">
    <span className="premium-menu-eyebrow">OUR MENU</span>
    {full
      ? <h1>Authentic <em>Traditional Flavours</em></h1>
      : <h2>Authentic <em>Traditional Flavours</em></h2>}
    <p>A selection of our most loved traditional dishes, prepared with care and a taste of home.</p>
  </div>;
}

function CategoryNavigation({ category, onChange, full }: { category: string; onChange: (value: string) => void; full: boolean }) {
  const selectedButton = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const button = selectedButton.current;
    const parent = button?.parentElement;
    if (button && parent) parent.scrollTo({ left: Math.max(0, button.offsetLeft - parent.offsetLeft - (parent.clientWidth - button.clientWidth) / 2), behavior: 'instant' });
  }, [category]);
  return <div className="premium-category-nav" aria-label={full ? 'Full menu categories' : 'Featured menu categories'}>
    {(full ? menuCategories : menuCategories.filter(name => name !== 'All')).map(name => {
      const Icon = categoryIcons[name] || UtensilsCrossed;
      return <button key={name} ref={name === category ? selectedButton : undefined} type="button" aria-pressed={category === name}
        className={category === name ? 'selected' : ''} onClick={() => onChange(name)}>
        <Icon size={19} aria-hidden="true" /><span>{name}</span>
      </button>;
    })}
  </div>;
}

function DishImage({ item }: { item: MenuItem }) {
  const Icon = categoryIcons[item.category] || UtensilsCrossed;
  return item.image
    ? <><img className="premium-food-image" src={item.image} alt={item.imageAlt || item.name} loading="lazy" width="640" height="390" />{item.imageCaption && <span className="premium-image-caption">{item.imageCaption}</span>}</>
    : <div className="premium-food-placeholder" role="img" aria-label={`Photograph pending for ${item.name}`}>
      <span className="placeholder-emblem"><Icon size={36} strokeWidth={1} aria-hidden="true" /></span>
      <span>{item.category}</span><small>Dish photograph coming soon</small>
    </div>;
}

function DishDetails({ item, onClose, trigger }: { item: MenuItem; onClose: () => void; trigger: HTMLButtonElement | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [trigger]);
  return <dialog ref={dialog} className="premium-dish-dialog" aria-labelledby="dish-details-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="premium-dish-details">
      <div className="premium-detail-media"><DishImage item={item} /></div>
      <button className="premium-detail-close" autoFocus type="button" onClick={onClose} aria-label="Close dish details"><X size={21} /></button>
      <div className="premium-detail-copy">
        <span className="eyebrow">{item.category}{item.subcategory ? ` · ${item.subcategory}` : ''}</span>
        <h2 id="dish-details-title">{item.name}</h2>
        <strong className="premium-price">{money(item.price)}</strong>
        <p>{item.description || 'Ask our team for more information about this menu item.'}</p>
        <div className="premium-serving-note"><UtensilsCrossed size={18} /><p>Please ask our team about availability, ingredients and allergens before ordering.</p></div>
        <p className="premium-price-note">Price transcribed from the supplied printed menu. Subject to confirmation and change.</p>
      </div>
    </div>
  </dialog>;
}

function FoodCards({ items, categoryKey }: { items: MenuItem[]; categoryKey: string }) {
  const [details, setDetails] = useState<{ item: MenuItem; trigger: HTMLButtonElement } | null>(null);
  return <>
    <div className="premium-food-grid" key={categoryKey}>
      {items.map((item, index) => <article className="premium-food-card" key={item.id} style={{ animationDelay: `${Math.min(index, 3) * 55}ms` }}>
        <div className="premium-food-media"><DishImage item={item} /></div>
        <div className="premium-food-copy">
          <h3>{item.name}</h3>
          <p>{item.description || (item.category === 'Drinks' ? `${item.subcategory || 'Drinks'} · See our team for availability.` : 'A selection from our printed menu. Ask our team for serving details.')}</p>
          <div className="premium-food-bottom"><strong className="premium-price">{money(item.price)}</strong>
            <button type="button" onClick={event => { setDetails({ item, trigger: event.currentTarget }); }} aria-label={`View details for ${item.name}`}><Plus size={23} aria-hidden="true" /></button>
          </div>
        </div>
      </article>)}
    </div>
    {details && <DishDetails item={details.item} onClose={() => setDetails(null)} trigger={details.trigger} />}
  </>;
}

export default function PremiumMenu({ full = false }: { full?: boolean }) {
  const [params, setParams] = useSearchParams();
  const [previewCategory, setPreviewCategory] = useState('Traditional Meals');
  const [search, setSearch] = useState('');
  const [drinkGroup, setDrinkGroup] = useState('All drinks');
  const rawCategory = params.get('category') || 'All';
  const category = full ? (menuCategories.includes(rawCategory) ? rawCategory : 'All') : previewCategory;
  const categoryItems = menu.filter(item => category === 'All' || item.category === category);
  const matches = categoryItems.filter(item => `${item.name} ${item.category} ${item.subcategory || ''} ${item.description || ''}`.toLowerCase().includes(search.trim().toLowerCase()))
    .filter(item => category !== 'Drinks' || drinkGroup === 'All drinks' || item.subcategory === drinkGroup);
  const items = full ? matches : categoryItems.slice(0, 4);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('menu-in-view'); observer.disconnect(); }
    }, { threshold: .06 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const selectCategory = (value: string) => {
    setDrinkGroup('All drinks');
    if (full) {
      const next = new URLSearchParams(params);
      if (value === 'All') next.delete('category'); else next.set('category', value);
      setParams(next, { preventScrollReset: true });
    } else setPreviewCategory(value);
  };

  return <section ref={section} className={`premium-menu ${full ? 'premium-menu-full' : 'premium-menu-preview'}`} aria-label={full ? 'Full restaurant menu' : 'Featured restaurant menu'}>
    <div className="container premium-menu-inner">
      {full && <Link className="premium-back-link" to="/"><ArrowLeft size={15} />Back to Home</Link>}
      <MenuHeading full={full} />
      {full && <div className="premium-search-row"><label className="premium-menu-search"><Search size={19} aria-hidden="true" /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Find your favourite dish…" aria-label="Search the restaurant menu" /></label></div>}
      <CategoryNavigation category={category} onChange={selectCategory} full={full} />
      {full && category === 'Drinks' && <div className="premium-drink-groups" aria-label="Drink types">
        {['All drinks', 'Soft drinks', 'Mixers', 'Water'].map(group => <button type="button" key={group} className={drinkGroup === group ? 'selected' : ''} aria-pressed={drinkGroup === group} onClick={() => setDrinkGroup(group)}>{group}</button>)}
      </div>}
      {full && <p className="premium-result-count" role="status">{items.length} {items.length === 1 ? 'item' : 'items'} · {category}</p>}
      {items.length ? <FoodCards items={items} categoryKey={`${category}-${search}-${drinkGroup}`} /> : <div className="premium-empty-state"><Search size={30} /><h3>No dishes found</h3><p>Try another search or explore a different category.</p><button className="button" onClick={() => { setSearch(''); setDrinkGroup('All drinks'); selectCategory('All'); }}>Show all dishes</button></div>}
      {!full && <div className="premium-menu-cta"><Link className="button" to={`/menu?category=${encodeURIComponent(category)}`}><UtensilsCrossed size={20} />View Full Menu<ArrowRight size={20} /></Link></div>}
      <p className="premium-menu-disclaimer">Prices from our supplied printed menu, subject to confirmation and change. Please ask about availability and allergens.</p>
      {full && <div className="premium-original-menu"><div><span className="eyebrow">FROM THE RESTAURANT</span><h2>The printed menus</h2><p>Additional beers, ciders, spirits and wines are listed in the original drinks menu. Unclear entries need confirmation before they are added here.</p></div><div className="premium-original-links"><a href={photo('20.42.15 (1)')} target="_blank" rel="noreferrer">View food menu<ArrowRight size={16} /></a><a href={photo('20.42.18 (1)')} target="_blank" rel="noreferrer">View drinks menu<ArrowRight size={16} /></a></div></div>}
    </div>
  </section>;
}
