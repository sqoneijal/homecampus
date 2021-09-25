import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import { get, post, notification } from "../../../../Helpers";
import { Container, Row, Col } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";

const Lists = () => {
   // bool
   const [isLoadingDetail, setIsLoadingDetail] = useState(true);
   const [isLoadingDaftarSoal, setIsLoadingDaftarSoal] = useState(true);

   // array
   const [daftarSoal, setDaftarSoal] = useState([]);

   // object
   const [detail, setDetail] = useState({});
   const [detailTingkatan, setDetailTingkatan] = useState({});
   const [detailBAB, setDetailBAB] = useState({});

   const getDaftarSoal = () => {
      const formData = {
         id_judul: window.segment[6],
      };

      setIsLoadingDaftarSoal(true);
      post("/tingkatan/" + window.segment[2] + "/bab/" + window.segment[4] + "/judul/getdaftarsoal", formData)
         .then((res) => {
            const { data } = res;
            setDaftarSoal(data);
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
            setIsLoadingDaftarSoal(false);
         });
   };

   const getDetailBAB = () => {
      const formData = {
         id_bab: window.segment[4],
      };

      post("/tingkatan/" + window.segment[2] + "/bab/getdetail", formData)
         .then((res) => {
            const { data } = res;
            setDetailBAB(data);
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
         });
   };

   const getDetailTingkatan = () => {
      get("/tingkatan/getdetail/" + window.segment[2])
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

   const getDetail = () => {
      const formData = {
         id_judul: window.segment[6],
      };

      setIsLoadingDetail(true);
      post("/tingkatan/" + window.segment[2] + "/bab/" + window.segment[4] + "/judul/getdetail", formData)
         .then((res) => {
            const { data } = res;
            setDetail(data);
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

   useEffect(() => {
      getDetail();
      getDetailTingkatan();
      getDetailBAB();
      getDaftarSoal();
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
                     <a href={`/tingkatan/${window.segment[2]}`}>{detailTingkatan.nama}</a>
                  </li>
                  <li>
                     <a href={`/tingkatan/${window.segment[2]}/bab/${window.segment[4]}`}>{detailBAB.nama}</a>
                  </li>
                  <li>{detail.nama}</li>
               </ul>
            </Container>
         </div>
         <div className="container_gray_bg">
            <Container className="margin_60">
               <Row>
                  {isLoadingDaftarSoal
                     ? "Loading..."
                     : daftarSoal.map((data, key) => {
                          return (
                             <Col md={12} sm={12} key={key}>
                                <div className="strip_all_courses_list wow fadeIn" data-wow-delay="0.1s">
                                   <Row>
                                      <Col lg={12} md={12} sm={12}>
                                         <div className="course_list_desc">
                                            <h3>{data.nama}</h3>
                                            {HTMLReactParser(data.content)}
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
