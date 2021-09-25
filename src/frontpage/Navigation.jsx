import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { get, notification } from "../Helpers";
import ReactNotification from "react-notifications-component";

const Navigation = () => {
   // array
   const [daftarTingkatan, setDaftarTingkatan] = useState([]);

   // object
   const [daftarBAB, setDaftarBAB] = useState([]);

   // string
   const [id_tingkatan, setId_tingkatan] = useState("");

   const getTingkatan = () => {
      get("/navigation/gettingkatan")
         .then((res) => {
            const { data } = res;
            setDaftarTingkatan(data);
            getBAB();
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         });
   };

   const getBAB = () => {
      get("/navigation/getbab")
         .then((res) => {
            const { data } = res;
            setDaftarBAB(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         });
   };

   useEffect(() => {
      getTingkatan();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotification />
         <ul className="side-nav-menu">
            {daftarTingkatan.map((data, key) => {
               return (
                  <li key={key} className={typeof daftarBAB[data.id] !== "undefined" ? "item-has-children" : ""}>
                     <a
                        href={typeof daftarBAB[data.id] !== "undefined" ? "#" : "/tingkatan/" + data.id}
                        className={id_tingkatan === data.id ? "submenu-open" : ""}
                        onClick={(e) => {
                           if (typeof daftarBAB[data.id] !== "undefined") {
                              setId_tingkatan(data.id);
                           }
                        }}
                     >
                        {data.nama}
                     </a>
                     {typeof daftarBAB[data.id] !== "undefined" ? (
                        <ul className="sub-menu" style={{ display: data.id === id_tingkatan ? "block" : "none" }}>
                           {daftarBAB[data.id].map((a, b) => {
                              return (
                                 <li key={b}>
                                    <a href={"/tingkatan/" + a.id_tingkatan + "/bab/" + a.id}>{a.nama}</a>
                                 </li>
                              );
                           })}
                        </ul>
                     ) : (
                        <></>
                     )}
                  </li>
               );
            })}
         </ul>
         <div id="social">
            <ul>
               <li>
                  <a href="#">
                     <i className="icon-facebook"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="icon-twitter"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="icon-google"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="icon-linkedin"></i>
                  </a>
               </li>
            </ul>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Navigation />, document.getElementById("side-nav"));
