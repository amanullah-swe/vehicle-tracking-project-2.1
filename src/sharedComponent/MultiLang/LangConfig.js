import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "",
  resources: {
    en: {
      translation: {
        Hi: "Hi",
        Actions: "Actions"
      }
    },
    tm: {
      translation: {
        Hi: "வணக்கம்",
        Actions: "செயல்கள்"
      }
    },
    sp: {
      translation: {
        Hi: "Hola",
        Actions: "Comportamiento"
      }
    },
    tl: {
      translation: {
        Hi: "హాయ్",
        Actions: "చర్యలు"
      }
    }
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;
