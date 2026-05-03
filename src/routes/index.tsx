import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Snowflake, Menu, X, ArrowRight, ShieldCheck, Globe2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import heroImg from "@/assets/hero-cylinders.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Language = "en" | "ru";

type Translation = {
  nav: { about: string; offer: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    stat1: string;
    stat1l: string;
    stat2: string;
    stat2l: string;
    stat3: string;
    stat3l: string;
  };
  about: {
    tag: string;
    title: string;
    p1: string;
    p2: string;
  };
  offer: {
    tag: string;
    title: string;
    items: { t: string; d: string }[];
  };
  contact: {
    tag: string;
    title: string;
    sub: string;
    name: string;
    company: string;
    email: string;
    message: string;
    send: string;
    addr: string;
  };
  footer: string;
};

type PageContent = {
  seo: { title: string; description: string; keywords: string };
  menu: { about: string; offer: string; contact: string };
  languages: Language[];
  translations: Record<Language, Translation>;
  formFields: {
    name: string;
    type: "text" | "email" | "textarea";
    label: Record<Language, string>;
    placeholder: Record<Language, string>;
    required: boolean;
    autoComplete?: string;
  }[];
  companyInfo: { address: Record<Language, string> };
};

const defaultPage: PageContent = {
  seo: {
    title: "FrostLine — B2B Refrigerant Gas Trading & Supply",
    description: "FrostLine supplies certified refrigerant gases (R134a, R410A, R32, R404A) to HVAC distributors and industrial partners worldwide.",
    keywords: "refrigerant, HVAC, supply, cooling, gas trading",
  },
  menu: {
    about: "About",
    offer: "What We Offer",
    contact: "Contact",
  },
  languages: ["en", "ru"],
  translations: {
    en: {
      nav: { about: "About", offer: "What We Offer", contact: "Contact" },
      hero: {
        eyebrow: "Global B2B Refrigerant Supply",
        title: "Reliable refrigerant gases for the world's cooling industry",
        sub: "FrostLine trades and distributes certified refrigerant gases to HVAC manufacturers, wholesalers and industrial partners across 40+ countries.",
        cta: "Contact Us",
        stat1: "40+",
        stat1l: "Countries served",
        stat2: "15y",
        stat2l: "Industry experience",
        stat3: "ISO",
        stat3l: "Certified supply",
      },
      about: {
        tag: "About Us",
        title: "Two decades of trust in cooling",
        p1: "FrostLine is an international trading company specialised in the supply of high-purity refrigerant gases. We bridge certified manufacturers with HVAC distributors, OEMs and industrial end-users worldwide.",
        p2: "Our logistics network, regulatory expertise and long-term producer partnerships ensure consistent quality, transparent pricing and on-time delivery — even under volatile market conditions.",
      },
      offer: {
        tag: "What We Offer",
        title: "A complete refrigerant supply partner",
        items: [
          {
            t: "HFC, HFO & natural refrigerants",
            d: "R134a, R410A, R32, R404A, R1234yf, R290, R744 and blends — packaged in disposable, recovery and ISO containers.",
          },
          {
            t: "Global logistics & customs",
            d: "Door-to-door shipping with full IMDG/ADR compliance, export documentation and bonded warehousing.",
          },
          {
            t: "Quality & certification",
            d: "AHRI-grade purity, batch test reports and full traceability for every cylinder we deliver.",
          },
          {
            t: "Long-term contracts",
            d: "Volume agreements with locked pricing to protect your margins from market swings.",
          },
        ],
      },
      contact: {
        tag: "Contact",
        title: "Request a quote",
        sub: "Tell us your volumes and destination — our trading desk replies within one business day.",
        name: "Full name",
        company: "Company",
        email: "Work email",
        message: "Your inquiry",
        send: "Send inquiry",
        addr: "Rotterdam, Netherlands",
      },
      footer: "Certified refrigerant trading & supply.",
    },
    ru: {
      nav: { about: "О компании", offer: "Услуги", contact: "Контакты" },
      hero: {
        eyebrow: "Глобальные B2B поставки хладагентов",
        title: "Надёжные хладагенты для мировой индустрии охлаждения",
        sub: "FrostLine поставляет сертифицированные хладагенты производителям HVAC, оптовикам и промышленным партнёрам в более чем 40 странах.",
        cta: "Связаться",
        stat1: "40+",
        stat1l: "Стран поставок",
        stat2: "15 лет",
        stat2l: "Опыта на рынке",
        stat3: "ISO",
        stat3l: "Сертифицированно",
      },
      about: {
        tag: "О компании",
        title: "Двадцать лет доверия в охлаждении",
        p1: "FrostLine — международная торговая компания, специализирующаяся на поставках хладагентов высокой чистоты. Мы соединяем сертифицированных производителей с дистрибьюторами HVAC, OEM и промышленными потребителями по всему миру.",
        p2: "Наша логистика, экспертиза в регулировании и долгосрочные партнёрства гарантируют стабильное качество, прозрачные цены и своевременную доставку даже на нестабильном рынке.",
      },
      offer: {
        tag: "Услуги",
        title: "Полный спектр поставок хладагентов",
        items: [
          {
            t: "HFC, HFO и природные хладагенты",
            d: "R134a, R410A, R32, R404A, R1234yf, R290, R744 и смеси — в одноразовых, возвратных и ISO-контейнерах.",
          },
          {
            t: "Глобальная логистика и таможня",
            d: "Доставка «от двери до двери» с полным соответствием IMDG/ADR, экспортной документацией и таможенными складами.",
          },
          {
            t: "Качество и сертификация",
            d: "Чистота уровня AHRI, протоколы партионных испытаний и полная прослеживаемость каждого баллона.",
          },
          {
            t: "Долгосрочные контракты",
            d: "Объёмные соглашения с фиксированной ценой для защиты вашей маржи от колебаний рынка.",
          },
        ],
      },
      contact: {
        tag: "Контакты",
        title: "Запросить расчёт",
        sub: "Укажите объёмы и направление — наш отдел продаж ответит в течение одного рабочего дня.",
        name: "Имя",
        company: "Компания",
        email: "Рабочий email",
        message: "Ваш запрос",
        send: "Отправить запрос",
        addr: "Роттердам, Нидерланды",
      },
      footer: "Сертифицированная торговля и поставки хладагентов.",
    },
  },
  formFields: [
    {
      name: "name",
      type: "text",
      label: { en: "Full name", ru: "Имя" },
      placeholder: { en: "Your full name", ru: "Ваше полное имя" },
      required: true,
      autoComplete: "name",
    },
    {
      name: "company",
      type: "text",
      label: { en: "Company", ru: "Компания" },
      placeholder: { en: "Your company name", ru: "Название вашей компании" },
      required: true,
      autoComplete: "organization",
    },
    {
      name: "email",
      type: "email",
      label: { en: "Work email", ru: "Рабочий email" },
      placeholder: { en: "hello@company.com", ru: "hello@company.com" },
      required: true,
      autoComplete: "email",
    },
    {
      name: "message",
      type: "textarea",
      label: { en: "Your inquiry", ru: "Ваш запрос" },
      placeholder: { en: "Please describe volume, destination and timeline", ru: "Укажите объём, направление и сроки" },
      required: true,
    },
  ],
  companyInfo: {
    address: { en: "Rotterdam, Netherlands", ru: "Роттердам, Нидерланды" },
  },
};

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

