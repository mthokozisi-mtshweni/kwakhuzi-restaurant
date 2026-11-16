import logo from '../assets/images/Logo.png';
export const photo = (name: string) => `/images/WhatsApp Image 2026-11-15 at ${name}.webp`;
export const site = {
 socialLinks: { facebook: null as string | null, instagram: null as string | null, tiktok: null as string | null },
 whatsappConfirmed: true, // Confirmed by the user for WhatsApp enquiries.
 email: null as string | null,
 openingHours: null as { days: string; hours: string }[] | null,
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

// Verified accounts for the floating launcher; other components remain unchanged.
export const floatingSocialAccounts = [
 { platform: 'whatsapp', label: 'WhatsApp', url: site.whatsapp },
 { platform: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@kwakhuzi' },
 { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/kwakhuzi/' },
 { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1JrTCtUzFB/?mibextid=wwXIfr' },
];
