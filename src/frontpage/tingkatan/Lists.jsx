import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import { get, isset, notification } from "../../Helpers";
import HTMLReactParser from "html-react-parser";

const Lists = () => {
   // object
   const [detailTingkatan, setDetailTingkatan] = useState({});
   const [daftarJudul, setDaftarJudul] = useState({});

   // bool
   const [isLoadingDaftarBAB, setIsLoadingDaftarBAB] = useState(true);

   // array
   const [daftarBAB, setDaftarBAB] = useState([]);

   const getDaftarJudul = () => {
      get("/tingkatan/getjudul")
         .then((res) => {
            const { data } = res;
            setDaftarJudul(data);
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

   const getDaftarBAB = (id_tingkatan) => {
      get("/tingkatan/getbab/" + id_tingkatan)
         .then((res) => {
            const { data } = res;
            setDaftarBAB(data);
            getDaftarJudul();
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         });
   };

   const getDetailTingkatan = (id_tingkatan) => {
      get("/tingkatan/getdetail/" + id_tingkatan)
         .then((res) => {
            const { data } = res;
            setDetailTingkatan(data);
            getDaftarBAB(id_tingkatan);
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
      getDetailTingkatan(segment[2]);
      return () => {};
   }, []);

   useEffect(() => {
      if (isLoadingDaftarBAB === false) {
         $("#masonry").masonry({
            percentPosition: true,
            itemSelector: ".column",
         });
      }
      return () => {};
   }, [isLoadingDaftarBAB]);

   return (
      <React.Fragment>
         <ReactNotification />
         <div className="page-content">
            <Container fluid={true}>
               <Row style={{ paddingTop: 50 }}>
                  <Col xs={12} className="text-center">
                     <h1>{isset(detailTingkatan, "nama")}</h1>
                     <h3>{HTMLReactParser(`${detailTingkatan.keterangan}`)}</h3>
                  </Col>
               </Row>
               <Row style={{ paddingTop: 50 }} id="masonry">
                  {isLoadingDaftarBAB ? (
                     <React.Fragment>
                        <Col md={4} sm={12} xs={12}>
                           <Card>
                              <Card.Body className="placeholder" style={{ height: 100 }} />
                           </Card>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                           <Card>
                              <Card.Body className="placeholder" style={{ height: 100 }} />
                           </Card>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                           <Card>
                              <Card.Body className="placeholder" style={{ height: 100 }} />
                           </Card>
                        </Col>
                     </React.Fragment>
                  ) : (
                     daftarBAB.map((data, key) => {
                        return (
                           <Col md={4} sm={12} xs={12} key={key} className="column">
                              <Card className="border border-primary">
                                 <Card.Header className="bg-transparent border-primary text-center">
                                    <h4 className="my-0 text-primary">
                                       <i className="mdi mdi-bullseye-arrow me-3" />
                                       {data.nama}
                                    </h4>
                                 </Card.Header>
                                 <Card.Body>
                                    {HTMLReactParser(data.keterangan)}
                                    <hr />
                                    {typeof daftarJudul[data.id] !== "undefined" ? (
                                       <ol style={{ fontSize: 17, fontWeight: "bold" }}>
                                          {daftarJudul[data.id].map((a, b) => {
                                             return (
                                                <li key={b}>
                                                   <a href={`/judul/${a.id}`}>{a.nama}</a>
                                                </li>
                                             );
                                          })}
                                       </ol>
                                    ) : (
                                       <></>
                                    )}
                                 </Card.Body>
                              </Card>
                           </Col>
                        );
                     })
                  )}
               </Row>
            </Container>
         </div>
         <footer className="footer">
            <Container fluid={true}>
               <Row>
                  <Col md={12} sm={12}>
                     <div className="text-sm-end d-none d-sm-block">
                        Crafted with <i className="mdi mdi-heart text-danger" /> by Sqone.developer
                     </div>
                  </Col>
               </Row>
            </Container>
         </footer>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));