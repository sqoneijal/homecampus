import axios from "axios";
import { store } from "react-notifications-component";

export const post = (url, form = [], config = {}) => {
   let formData = new FormData();

   formData.append("user_modified", window.user.username);
   Object.keys(form).map((data) => {
      formData.append(data, form[data]);
   });

   window.Pace.restart();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return axios.post(url, formData, config);
};

export const get = (url) => {
   window.Pace.restart();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return axios.get(url);
};

export const notification = (status, msg_response, duration = 2000) => {
   store.addNotification({
      title: status ? "Berhasil" : "Peringatan",
      message: msg_response,
      type: status ? "success" : "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: {
         duration: duration,
         onScreen: true,
      },
   });
};

export const isset = (content = {}, obj) => {
   if (typeof content[obj] !== "undefined") {
      return content[obj];
   } else {
      return "";
   }
};

export var tgl_indo = (string) => {
   if (typeof string !== "undefined" && string !== null) {
      var bulanIndo = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

      var tanggal = string.split("-")[2];
      var bulan = string.split("-")[1];
      var tahun = string.split("-")[0];

      if (typeof tanggal !== "undefined" && typeof bulanIndo[Math.abs(bulan)] !== "undefined" && typeof tahun !== "undefined") {
         return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
      } else {
         return "-";
      }
   } else {
      return "-";
   }
};

export const serialize = (obj) => {
   let str = [];
   for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   }
   return str.join("&");
};
