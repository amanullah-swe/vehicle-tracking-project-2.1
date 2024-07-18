import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useTranslation } from "react-i18next";

const pdfFormat = (pdfData) => {
  // const { t, i18n } = useTranslation();
 
  // let chatsData = await getExportChat()
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  
  const title = "Administrator";
  const headers = [
    
    ["Sr. No.", "Name", "Email", "Mobile Number"],
  ];
  var data = [];

  pdfData.map((item, index) => {
    data.push([index + 1, item.user_name, item.user_email, item.user_mobile]);
  });

  let content = {
    headStyles : {fillColor: "#9c4900"},
    theme:"grid",
    pageBreak:"auto",
    bodyStyles: { fillColor: "#f6efe9" },
    styles: { fillColor: "#9c4900" },
    head: headers,
    title:title,
    body: data,

  };

  doc.text(title, marginLeft, 25);
  doc.autoTable(content);
  doc.save("VT.pdf");
  return <div></div>;
};

export default pdfFormat;
