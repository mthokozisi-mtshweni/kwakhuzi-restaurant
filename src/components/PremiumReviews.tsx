import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CookingPot, MessageSquareText, Star } from 'lucide-react';
import { reviews, reviewSummary } from '../data/reviews';
import { site } from '../data/site';
import './PremiumReviews.css';

function ElfsightGoogleReviews() {
  useEffect(() => {
    const source = 'https://elfsightcdn.com/platform.js';
    if (document.querySelector(`script[src="${source}"]`)) return;
    const script = document.createElement('script');
    script.src = source;
    script.async = true;
    document.head.appendChild(script);
    // The shared platform remains loaded through StrictMode and route changes.
  }, []);

  return <div className="guest-carousel">
    <div className="elfsight-app-c21ce5f0-fee7-4f1c-9d2e-9b696889bd1d" data-elfsight-app-lazy="" />
  </div>;
}

function RatingStars({ rating }: { rating: number }) {
  const value = Math.min(5, Math.max(0, rating));
  return <span className="guest-stars" role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={23} fill={star <= value ? 'currentColor' : 'none'} strokeWidth={1.3} aria-hidden="true" />)}
  </span>;
}
export default function PremiumReviews({ full = false }: { full?: boolean }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('guest-reviews-in-view'); observer.disconnect(); }
    }, { threshold: .06 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hasRating = reviewSummary.rating !== null && reviewSummary.count !== null && reviewSummary.source !== null;
  const shareButton = site.googleReviewUrl
    ? <a className="button" href={site.googleReviewUrl} target="_blank" rel="noreferrer"><MessageSquareText size={23} />Share Your Experience<ArrowRight size={22} /></a>
    : <Link className="button" to="/contact"><MessageSquareText size={23} />Share Your Experience<ArrowRight size={22} /></Link>;

  return <section ref={section} className={`guest-reviews ${full ? 'guest-reviews-full' : ''}`} aria-label="Customer reviews">
    <span className="guest-corner guest-corner-top" aria-hidden="true" /><span className="guest-corner guest-corner-bottom" aria-hidden="true" />
    <CookingPot className="guest-pot-decoration" strokeWidth={.7} aria-hidden="true" />
    <div className="container guest-reviews-inner">
      <div className="guest-reviews-heading">
        <span className="guest-reviews-eyebrow">OUR REVIEWS</span>
        {full ? <h1>What Our <em>Guests Say</em></h1> : <h2>What Our <em>Guests Say</em></h2>}
        <p>{reviews.length ? 'Real experiences from our valued guests who have enjoyed the Kwa’Khuzi experience.' : 'Every visit has a story. We look forward to sharing yours.'}</p>
      </div>
      <div className="guest-reviews-layout">
        <aside className="guest-summary-panel" aria-label="Kwa’Khuzi review summary">
          <img className="guest-summary-logo" src={site.logo} alt="Kwa’Khuzi Traditional Restaurant" />
          {hasRating ? <div className="guest-summary-rating"><span><strong>{reviewSummary.rating?.toFixed(1)}</strong>/5</span><RatingStars rating={reviewSummary.rating || 0} /><p>Based on {reviewSummary.count} reviews on {reviewSummary.source}</p></div> : <div className="guest-summary-intro"><span className="eyebrow">AROUND OUR TABLE</span><h3>Your stories.<br /><em>Our shared table.</em></h3><p>A meal, a moment, a memory.<br />Tell us about your visit.</p></div>}
          <div className="guest-summary-topics"><span>What matters around our table</span>{['Great Food', 'Excellent Service', 'Authentic Atmosphere', 'Value for Money'].map(label => <div key={label}><Check size={14} aria-hidden="true" />{label}</div>)}</div>
        </aside>
        <ElfsightGoogleReviews />
      </div>
      <div className="guest-share-action">{shareButton}{!site.googleReviewUrl && <p>Share your feedback with our team through our Contact page.</p>}</div>
    </div>
  </section>;
}
