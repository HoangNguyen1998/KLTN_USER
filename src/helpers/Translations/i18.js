import i18next from "i18next";

import enJson from "./en/index";
import vnJson from "./vn/index";

i18next.init({
  lng: "vn",
  resources: {
    en: {
      translation: enJson
    },
    vn: {
      translation: vnJson
    }
  }
});

export default i18next;
