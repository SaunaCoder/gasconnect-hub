import express from "express";
import serverless from "serverless-http";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL;
const TEAM_SLUG = process.env.TEAM_SLUG || "ai-web-2026";

const defaultPage = {
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
      placeholder: { en: "Your full name", ru: "Ваше имя" },
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

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function safePagePayload(pageData) {
  if (!pageData || typeof pageData !== "object") {
    return defaultPage;
  }

  return {
    seo: pageData.seo || defaultPage.seo,
    menu: pageData.menu || defaultPage.menu,
    languages: Array.isArray(pageData.languages) ? pageData.languages : defaultPage.languages,
    translations: pageData.translations || defaultPage.translations,
    formFields: Array.isArray(pageData.formFields) ? pageData.formFields : defaultPage.formFields,
    companyInfo: pageData.companyInfo || defaultPage.companyInfo,
  };
}

async function getPageContent() {
  if (!supabase) {
    return defaultPage;
  }

  try {
    const { data, error } = await supabase.from("cms_page").select("*").single();
    if (error || !data) {
      return defaultPage;
    }
    return safePagePayload(data);
  } catch (error) {
    return defaultPage;
  }
}

app.get("/page", async (req, res) => {
  const page = await getPageContent();
  res.json(page);
});

app.post("/contact", async (req, res) => {
  const { name, email, company, message, lang } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const inquiryRecord = {
    name,
    email,
    company: company || "",
    message,
    lang: lang || "en",
    team_slug: TEAM_SLUG,
    created_at: new Date().toISOString(),
  };

  let inquiryId = null;

  if (supabase) {
    try {
      const { data, error } = await supabase.from("inquiries").insert(inquiryRecord).select("id").single();
      if (!error && data && typeof data.id !== "undefined") {
        inquiryId = data.id;
      }
    } catch (error) {
      console.error("Supabase inquiry insert failed", error);
    }
  }

  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return res.status(500).json({ error: "Email configuration is missing" });
  }

  const subject = `[AI-WEB-2026] ${TEAM_SLUG}`;
  const htmlBody = `
    <h1>New inquiry received</h1>
    <p><strong>Inquiry ID:</strong> ${inquiryId ?? "unavailable"}</p>
    <p><strong>Team slug:</strong> ${TEAM_SLUG}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Company:</strong> ${company || "-"}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Language:</strong> ${lang || "en"}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [RESEND_TO_EMAIL],
        subject,
        html: htmlBody,
      }),
    });
  } catch (error) {
    console.error("Resend email failed", error);
  }

  return res.json({ success: true, inquiryId });
});

export const handler = serverless(app);
