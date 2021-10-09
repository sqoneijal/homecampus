import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import { get, notification, isset } from "../../Helpers";
import HTMLReactParser from "html-react-parser";

const Lists = () => {
   // object
   const [detailJudul, setDetailJudul] = useState({});

   // bool
   const [isLoadingDaftarSoal, setIsLoadingDaftarSoal] = useState(true);

   // array
   const [daftarSoal, setDaftarSoal] = useState([]);

   const getDaftarsoal = (id_judul) => {
      get("/judul/getdaftarsoal/" + id_judul)
         .then((res) => {
            const { data } = res;
            setDaftarSoal(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarSoal(false);
         });
   };

   const getDetailJudul = (id_judul) => {
      get("/judul/getdetailjudul/" + id_judul)
         .then((res) => {
            const { data } = res;
            setDetailJudul(data);
            getDaftarsoal(id_judul);
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
      getDetailJudul(segment[2]);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotification />
         <div className="page-content">
            <Container fluid={true}>
               <Row style={{ paddingTop: 50 }}>
                  <Col xs={12} className="text-center">
                     <h1>{isset(detailJudul, "nama")}</h1>
                     <h3>{HTMLReactParser(`${detailJudul.keterangan}`)}</h3>
                  </Col>
               </Row>
               <Row style={{ paddingTop: 50 }}>
                  <Col xs={12}>
                     {isLoadingDaftarSoal ? (
                        <Card>
                           <Card.Body className="placeholder" style={{ height: 150 }} />
                        </Card>
                     ) : (
                        daftarSoal.map((data, key) => {
                           return (
                              <Card key={key} className="border border-primary">
                                 <Card.Header className="bg-transparent border-primary">
                                    <h4 className="my-0 text-primary">
                                       <i className="mdi mdi-bullseye-arrow me-3" />
                                       {data.nama}
                                    </h4>
                                 </Card.Header>
                                 <Card.Body>{HTMLReactParser(`${data.content}`)}</Card.Body>
                              </Card>
                           );
                        })
                     )}
                  </Col>
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
