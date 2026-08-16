export const CONTACT_PHONE = "01278792538";
export const CONTACT_PHONE_INTL = "+201278792538";
export const CONTACT_EMAIL = "breezyislandresort@gmail.com";
export const WHATSAPP_NUMBER = "201278792538";
export const MAPS_LINK = "https://maps.app.goo.gl/CZNLNLFPkLK8a7Pe7";
export const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3481.9298863842578!2d25.505169075522737!3d29.22561677534606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x147aafc1543920f1%3A0x5b1d90e54b42b1fe!2sBreezy%20Island%20Resort!5e0!3m2!1sen!2seg!4v1786795005278!5m2!1sen!2seg";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;