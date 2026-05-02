import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Snowflake, Truck, ShieldCheck, Globe2, Mail, Phone, MapPin, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import heroImg from "@/assets/hero-cylinders.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const T = {
  en: {
    nav: { about: "About", offer: "What We Offer", contact: "Contact" },
    hero: {
      eyebrow: "Global B2B Refrigerant Supply",
      title: "Reliable refrigerant gases for the world's cooling industry",
      sub: "FrostLine trades and distributes certified refrigerant gases to HVAC manufacturers, wholesalers and industrial partners across 40+ countries.",
      cta: "Contact Us",
      stat1: "40+", stat1l: "Countries served",
      stat2: "15y", stat2l: "Industry experience",
      stat3: "ISO", stat3l: "Certified supply",
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
        { t: "HFC, HFO & natural refrigerants", d: "R134a, R410A, R32, R404A, R1234yf, R290, R744 and blends — packaged in disposable, recovery and ISO containers." },
        { t: "Global logistics & customs", d: "Door-to-door shipping with full IMDG/ADR compliance, export documentation and bonded warehousing." },
        { t: "Quality & certification", d: "AHRI-grade purity, batch test reports and full traceability for every cylinder we deliver." },
        { t: "Long-term contracts", d: "Volume agreements with locked pricing to protect your margins from market swings." },
      ],
    },
    contact: {
      tag: "Contact",
      title: "Request a quote",
      sub: "Tell us your volumes and destination — our trading desk replies within one business day.",
      name: "Full name", company: "Company", email: "Work email", message: "Your inquiry", send: "Send inquiry",
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
      stat1: "40+", stat1l: "Стран поставок",
      stat2: "15 лет", stat2l: "Опыта на рынке",
      stat3: "ISO", stat3l: "Сертифицированно",
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
        { t: "HFC, HFO и природные хладагенты", d: "R134a, R410A, R32, R404A, R1234yf, R290, R744 и смеси — в одноразовых, возвратных и ISO-контейнерах." },
        { t: "Глобальная логистика и таможня", d: "Доставка «от двери до двери» с полным соответствием IMDG/ADR, экспортной документацией и таможенными складами." },
        { t: "Качество и сертификация", d: "Чистота уровня AHRI, протоколы партионных испытаний и полная прослеживаемость каждого баллона." },
        { t: "Долгосрочные контракты", d: "Объёмные соглашения с фиксированной ценой для защиты вашей маржи от колебаний рынка." },
      ],
    },
    contact: {
      tag: "Контакты",
      title: "Запросить расчёт",
      sub: "Укажите объёмы и направление — наш отдел продаж ответит в течение одного рабочего дня.",
      name: "Имя", company: "Компания", email: "Рабочий email", message: "Ваш запрос", send: "Отправить запрос",
      addr: "Роттердам, Нидерланды",
    },
    footer: "Сертифицированная торговля и поставки хладагентов.",
  },
} as const;

function Index() {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "offer", label: t.nav.offer },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 font-bold tracking-tight">
            <Snowflake className="h-5 w-5 text-primary-glow" style={{ color: "var(--primary-glow)" }} />
            <span className="text-lg">FrostLine</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-full border border-border p-0.5 text-xs">
              {(["en", "ru"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {l.toUpperCase()}
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
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 text-foreground">{l.label}</button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {(["en", "ru"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs border ${lang === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="Refrigerant cylinders" className="w-full h-full object-cover" width={1920} height={1280} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.18 0.04 230 / 0.7) 100%)" }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-6">
              {t.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.05]">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              {t.hero.sub}
            </p>
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

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t.about.tag}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{t.about.title}</h2>
          </div>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-foreground"><ShieldCheck className="h-5 w-5 text-accent" /><span className="text-sm font-medium">ISO 9001</span></div>
              <div className="flex items-center gap-2 text-foreground"><Globe2 className="h-5 w-5 text-accent" /><span className="text-sm font-medium">F-Gas registered</span></div>
              <div className="flex items-center gap-2 text-foreground"><Truck className="h-5 w-5 text-accent" /><span className="text-sm font-medium">IMDG / ADR</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="offer" className="py-24 md:py-32" style={{ background: "var(--gradient-cool)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t.offer.tag}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{t.offer.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {t.offer.items.map((item, i) => (
              <div
                key={item.t}
                className="group relative bg-card rounded-xl p-8 border border-border hover:border-accent/40 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{item.t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t.contact.tag}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{t.contact.title}</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t.contact.sub}</p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-foreground"><Mail className="h-5 w-5 text-accent" /><span>trade@frostline.example</span></div>
              <div className="flex items-center gap-3 text-foreground"><Phone className="h-5 w-5 text-accent" /><span>+31 (0) 10 000 0000</span></div>
              <div className="flex items-center gap-3 text-foreground"><MapPin className="h-5 w-5 text-accent" /><span>{t.contact.addr}</span></div>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-card rounded-2xl p-8 border border-border space-y-5"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input id="name" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="company">{t.contact.company}</Label>
                <Input id="company" className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">{t.contact.email}</Label>
              <Input id="email" type="email" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="msg">{t.contact.message}</Label>
              <Textarea id="msg" rows={5} className="mt-2" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
              {t.contact.send}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <Snowflake className="h-4 w-4" style={{ color: "var(--primary-glow)" }} />
            FrostLine
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FrostLine. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
