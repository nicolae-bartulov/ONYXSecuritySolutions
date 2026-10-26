// The eight services, in the order of design doc §5. Used by the home grid, /solutii and the quote form.
// `line` comes from the design doc where it has one; the rest of the copy is a first draft (TODO(content)).
import IconCctv from "../components/icons/IconCctv.astro";
import IconAntifractie from "../components/icons/IconAntifractie.astro";
import IconInterfonie from "../components/icons/IconInterfonie.astro";
import IconControlAcces from "../components/icons/IconControlAcces.astro";
import IconAutomatizari from "../components/icons/IconAutomatizari.astro";
import IconService from "../components/icons/IconService.astro";
import IconConsultanta from "../components/icons/IconConsultanta.astro";
import IconProiectare from "../components/icons/IconProiectare.astro";
import imgCctv from "../assets/services/cctv_homepage_image.png";
import imgAntifractie from "../assets/services/antiefractie_homepage_image.png";
import imgInterfonie from "../assets/services/interfonie_homepage_image.png";
import imgControlAcces from "../assets/services/control_access_homepage_image.png";
import imgAutomatizari from "../assets/services/automatizare_porti_homepage_image.png";
import imgService from "../assets/services/service_mententanta_homepage_image.png";
import imgConsultanta from "../assets/services/consultanta_homepage_image.png";
import type { ServiceSlug } from "./service-slugs";

export interface Service {
  /** Anchor on /solutii and value of ?serviciu= on /contact. */
  slug: ServiceSlug;
  name: string;
  /** Short pair of phrases, e.g. "Acces sigur. Control complet." */
  line: string;
  summary: string;
  details: string[];
  Icon: typeof IconCctv;
  /** Photo for the homepage showcase and /solutii; services without one show a placeholder. */
  image?: ImageMetadata;
  imageAlt?: string;
}

export const services: Service[] = [
  {
    slug: "cctv",
    name: "CCTV",
    line: "Vizibilitate în orice condiții.",
    summary:
      "Sisteme de supraveghere video cu imagine clară zi și noapte, înregistrare continuă și acces de pe telefon.",
    details: [
      "Camere IP pentru interior și exterior, cu infraroșu",
      "Înregistrare locală sau în cloud",
      "Vizualizare de pe telefon și calculator",
      "Detecție inteligentă a mișcării și a persoanelor",
    ],
    Icon: IconCctv,
    image: imgCctv,
    imageAlt: "Cameră de supraveghere montată pe fațada unei case, la amurg",
  },
  {
    slug: "antifractie",
    name: "Antifracție",
    line: "Protecție care contează.",
    summary:
      "Sisteme de alarmă care detectează pătrunderea și anunță imediat, cu posibilitate de conectare la dispecerat.",
    details: [
      "Senzori de mișcare, de deschidere și de spargere geam",
      "Centrale de alarmă cu tastatură și aplicație",
      "Notificări pe telefon în timp real",
      "Conectare la dispecerat de monitorizare",
    ],
    Icon: IconAntifractie,
    image: imgAntifractie,
    imageAlt: "Tastatură de alarmă iluminată pe peretele unei locuințe",
  },
  {
    slug: "interfonie",
    name: "Interfonie",
    line: "Știți cine vă sună la ușă.", // TODO(content): not in the design doc
    summary:
      "Interfoane și videointerfoane pentru case și blocuri, cu deschiderea ușii de la distanță.",
    details: [
      "Videointerfoane pentru locuințe și clădiri de birouri",
      "Sisteme de interfonie pentru blocuri",
      "Răspuns și deschidere de pe telefon",
      "Integrare cu control acces",
    ],
    Icon: IconInterfonie,
    image: imgInterfonie,
    imageAlt: "Videointerfon cu ecran montat lângă ușa de la intrare",
  },
  {
    slug: "control-acces",
    name: "Control acces",
    line: "Acces sigur. Control complet.",
    summary:
      "Stabiliți cine intră, unde și când, cu cartele, coduri sau amprentă, și păstrați evidența fiecărei intrări.",
    details: [
      "Cititoare de cartele, tastaturi și cititoare biometrice",
      "Drepturi de acces pe persoane, zone și intervale orare",
      "Istoric complet al intrărilor",
      "Pontaj pentru angajați",
    ],
    Icon: IconControlAcces,
    image: imgControlAcces,
    imageAlt: "Cititor de cartele montat lângă intrarea unei clădiri de birouri",
  },
  {
    slug: "automatizari-porti",
    name: "Automatizări porți",
    line: "Confort și siguranță zilnică.",
    summary:
      "Automatizări pentru porți batante, culisante și bariere, comandate din telecomandă sau de pe telefon.",
    details: [
      "Porți batante și culisante",
      "Bariere auto pentru parcări",
      "Comandă din telecomandă, de pe telefon sau prin interfon",
      "Fotocelule și dispozitive de siguranță",
    ],
    Icon: IconAutomatizari,
    image: imgAutomatizari,
    imageAlt: "Poartă culisantă automată în fața unei case moderne, la amurg",
  },
  {
    slug: "service-mentenanta",
    name: "Service & mentenanță",
    line: "Sisteme care funcționează mereu.", // TODO(content): not in the design doc
    summary:
      "Verificări periodice și intervenții rapide, ca sistemele de securitate să funcționeze atunci când contează.",
    details: [
      "Contracte de mentenanță preventivă",
      "Intervenții la defecțiuni",
      "Actualizări de software și înlocuiri de echipamente",
      "Preluarea în service a sistemelor existente",
    ],
    Icon: IconService,
    image: imgService,
    imageAlt: "Tehnician care lucrează la un rack de echipamente",
  },
  {
    slug: "consultanta",
    name: "Consultanță",
    line: "Soluția potrivită, de la început.", // TODO(content): not in the design doc
    summary:
      "Evaluăm riscurile locației și vă recomandăm soluția potrivită nevoilor și bugetului dumneavoastră.",
    details: [
      "Evaluarea riscurilor la fața locului",
      "Recomandări de echipamente și soluții",
      "Analiza sistemelor existente",
      "Estimare de buget",
    ],
    Icon: IconConsultanta,
    image: imgConsultanta,
    imageAlt: "Plan de locuință văzut de sus, cu doi oameni în discuție",
  },
  {
    slug: "proiectare",
    name: "Proiectare",
    line: "Fiecare detaliu, planificat.", // TODO(content): not in the design doc
    summary:
      "Proiecte tehnice pentru sisteme de securitate, conforme cu legislația în vigoare și cu cerințele beneficiarului.",
    details: [
      "Analiză de risc la securitatea fizică",
      "Proiecte tehnice pentru sisteme de alarmă și supraveghere video",
      "Documentație pentru avizare",
      "Coordonarea execuției",
    ],
    Icon: IconProiectare,
    // TODO(content): photo
  },
];

/** Options for the "Serviciu dorit" select on the quote form. */
export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));
