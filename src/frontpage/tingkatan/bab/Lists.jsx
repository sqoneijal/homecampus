import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import { get, post, notification } from "../../../Helpers";
import HTMLReactParser from "html-react-parser";
import { Container, Row, Col } from "react-bootstrap";

const Lists = () => {
   // bool
   const [isLoadingDetail, setIsLoadingDetail] = useState(true);
   const [isLoadingDaftarJudul, setIsLoadingDaftarJudul] = useState(true);

   // object
   const [detail, setDetail] = useState({});
   const [detailTingkatan, setDetailTingkatan] = useState({});

   // array
   const [daftarJudul, setDaftarJudul] = useState([]);

   const getDaftarJudul = (id_bab) => {
      const formData = {
         id_bab: id_bab,
      };

      setIsLoadingDaftarJudul(true);
      post("/tingkatan/" + window.segment[2] + "/bab/getdaftarjudul", formData)
         .then((res) => {
            const { data } = res;
            setDaftarJudul(data);
         })
         .catch((e) => {
            if (typeof e.response !== "undefined") {
               if (typeof e.response.data.message !== "undefined") {
                  notification(false, e.response.data.message);
               } else {
                  notification(false, e.response.statusText);
               }
            } else {
               notification(false, "Terjadi sesuatu kesalahan.");
            }
         })
         .then(() => {
            setIsLoadingDaftarJudul(false);
         });
   };

   const getDetail = (id_bab) => {
      const formData = {
         id_bab: id_bab,
      };

      setIsLoadingDetail(true);
      post("/tingkatan/" + window.segment[2] + "/bab/getdetail", formData)
         .then((res) => {
            const { data } = res;
            setDetail(data);

            window.document.title = data.nama;
            document
               .querySelector('meta[name="description"]')
               .setAttribute("content", `Matematika ${data.nama}, ${data.keterangan.replace(/(<([^>]+)>)/gi, "")}`);
         })
         .catch((e) => {
            if (typeof e.response !== "undefined") {
               if (typeof e.response.data.message !== "undefined") {
                  notification(false, e.response.data.message);
               } else {
                  notification(false, e.response.statusText);
               }
            } else {
               notification(false, "Terjadi sesuatu kesalahan.");
            }
         })
         .then(() => {
            setIsLoadingDetail(false);
         });
   };

   const getDetailTingkatan = (id_tingkatan) => {
      get("/tingkatan/getdetail/" + id_tingkatan)
         .then((res) => {
            const { data } = res;
            setDetailTingkatan(data);
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
      getDetail(window.segment[4]);
      getDaftarJudul(window.segment[4]);
      getDetailTingkatan(window.segment[2]);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotification />
         <div className="sub_header bg_1">
            <div id="intro_txt">
               <h1>{isLoadingDetail ? "Loading..." : detail.nama}</h1>
               {isLoadingDetail ? "Loading..." : HTMLReactParser(detail.keterangan)}
            </div>
         </div>
         <div id="position">
            <Container fluid={false}>
               <ul>
                  <li>
                     <a href="/">Beranda</a>
                  </li>
                  <li>
                     <a href={"/tingkatan/" + window.segment[2]}>{detailTingkatan.nama}</a>
                  </li>
                  <li>{detail.nama}</li>
               </ul>
            </Container>
         </div>
         <div className="container_gray_bg">
            <Container className="margin_60">
               <Row>
                  {isLoadingDaftarJudul
                     ? "Loading..."
                     : daftarJudul.map((data, key) => {
                          return (
                             <Col md={9} sm={12} key={key}>
                                <div className="strip_all_courses_list wow fadeIn" data-wow-delay="0.1s">
                                   <Row>
                                      <Col lg={12} md={12} sm={12}>
                                         <div className="course_list_desc">
                                            <h3>
                                               <a href={`/tingkatan/${window.segment[2]}/bab/${window.segment[4]}/judul/${data.id}`}>{data.nama}</a>
                                            </h3>
                                            {HTMLReactParser(data.keterangan)}
                                         </div>
                                      </Col>
                                   </Row>
                                </div>
                             </Col>
                          );
                       })}
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));
