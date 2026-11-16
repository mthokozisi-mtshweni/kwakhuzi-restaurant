import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Share2, X } from 'lucide-react';
import { floatingSocialAccounts } from '../data/site';
import './FloatingSocial.css';

function SocialIcon({ platform }: { platform: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {platform === 'whatsapp' && <><path d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.6l1.3-4.7a8.7 8.7 0 1 1 16.4-4.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8.1 7.1c.3-.3.6-.2.8.2l.9 1.9c.1.3 0 .5-.4.9-.2.2-.3.4-.1.7.7 1.2 1.7 2.1 3 2.7.3.1.5.1.7-.1l.9-1.1c.2-.3.5-.3.8-.1l1.9.9c.4.2.5.4.4.8-.2 1.3-1.2 2-2.4 1.9-3.7-.3-7.7-4.1-7.8-7.1 0-.7.5-1.3 1.3-1.7Z" fill="currentColor" /></>}
    {platform === 'facebook' && <path d="M14 22v-9h3l.5-4H14V7c0-1.1.3-2 2-2h2V1.5A22 22 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z" fill="currentColor" />}
    {platform === 'instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></>}
    {platform === 'tiktok' && <path d="M14 3h3c.3 2.4 1.6 3.8 4 4v3a9 9 0 0 1-4-1.3V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z" fill="currentColor" />}
  </svg>;
}

export default function FloatingSocial() {
  const { pathname } = useLocation();
  const [state, setState] = useState({ pathname, open: false });
  const open = state.pathname === pathname && state.open;
  const root = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const links = floatingSocialAccounts;

  useEffect(() => {
    if (!open) return;
    const close = () => setState({ pathname, open: false });
    const onPointer = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) close(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); launcher.current?.focus(); }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, pathname]);

  return <div ref={root} className={`floating-social ${open ? 'is-open' : ''}`}>
    <button ref={launcher} className="floating-social-launcher" type="button" aria-label={open ? 'Close social links' : 'Open social links'}
      aria-expanded={open} aria-controls="floating-social-links" onClick={() => setState({ pathname, open: !open })}>
      <Share2 className="floating-share-icon" size={23} aria-hidden="true" /><X className="floating-close-icon" size={23} aria-hidden="true" />
    </button>
    <ul id="floating-social-links" className="floating-social-links" aria-label="Kwa’Khuzi social links" aria-hidden={!open} inert={!open}>
      {links.map((link, index) => <li key={link.platform} style={{ '--social-index': index } as React.CSSProperties}>
        <span className="floating-social-tooltip" aria-hidden="true">{link.label}{!link.url && ' · Coming soon'}</span>
        {link.url ? <a className={`floating-social-link social-${link.platform}`} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Contact Kwa’Khuzi on ${link.label}`}><SocialIcon platform={link.platform} /></a>
          : <button className={`floating-social-link social-${link.platform} is-unavailable`} type="button" disabled aria-label={`${link.label} link awaiting confirmation`}><SocialIcon platform={link.platform} /></button>}
      </li>)}
    </ul>
  </div>;
}
