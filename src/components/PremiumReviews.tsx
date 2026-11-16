import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CalendarDays, Check, ChevronLeft, ChevronRight, CookingPot, MessageSquareText, Quote, Star, UserRound } from 'lucide-react';
import { reviews, reviewSummary, sampleReviews } from '../data/reviews';
import type { Review } from '../data/reviews';
import { site } from '../data/site';
import './PremiumReviews.css';

function visibleCount() {
  return window.matchMedia('(max-width: 700px)').matches ? 1 : window.matchMedia('(max-width: 1150px)').matches ? 2 : 3;
}
function RatingStars({ rating }: { rating: number }) {
  const value = Math.min(5, Math.max(0, rating));
  return <span className="guest-stars" role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={23} fill={star <= value ? 'currentColor' : 'none'} strokeWidth={1.3} aria-hidden="true" />)}
  </span>;
}
function ReviewCard({ review, hidden }: { review: Review; hidden: boolean }) {
  return <article className="guest-review-card" aria-hidden={hidden}>
    {review.sample && <span className="guest-sample-label">SAMPLE · NOT A CUSTOMER TESTIMONIAL</span>}
    <div className="guest-review-person">
      {review.avatar ? <img src={review.avatar} alt="" className="guest-avatar" loading="lazy" width="60" height="60" /> : <span className="guest-avatar guest-avatar-neutral" aria-hidden="true"><UserRound size={27} strokeWidth={1.3} /></span>}
      <div><h3>{review.name}</h3>{review.sample ? <span className="guest-status">Illustrative preview</span> : review.verified ? <span className="guest-status"><BadgeCheck size={15} />Verified Guest</span> : <span className="guest-status">Guest review</span>}</div>
    </div>
    <RatingStars rating={review.rating} />
    <blockquote>“{review.text}”</blockquote>
    <div className="guest-review-meta">
      {review.date ? <span><CalendarDays size={16} /><time dateTime={review.date}>{new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Johannesburg' }).format(new Date(`${review.date}T12:00:00Z`))}</time></span> : <span>{review.sample ? 'Development sample' : 'Shared by our guest'}</span>}
      <Quote size={27} fill="currentColor" aria-hidden="true" />
    </div>
  </article>;
}

export default function PremiumReviews({ full = false }: { full?: boolean }) {
  const data = reviews.length ? reviews : import.meta.env.DEV ? sampleReviews : [];
  const isSample = !reviews.length && data.length > 0;
  const [perPage, setPerPage] = useState(visibleCount);
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(data.length / perPage));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * perPage;
  const section = useRef<HTMLElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const move = (step: number) => setPage(value => (Math.min(value, pageCount - 1) + step + pageCount) % pageCount);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)');
    const tablet = window.matchMedia('(max-width: 1150px)');
    const update = () => setPerPage(visibleCount());
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => { mobile.removeEventListener('change', update); tablet.removeEventListener('change', update); };
  }, []);

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
      {isSample && <p className="guest-development-notice">Development preview · These sample cards demonstrate the design. They are not genuine guest reviews and are hidden in production.</p>}
      <div className="guest-reviews-layout">
        <aside className="guest-summary-panel" aria-label="Kwa’Khuzi review summary">
          <img className="guest-summary-logo" src={site.logo} alt="Kwa’Khuzi Traditional Restaurant" />
          {hasRating ? <div className="guest-summary-rating"><span><strong>{reviewSummary.rating?.toFixed(1)}</strong>/5</span><RatingStars rating={reviewSummary.rating || 0} /><p>Based on {reviewSummary.count} reviews on {reviewSummary.source}</p></div> : <div className="guest-summary-intro"><span className="eyebrow">AROUND OUR TABLE</span><h3>Your stories.<br /><em>Our shared table.</em></h3><p>A meal, a moment, a memory.<br />Tell us about your visit.</p></div>}
          <div className="guest-summary-topics"><span>What matters around our table</span>{['Great Food', 'Excellent Service', 'Authentic Atmosphere', 'Value for Money'].map(label => <div key={label}><Check size={14} aria-hidden="true" />{label}</div>)}</div>
        </aside>
        {data.length ? <div className="guest-carousel" role="region" aria-roledescription="carousel" aria-label="Guest testimonials">
          <div className="guest-carousel-window" tabIndex={0} aria-label="Use left and right arrow keys to browse reviews"
            onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}
            onPointerDown={event => { if (event.pointerType === 'touch') swipeStart.current = { x: event.clientX, y: event.clientY }; }}
            onPointerCancel={() => { swipeStart.current = null; }}
            onPointerUp={event => { const from = swipeStart.current; swipeStart.current = null; if (from) { const dx = event.clientX - from.x; const dy = event.clientY - from.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? -1 : 1); } }}>
            <div className="guest-carousel-track" style={{ transform: `translateX(calc(-${currentPage * 100}% - ${currentPage * 20}px))`, gridAutoColumns: `calc((100% - ${(perPage - 1) * 20}px) / ${perPage})` }}>
              {data.map((review, index) => <ReviewCard key={review.id} review={review} hidden={index < start || index >= start + perPage} />)}
            </div>
          </div>
          <div className="guest-carousel-controls">
            <button className="guest-carousel-arrow" type="button" onClick={() => move(-1)} disabled={pageCount < 2} aria-label="Previous reviews"><ChevronLeft size={22} /></button>
            <div className="guest-pagination" aria-label="Review pages">{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" className={currentPage === index ? 'selected' : ''} aria-label={`Show review page ${index + 1}`} aria-current={currentPage === index ? 'true' : undefined} onClick={() => setPage(index)} />)}</div>
            <button className="guest-carousel-arrow" type="button" onClick={() => move(1)} disabled={pageCount < 2} aria-label="Next reviews"><ChevronRight size={22} /></button>
          </div>
          <span className="guest-page-status" role="status">Review page {currentPage + 1} of {pageCount}{isSample ? ' · illustrative samples' : ''}</span>
        </div> : <div className="guest-reviews-empty"><span className="guest-empty-icon"><MessageSquareText size={35} strokeWidth={1.1} /></span><h3>Your experience is part of our story.</h3><p>Enjoyed a meal at Kwa’Khuzi? We’d love to hear about it. Share your feedback with our team.</p><span>Approved guest reviews will appear here.</span></div>}
      </div>
      <div className="guest-share-action">{shareButton}{!site.googleReviewUrl && <p>Share your feedback with our team through our Contact page.</p>}</div>
    </div>
  </section>;
}
