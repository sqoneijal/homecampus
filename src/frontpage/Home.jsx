import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactNotificationsComponent from "react-notifications-component";
import HTMLReactParser from "html-react-parser";
import { get, notification } from "../Helpers";
import Slider from "./home/Slider";
import Focus from "./home/Focus";
import Footer from "./Footer";

const Home = () => {
   // bool
   const [isLoadingDaftarTingkatan, setIsLoadingDaftarTingkatan] = useState(true);

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
         })
         .then(() => {
            setIsLoadingDaftarTingkatan(false);
         });
   };

   useEffect(() => {
      getTingkatan();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotificationsComponent />
         <Slider />
         <Container fluid={false} className="margin_60">
            <div className="main_title">
               <h2>Siap Belajar Matematika</h2>
               <p>Kuasai semua keterampilan matematika dasar yang dipecah menjadi potongan-potongan kecil.</p>
            </div>
            <Row>
               {daftarTingkatan.length > 0 ? (
                  daftarTingkatan.map((data, key) => {
                     return (
                        <Col md={6} sm={12} key={key}>
                           <div className="box_feat_home">
                              <i className="iconcustom-education_online"></i>
                              <h3>{data.nama}</h3>
                              {HTMLReactParser(data.keterangan)}
                              <a href={"/tingkatan/" + data.id}>Mulai sekarang...</a>
                           </div>
                        </Col>
                     );
                  })
               ) : (
                  <Col sm={12}>{isLoadingDaftarTingkatan ? "Loading..." : ""}</Col>
               )}
            </Row>
            <hr className="more_margin" />
            <Focus />
            <hr className="more_margin" />
         </Container>
         <Footer />
      </React.Fragment>
   );
};
ReactDOM.render(<Home />, document.getElementById("root"));