async function fetchPage() {
  const response = await fetch("/api/page");
  if (!response.ok) {
    throw new Error("Failed to load page content");
  }
  return response.json();
}

function Index() {
  const [lang, setLang] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data, isLoading } = useQuery<PageContent>(["page"], fetchPage, {
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const page = data ?? defaultPage;
  const t = page.translations[lang] ?? page.translations.en;

  useEffect(() => {
    document.title = page.seo.title;
    setMeta("description", page.seo.description);
    setMeta("keywords", page.seo.keywords);
    setMetaProperty("og:title", page.seo.title);
    setMetaProperty("og:description", page.seo.description);
    document.documentElement.lang = lang;
  }, [lang, page]);

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "offer", label: t.nav.offer },
    { id: "contact", label: t.nav.contact },
  ];

  const { register, handleSubmit, reset, formState } = useForm<Record<string, string>>({
    defaultValues: { name: "", company: "", email: "", message: "" },
  });

  const onSubmit = async (values: Record<string, string>) => {
    setNotification(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang }),
      });

      if (!response.ok) {
        throw new Error("Unable to send inquiry");
      }

      await response.json();
      setNotification(lang === "ru" ? "������ ���������" : "Inquiry sent successfully");
      setSuccess(true);
      reset();
    } catch (error) {
      setNotification(lang === "ru" ? "�� ������� ��������� ������" : "Unable to submit inquiry. Please try again.");
      setSuccess(false);
    }
  };

  const formFields = page.formFields;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 font-bold tracking-tight">
            <Snowflake className="h-5 w-5 text-primary-glow" style={{ color: "var(--primary-glow)" }} />
            <span className="text-lg">FrostLine</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-full border border-border p-0.5 text-xs">
              {page.languages.map((option) => (
                <button
                  key={option}
                  onClick={() => setLang(option)}
                  className={`px-3 py-1 rounded-full transition-colors ${lang === option ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <Button size="sm" className="hidden md:inline-flex" onClick={() => scrollTo("contact")}>{t.hero.cta}</Button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left py-2 text-foreground">
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {page.languages.map((option) => (
                  <button
                    key={option}
                    onClick={() => setLang(option)}
                    className={`px-3 py-1 rounded-full text-xs border ${lang === option ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 opacity-30">
            <img src={heroImg} alt="Refrigerant cylinders" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.18 0.04 230 / 0.7) 100%)" }} />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-6">{t.hero.eyebrow}</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.05]">{t.hero.title}</h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">{t.hero.sub}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo("contact")} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg group">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("offer")} className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {t.nav.offer}
                </Button>
              </div>
              <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl">
                {[
                  [t.hero.stat1, t.hero.stat1l],
                  [t.hero.stat2, t.hero.stat2l],
                  [t.hero.stat3, t.hero.stat3l],
                ].map(([n, l]) => (
                  <div key={l} className="border-l-2 border-accent pl-4">
                    <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{n}</div>
                    <div className="text-xs md:text-sm text-primary-foreground/60 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">{t.about.tag}</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{t.about.title}</h2>
            </div>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>
        </section>

        <section id="offer" className="bg-slate-950/5 border-t border-border py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t.offer.tag}</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">{t.offer.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {t.offer.items.map((item) => (
                <div key={item.t} className="rounded-3xl border border-border bg-background/70 p-8 shadow-card">
                  <h3 className="text-xl font-semibold text-foreground">{item.t}</h3>
                  <p className="mt-3 text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t.contact.tag}</p>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">{t.contact.title}</h2>
              <p className="max-w-xl text-muted-foreground">{t.contact.sub}</p>
              <div className="rounded-3xl border border-border bg-background/70 p-8 shadow-card">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.contact.addr}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="rounded-2xl bg-background p-3">{lang === "ru" ? "����" : "Language"}: {lang.toUpperCase()}</div>
                    <div className="rounded-2xl bg-background p-3">{lang === "ru" ? "���������" : "Reliable"}</div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-border bg-background/70 p-8 shadow-card">
              {formFields.map((field) => (
                <div key={field.name} className="grid gap-2">
                  <Label htmlFor={field.name}>{field.label[lang]}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder[lang]}
                      {...register(field.name, { required: true })}
                      rows={5}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder[lang]}
                      {...register(field.name, { required: true })}
                    />
                  )}
                  {formState.errors[field.name] && (
                    <p className="text-sm text-destructive">{lang === "ru" ? "��� ���� �����������" : "This field is required"}</p>
                  )}
                </div>
              ))}
              {notification && (
                <div className={`rounded-2xl px-4 py-3 text-sm ${success ? "bg-green-500/10 text-emerald-600" : "bg-red-500/10 text-destructive"}`}>
                  {notification}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? (lang === "ru" ? "��������..." : "Sending...") : t.contact.send}
              </Button>
              {isLoading && (
                <p className="text-sm text-muted-foreground">{lang === "ru" ? "�������� �����������..." : "Loading content..."}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">{t.footer}</div>
      </footer>
    </div>
  );
}
