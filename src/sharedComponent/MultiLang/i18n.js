import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../MultiLang/translationEN.json";
import translationDE from "../MultiLang/translationDE.json";
import translationSP from "../MultiLang/translationSP.json";


const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationDE
  },
  sp:{
    translation: translationSP
  }

};


i18n
  .use(Backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    lng: "en",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
