import { React, useContext } from "react";
import { AppContext } from "../context/AppContext";
export const DateDDMMYYYY = (inputDate) => {
  const { DateFormatConfig } = useContext(AppContext);
  let date = new Date(inputDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  //dd-mm-yyyy
  //YYYY-MM-DD
  //MM-DD-YYYY
  //dd/mm/yyyy

  if (DateFormatConfig === "dd-mm-yyyy") {
    var formattedDate = `${day < 10 ? 0 : ""}${day}-${
      month < 10 ? 0 : ""
    }${month}-${year}`;
  } else if (DateFormatConfig === "YYYY-MM-DD") {
    var formattedDate = `${year}-${month < 10 ? 0 : ""}${month}-${
      day < 10 ? 0 : ""
    }${day}`;
  } else if (DateFormatConfig === "MM-DD-YYYY") {
    var formattedDate = `${month < 10 ? 0 : ""}${month}-${
      day < 10 ? 0 : ""
    }${day}-${year}`;
  } else if (DateFormatConfig === "DD/MM/YYYY") {
    var formattedDate = `${day < 10 ? 0 : ""}${day}/${
      month < 10 ? 0 : ""
    }${month}/${year}`;
  }
  return formattedDate;
};

export const dateInYYYYMMDDFormat = (inputDate) => {
  let date = new Date(inputDate);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDate = `${year}-${month < 10 ? 0 : ""}${month}-${
    day < 10 ? 0 : ""
  }${day}`;
  return formattedDate;
};

export const dateDDMMYYYYInSlash = (inputDate) => {
  let date = new Date(inputDate);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDate = `${day < 10 ? 0 : ""}${day}/${
    month < 10 ? 0 : ""
  }${month}/${year}`;
  return formattedDate;
};
export const monthNameDateFormate = (inputDate) => {
  let date = new Date(inputDate);
  date.setMonth(date.getMonth() + 1);
  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  let formattedDate = `${month} ${day < 10 ? "0" : ""}${day} ${year}`;
  return formattedDate;
};

export const dateDDMMYYYYInDash = (inputDate) => {
  let date = new Date(inputDate);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDate = `${day < 10 ? 0 : ""}${day}-${
    month < 10 ? 0 : ""
  }${month}-${year}`;
  return formattedDate;
};

export const dateDMMYYYYBySplitInDash = (inputDate) => {
  let splittedDate = inputDate && inputDate?.split("T");
  let date = splittedDate[0] && new Date(splittedDate[0]);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDate = `${day < 10 ? 0 : ""}${day}-${
    month < 10 ? 0 : ""
  }${month}-${year}`;
  return formattedDate;
};


function encodeString(str) {
  return btoa(str);
}

// Function to decode a Base64 encoded string
function decodeString(encodedStr) {
  return atob(encodedStr);
}

// Example usage
const originalString = "06/17/2024";
const encodedString = encodeString(originalString);
console.log("Encoded String:", encodedString);

const decodedString = decodeString(encodedString);
console.log("Decoded String:", decodedString);



export const mapvalue = () => {
  let targetDate = new Date("08/17/2024");
  if (targetDate < new Date()) {
    return false;
  } else {
    return true;
  }
};
export const getTime = (inputTime) => {
  let date = new Date(inputTime);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  // 04:04:53 AM
  let displayTime = `${hour}:${minutes}:${second}`;
  return displayTime;
};

export const latestDate = (inputDate, DateFormatConfig) => {
  // const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  //  let data =incomingDate? incomingDate?.toString().replace("00:00:00",new Date().toLocaleTimeString(undefined, options)):null
  //  let latestDate= data?new Date(data).toISOString().slice(0, 10):""
  // return latestDate?latestDate:"";

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  let datanew = inputDate
    ? inputDate
        ?.toString()
        .replace("00:00:00", new Date().toLocaleTimeString(undefined, options))
    : null;
  const date = datanew ? new Date(datanew) : "";
  const day = date ? String(date.getDate()).padStart(2, "0") : "";
  const month = date ? String(date.getMonth() + 1).padStart(2, "0") : "";
  const year = date ? date.getFullYear() : "";
  if (date && day && month && year) {
    switch (DateFormatConfig) {
      case "dd-mm-yyyy":
        return `${day}-${month}-${year}`;
      case "yyyy-MM-dd":
        return `${year}-${month}-${day}`;
      case "MM-dd-yyyy":
        return `${month}-${day}-${year}`;
      case "dd/MM/yyyy":
        return `${day}/${month}/${year}`;
      case "yyyy/MM/dd":
        return `${year}/${month}/${day}`;

      default:
        return "";
    }
  }
  return "";
};

export const convertGMTToLocal = (gmtDate) => {
  // Create a Date object from the GMT datetime string
  const gmt = new Date(gmtDate);
  // Get the user's local timezone offset in minutes
  const offsetMinutes = gmt.getTimezoneOffset();
  // Calculate the offset in milliseconds (positive for GMT+ and negative for GMT-)
  const offsetMilliseconds = offsetMinutes * 60 * 1000;
  // Apply the offset to the GMT datetime to get the local datetime
  const localTime = new Date(gmt.getTime() - offsetMilliseconds);
  return localTime + "";
};

export let countriesWithShortCode = {
  AF: "Afghanistan",
  AX: "Åland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo (Brazzaville)",
  CD: "Congo (Kinshasa)",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Côte d'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard and Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong, SAR China",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea (North)",
  KR: "Korea (South)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao PDR",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao, SAR China",
  MK: "Macedonia, Republic of",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthélemy",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten (Dutch part)",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen Islands",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic (Syria)",
  TW: "Taiwan, Republic of China",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States of America",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela (Bolivarian Republic)",
  VN: "Viet Nam",
  VI: "Virgin Islands, US",
  WF: "Wallis and Futuna Islands",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};
//  const kilometers = 10;
export const ConvertKilometersToMiles = (input, unit) => {
  // const { ConvertKilometersMiles } = useContext(AppContext);
const ConvertKilometersMiles = localStorage.customer_distance_unit ? localStorage.customer_distance_unit : ""
  let convertedValue;

  if (ConvertKilometersMiles == "km") {
    convertedValue = input;
    return `${convertedValue} km`;
    // alert("inside the kmmmmmmmmmmmmmmmmm",convertedValue)
  } else if (ConvertKilometersMiles == "miles") {
    convertedValue = input * 0.62137119;
    // alert("inside the milesssssssssssssssss",convertedValue)
    return `${convertedValue?.toFixed(2)} miles`;
  } else {
    console.error("Invalid unit provided");
    return null;
  }

  // return convertedValue  ;

  // console.log(convertedValue,"convertedvalueeeeeeeeeeeeeeeeeeeeee");
};
  export const TimeFormatForAll = (input) => {
  const { TimeFormat } = useContext(AppContext);

  // Split the input string to extract hours, minutes, and seconds
  const [hoursStr, minutesStr, secondsStr] = input.split(':');

  // Parse the hours, minutes, and seconds into integers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  // Create a new Date object with the current date and extracted time
  const dateObject = new Date();
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(seconds);

  if (TimeFormat == "12") {
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";
    const timeformatcheck = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${period}`;
    return timeformatcheck;
  } else if (TimeFormat == "24") {
    const timeformatcheck = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return timeformatcheck;
  }
};
export const ConvertTemperatureUnit = (input) => {
  // const { ConvertTemperature } = useContext(AppContext);
  const ConvertTemperature = localStorage.customer_temperature_unit ? localStorage.customer_temperature_unit : ""
  let convertedTemperatureunit;
  if (ConvertTemperature === "celsius") {
     return convertedTemperatureunit = ` ${(input * 9/5) + 32}°F`;
  } else if (ConvertTemperature === "fahrenheit") {
     return convertedTemperatureunit = `  ${(input - 32) * 5/9}°C`;
  } else if (ConvertTemperature === "kelvin") {
   return convertedTemperatureunit = `  ${((input - 273.15) * 9/5) + 32}°K`;
  }
  
  return convertedTemperatureunit;
};