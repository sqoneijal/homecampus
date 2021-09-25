import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { get, notification } from "../../Helpers";
import ReactNotification from "react-notifications-component";
import HTMLReactParser from "html-react-parser";
import { Col, Container, Row } from "react-bootstrap";

const Lists = () => {
   // object
   const [detail, setDetail] = useState({});

   // array
   const [daftarBAB, setDaftarBAB] = useState([]);

   // bool
   const [isLoadingDetailTingkatan, setIsLoadingDetailTingkatan] = useState(true);
   const [isLoadingDaftarBAB, setIsLoadingDaftarBAB] = useState(true);

   const getDetailTingkatan = (id_tingkatan) => {
      get("/tingkatan/getdetail/" + id_tingkatan)
         .then((res) => {
            const { data } = res;
            setDetail(data);

            window.document.title = data.nama;
            document
               .querySelector('meta[name="description"]')
               .setAttribute("content", `Matematika ${data.nama}, ${data.keterangan.replace(/(<([^>]+)>)/gi, "")}`);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDetailTingkatan(false);
         });
   };

   const getBAB = (id_tingkatan) => {
      get("/tingkatan/getbab/" + id_tingkatan)
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
         })
         .then(() => {
            setIsLoadingDaftarBAB(false);
         });
   };

   useEffect(() => {
      getDetailTingkatan(window.segment[2]);
      getBAB(window.segment[2]);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotification />
         <div className="sub_header bg_1">
            <div id="intro_txt">
               <h1>{isLoadingDetailTingkatan ? "Loading..." : detail.nama}</h1>
               {isLoadingDetailTingkatan ? "Loading..." : HTMLReactParser(detail.keterangan)}
            </div>
         </div>
         <div id="position">
            <Container fluid={false}>
               <ul>
                  <li>
                     <a href="/">Beranda</a>
                  </li>
                  <li>{detail.nama}</li>
               </ul>
            </Container>
         </div>
         <div className="container_gray_bg">
            <Container className="margin_60">
               <Row>
                  {isLoadingDaftarBAB
                     ? "Loading..."
                     : daftarBAB.map((data, key) => {
                          return (
                             <Col md={9} sm={12} key={key}>
                                <div className="strip_all_courses_list wow fadeIn" data-wow-delay="0.1s">
                                   <Row>
                                      <Col lg={12} md={12} sm={12}>
                                         <div className="course_list_desc">
                                            <h3>
                                               <a href={`/tingkatan/${data.id_tingkatan}/bab/${data.id}`}>{data.nama}</a>
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
