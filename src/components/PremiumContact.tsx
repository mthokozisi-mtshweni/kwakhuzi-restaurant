import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock3, List, Mail, MapPin, MessageCircle, MessageSquareText, Phone, Send, UserRound } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { contactPageMap, site } from '../data/site';
import contactPageImage from "../assets/images/Hero/Golden-Hour Welcome at Kwa’Khuzi-3.png";
import './PremiumContact.css';

const enquiryTypes = ['Table Booking', 'General Enquiry', 'Special Occasion', 'Group Booking', 'Other'];
type Enquiry = { name: string; phone: string; email: string; type: string; message: string };
type Errors = Partial<Record<keyof Enquiry, string>>;
const emptyEnquiry: Enquiry = { name: '', phone: '', email: '', type: '', message: '' };

function ContactRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <div className="contact-detail-row"><span className="contact-detail-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3>{children}</div></div>;
}

function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<Errors>({});
  const [readyUrl, setReadyUrl] = useState('');
  const enabled = site.whatsappConfirmed && Boolean(site.whatsapp);

  const update = (field: keyof Enquiry, value: string) => {
    setValues(previous => ({ ...previous, [field]: value }));
    setReadyUrl('');
    setErrors(previous => ({ ...previous, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enabled) return;
    const form = event.currentTarget;
    const details = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])) as Enquiry;
    const nextErrors: Errors = {};
    if (!details.name) nextErrors.name = 'Please enter your full name.';
    const normalizedPhone = details.phone.replace(/[\s().-]/g, '');
    if (!details.phone) nextErrors.phone = 'Please enter your phone number.';
    else if (!/^\+?[\d\s().-]+$/.test(details.phone) || !(/^(?:0\d{9}|[1-9]\d{7,14}|\+[1-9]\d{7,14})$/.test(normalizedPhone))) nextErrors.phone = 'Enter a valid phone number, such as 082 123 4567 or +27 82 123 4567.';
    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) nextErrors.email = 'Enter a valid email address or leave this field empty.';
    if (!enquiryTypes.includes(details.type)) nextErrors.type = 'Please choose an enquiry type.';
    if (!details.message) nextErrors.message = 'Please enter your message.';
    setErrors(nextErrors);
    setReadyUrl('');
    const firstError = (Object.keys(nextErrors) as (keyof Enquiry)[])[0];
    if (firstError) {
      const input = form.elements.namedItem(firstError) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      input?.focus();
      return;
    }
    const message = [
      'Hello Kwa’Khuzi,', '', `Enquiry: ${details.type}`, `Name: ${details.name}`, `Phone: ${details.phone}`,
      ...(details.email ? [`Email: ${details.email}`] : []), '', 'Message:', details.message,
    ].join('\n');
    const url = new URL(site.whatsapp);
    url.searchParams.set('text', message);
    setReadyUrl(url.toString());
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return <form className="contact-enquiry-form" noValidate onSubmit={submit} aria-label="WhatsApp enquiry form">
    <p className="contact-form-explainer">Your enquiry opens in WhatsApp. Review it there and press Send to contact our team. Booking requests require confirmation.</p>
    {Object.values(errors).some(Boolean) && <div className="contact-error-summary" role="alert">Please check the highlighted fields below.</div>}
    <div className="contact-form-grid">
      <div className="contact-field"><label htmlFor="enquiry-name">Full Name <span>*</span></label><div className="contact-input-wrap"><UserRound size={18} /><input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} placeholder="Enter your name" value={values.name} onChange={event => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'enquiry-name-error' : undefined} /></div>{errors.name && <p id="enquiry-name-error" className="contact-field-error">{errors.name}</p>}</div>
      <div className="contact-field"><label htmlFor="enquiry-phone">Phone Number <span>*</span></label><div className="contact-input-wrap"><Phone size={18} /><input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} placeholder="Enter your phone number" value={values.phone} onChange={event => update('phone', event.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined} /></div>{errors.phone && <p id="enquiry-phone-error" className="contact-field-error">{errors.phone}</p>}</div>
      <div className="contact-field"><label htmlFor="enquiry-email">Email Address <small>(optional)</small></label><div className="contact-input-wrap"><Mail size={18} /><input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="Enter your email address" value={values.email} onChange={event => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'enquiry-email-error' : undefined} /></div>{errors.email && <p id="enquiry-email-error" className="contact-field-error">{errors.email}</p>}</div>
      <div className="contact-field"><label htmlFor="enquiry-type">Enquiry Type <span>*</span></label><div className="contact-input-wrap"><List size={18} /><select id="enquiry-type" name="type" required value={values.type} onChange={event => update('type', event.target.value)} aria-invalid={!!errors.type} aria-describedby={errors.type ? 'enquiry-type-error' : undefined}><option value="">Select an enquiry type</option>{enquiryTypes.map(type => <option key={type}>{type}</option>)}</select></div>{errors.type && <p id="enquiry-type-error" className="contact-field-error">{errors.type}</p>}</div>
      <div className="contact-field contact-field-message"><label htmlFor="enquiry-message">Your Message <span>*</span></label><div className="contact-input-wrap contact-textarea-wrap"><MessageSquareText size={18} /><textarea id="enquiry-message" name="message" required maxLength={2000} rows={4} placeholder="Type your message here…" value={values.message} onChange={event => update('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'enquiry-message-error' : undefined} /></div>{errors.message && <p id="enquiry-message-error" className="contact-field-error">{errors.message}</p>}</div>
    </div>
    <button className="button contact-send-button" type="submit" disabled={!enabled}><Send size={22} />Send Message<ArrowRight size={20} /></button>
    {!enabled && <p className="contact-form-configuration">WhatsApp enquiries are awaiting number confirmation. Please call {site.phone}.</p>}
    {readyUrl && <div className="contact-enquiry-ready" role="status"><strong>Your message is ready.</strong><p>Please review and send it in WhatsApp to complete your enquiry.</p><a href={readyUrl} target="_blank" rel="noreferrer">Open your prepared WhatsApp message<ArrowRight size={15} /></a></div>}
  </form>;
}

export default function PremiumContact({ full = false }: { full?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const mapEmbedUrl = contactPageMap.embedUrl;
  const mapLink = contactPageMap.directionsUrl;
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('contact-in-view'); observer.disconnect(); }
    }, { threshold: .04 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} className={`premium-contact${full ? ' contact-page' : ''}`} aria-label="Contact and enquiries">
    <span className="contact-corner" aria-hidden="true" />
    <div className="container premium-contact-inner">
      <div className="premium-contact-heading"><span className="premium-contact-eyebrow">GET IN TOUCH</span>{full ? <h1>Contact <em>Kwa’Khuzi</em></h1> : <h2>Contact <em>Kwa’Khuzi</em></h2>}<p>We’re here to help with bookings, enquiries and more. Reach out to us using the details below.</p></div>
      <div className="premium-contact-grid">
        <figure className="contact-venue-photo"><img src={contactPageImage} alt="The actual Kwa’Khuzi two-storey building in the afternoon sun" loading="lazy" width="480" height="640" /><img className="contact-photo-logo" src={site.logo} alt="Kwa’Khuzi Traditional Restaurant" /></figure>
        <div className="contact-business-details">
          <ContactRow icon={<Phone size={22} />} title="Call Us"><a href={site.telephone}>{site.phone}</a></ContactRow>
          <ContactRow icon={<MessageCircle size={22} />} title="WhatsApp"><a href={site.whatsapp} target="_blank" rel="noreferrer">{site.phone}<ArrowRight size={13} /></a></ContactRow>
          <ContactRow icon={<Mail size={22} />} title="Email Us">{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <p>Email address to be confirmed.<br /><span>Reach us by phone or WhatsApp.</span></p>}</ContactRow>
          <ContactRow icon={<MapPin size={23} />} title="Visit Us"><p>{site.location}<br /><span>Mpumalanga, South Africa</span></p></ContactRow>
          <ContactRow icon={<Clock3 size={23} />} title="Operating Hours">{site.openingHours ? <ul className="contact-hours">{site.openingHours.map(row => <li key={row.days}><span>{row.days}</span><span>{row.hours}</span></li>)}</ul> : <p>Hours to be confirmed.<br /><span>Please call before planning your visit.</span></p>}</ContactRow>
        </div>
        <div className="contact-map-column">
          {mapEmbedUrl ? <div className="contact-map-embed"><iframe src={mapEmbedUrl} title="Kwa’Khuzi Traditional Restaurant location" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /><a href={mapLink} target="_blank" rel="noopener noreferrer">Get Directions<ArrowRight size={16} /></a></div> : <div className="contact-map-placeholder"><span className="contact-map-icon"><MapPin size={40} strokeWidth={1.2} /></span><span className="eyebrow">FIND US IN KWAMHLANGA</span><h3>A taste of home.<br />Just around the corner.</h3><p>Near Solomon Mahlangu Stadium,<br />Mpumalanga, South Africa.</p><a className="button" href={site.maps} target="_blank" rel="noreferrer"><MapPin size={17} />Search on Google Maps<ArrowRight size={17} /></a><small>Exact map location awaiting confirmation. Please check your destination with our team.</small></div>}
        </div>
      </div>
    </div>
    <div className="contact-enquiry-section">
      <div className="contact-enquiry-intro"><span className="premium-contact-eyebrow">SEND US A MESSAGE</span><h2>Have a <em>Question?</em></h2><p>Fill in the form and get in touch with our team about your enquiry.</p><span className="contact-enquiry-channel"><MessageCircle size={18} />Continue the conversation on WhatsApp.</span></div>
      <EnquiryForm />
    </div>
  </section>;
}

