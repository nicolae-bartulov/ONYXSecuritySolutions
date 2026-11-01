// Company details, navigation and CTAs shared by the layout and pages.
// Every value marked TODO(content) is a placeholder: `grep -rn "TODO(content)" src/` lists them.
import { url } from "../lib/url";

export const site = {
  name: "Onyx Security Solutions",
  tagline: "Consult. Design. Secure.",
  description:
    "Recomandăm, instalăm și întreținem sisteme de securitate pentru locuințe, companii și instituții: CCTV, antifracție, interfonie, control acces și automatizări porți.",

  contact: {
    phone: "[Telefon]", // TODO(content)
    phoneHref: "tel:+40700000000", // TODO(content)
    email: "contact@example.com", // TODO(content)
    address: "[Stradă, număr, localitate, județ]", // TODO(content)
    hours: "Luni – Vineri, 09:00 – 18:00", // TODO(content)
    /** Same hours in schema.org format, for search engines. */
    openingHours: "Mo-Fr 09:00-18:00", // TODO(content)
    serviceArea: "[Zona deservită]", // TODO(content)
  },

  legal: {
    companyName: "[Denumire firmă S.R.L.]", // TODO(content)
    cui: "[CUI]", // TODO(content)
    regCom: "[J00/000/0000]", // TODO(content)
    igprLicense: "[Nr. licență IGPR]", // TODO(content)
  },

  /**
   * Quote form, sent through Web3Forms (web3forms.com). To send to another inbox, replace accessKey
   * with the key from that Web3Forms account. An empty accessKey turns sending off: the form then
   * shows a "coming soon" message with the phone number. The key is public by design.
   */
  form: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "113ee90f-7fc9-47b4-a3d4-be224382a63f",
    /** Subject of the email each request arrives as. */
    subject: "Cerere de ofertă de pe site",
  },
};

// Contact is reached through the "Solicită ofertă" button, so it has no nav link (the footer adds one).
export const navLinks = [
  { label: "Soluții", href: url("/solutii") },
  { label: "Despre noi", href: url("/despre-noi") },
];

export const cta = {
  primary: { label: "Solicită ofertă", href: url("/contact#oferta") },
  secondary: { label: "Vezi soluțiile", href: url("/solutii") },
};

/** True when `path` is `href` or one of its sub-pages. */
export const isActive = (path: string, href: string) =>
  path === href || path.startsWith(`${href}/`);
