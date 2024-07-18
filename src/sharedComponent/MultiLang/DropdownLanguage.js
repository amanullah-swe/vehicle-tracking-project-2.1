/* import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";

const DropdownLanguage = () => {
  const { SetChangeLang } = useContext(AppContext);

  const { i18n, t } = useTranslation();

  const [language, setLanguage] = useState("en");
  SetChangeLang(t);

   const handleLangChange = (status) => {
    // console.log(status);
     const lang = status;
    //  console.log(lang);
    setLanguage(status);
     i18n.changeLanguage(status);
   };

  return (
    <>
  
          <button  onClick={(e)=>{handleLangChange("en")}}>{t("English")}</button>
       <button onClick={(e)=>{handleLangChange("ar")}}>{t("Arabic")}</button>
       <button onClick={(e)=>{handleLangChange("sp")}}>{t("Spanish ")}</button>
    </>
  );
};

export default DropdownLanguage;
 */




/////////Taleeb's Code//////////////////////////////////
import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";
import { useSelector } from "react-redux";

const DropdownLanguage = () => {
  const { SetChangeLang } = useContext(AppContext);
  const { i18n, t } = useTranslation();
  const addonSettingData = useSelector((state) => state.auth.addonModule);

  // Get the language preference from local storage or default to 'en'
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    // Set the language in i18n when the component mounts
    setLanguage(localStorage.getItem('language'))
    i18n.changeLanguage(language);
    
  }, [i18n, language]);

  const handleLangChange = (status) => {
    setLanguage(status);
    // Store the selected language in local storage
    localStorage.setItem("language", status);
    i18n.changeLanguage(status);
  };

 

  return (
    <>
     

<button onClick={() => handleLangChange("en")} style={{ backgroundColor : localStorage.getItem('language')==='en' && '#9C4900', borderRadius:'0.2rem'}}>
  <span style={{ color: localStorage.getItem('language') === 'en' && 'white', fontSize : '0.9rem' , paddingLeft:'2rem', paddingRight:'2rem' } }>{t("English")}</span>
</button>
{addonSettingData.addon_ghatke == 1 ? <></> :
<>
<button onClick={() => handleLangChange("ar")} style={{ backgroundColor : localStorage.getItem('language')==='ar' && '#9C4900', borderRadius:'0.2rem'}}>
<span style={{ color: localStorage.getItem('language') === 'ar' && 'white', fontSize : '0.9rem' , paddingLeft:'2rem', paddingRight:'2rem' } }>{t("Arabic")}</span>
</button>
<button onClick={() => handleLangChange("sp")} style={{ backgroundColor : localStorage.getItem('language')==='sp' && '#9C4900', borderRadius:'0.2rem'}}>
<span style={{ color: localStorage.getItem('language') === 'sp' && 'white', fontSize : '0.9rem' , paddingLeft:'2rem', paddingRight:'2rem' } }>{t("Spanish")}</span>
</button>
</>}

    </>
  );
};

export default DropdownLanguage;
