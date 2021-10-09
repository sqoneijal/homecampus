import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { get, notification } from "../Helpers";
import { Container } from "react-bootstrap";

const Navigation = () => {
   // array
   const [daftarTingkatan, setDaftarTingkatan] = useState([]);

   const getTingkatan = () => {
      get("/navigation/gettingkatan")
         .then((res) => {
            const { data } = res;
            setDaftarTingkatan(data);
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
      <Container fluid={true}>
         <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
            <div className="collapse navbar-collapse" id="topnav-menu-content">
               <ul className="navbar-nav">
                  {daftarTingkatan.map((data, key) => {
                     return (
                        <li className="nav-item" key={key}>
                           <a href={`/tingkatan/${data.id}`} className="nav-link" role="button" id={`topnav-${data.id}`}>
                              {data.nama}
                           </a>
                        </li>
                     );
                  })}
               </ul>
            </div>
         </nav>
      </Container>
   );
};
ReactDOM.render(<Navigation />, document.getElementById("navigation"));
