import logo from '../assets/images/Logo.png';
export const photo = (name: string) => `/images/WhatsApp Image 2026-11-15 at ${name}.webp`;
export const site = {
 socialLinks: {
  facebook: 'https://www.facebook.com/share/1JrTCtUzFB/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/kwakhuzi/',
  tiktok: 'https://www.tiktok.com/@kwakhuzi',
 },
 whatsappConfirmed: true, // Confirmed by the user for WhatsApp enquiries.
 email: 'info@kwakhuzi.co.za',
 openingHours: [
  { days: 'Mon - Thu', hours: '11:00 - 19:00' },
  { days: 'Fri - Sun', hours: '11:00 - 22:00' },
 ],
 googleMapsEmbedUrl: null as string | null, // Add only a confirmed Google Maps embed URL.
 googleReviewUrl: null as string | null,
 copyrightYear: new Date().getFullYear(),
 name: "Kwa’Khuzi Traditional Restaurant", tagline: 'A Taste of Home. A Legacy of Love.',
 phone: '060 522 2038', telephone: 'tel:+27605222038', whatsapp: 'https://wa.me/27605222038',
 location: 'KwaMhlanga, near Solomon Mahlangu Stadium',
 maps: 'https://www.google.com/maps/search/?api=1&query=Kwa%27Khuzi+Traditional+Restaurant+KwaMhlanga',
 logo,
};
export const navigation = [['/', 'Home'], ['/about', 'About Us'], ['/menu', 'Menu'], ['/gallery', 'Gallery'], ['/reviews', 'Reviews'], ['/contact', 'Contact']];

// Floating launcher shares the canonical verified social accounts above.
export const floatingSocialAccounts = [
 { platform: 'whatsapp', label: 'WhatsApp', url: site.whatsapp },
 { platform: 'tiktok', label: 'TikTok', url: site.socialLinks.tiktok },
 { platform: 'instagram', label: 'Instagram', url: site.socialLinks.instagram },
 { platform: 'facebook', label: 'Facebook', url: site.socialLinks.facebook },
];

// Contact-page embed verified against the existing Google reviews listing.
// Google Maps displays 23, Section B/A, 1022 Solomon Mahlangu Rd, KwaMhlanga, 1022.
export const contactPageMap = {
 embedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s1354004297946437266',
 directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kwa%27Khuzi%20Traditional%20Restaurant%2C%20Section%20B%2FA%2C%2023%2C%201022%20Solomon%20Mahlangu%20Rd%2C%20KwaMhlanga%2C%201022%2C%20South%20Africa&destination_place_id=ChIJCzLl6LgJwB4RkhZzM7xjyhI',
};
