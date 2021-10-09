import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import HTMLReactParser from "html-react-parser";
import { get, notification } from "../Helpers";

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

   useEffect(() => {
      if (isLoadingDaftarTingkatan === false) {
         $("#masonry").masonry({
            percentPosition: true,
            itemSelector: ".column",
         });
      }
      return () => {};
   }, [isLoadingDaftarTingkatan]);

   return (
      <React.Fragment>
         <div className="page-content">
            <Container fluid={true}>
               <Row style={{ paddingTop: 50 }}>
                  <Col xs={12} className="text-center">
                     <h1>Siap Belajar Matematika</h1>
                     <h3>Kuasai semua keterampilan matematika dasar yang dipecah menjadi potongan-potongan kecil</h3>
                  </Col>
               </Row>
               <Row style={{ paddingTop: 50 }}>
                  {isLoadingDaftarTingkatan ? (
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
                     daftarTingkatan.map((data, key) => {
                        return (
                           <Col md={4} sm={12} xs={12} className="text-center" key={key}>
                              <Card className="border border-primary">
                                 <Card.Header className="bg-transparent border-primary">
                                    <h4 className="my-0 text-primary">
                                       <i className="mdi mdi-bullseye-arrow me-3" />
                                       {data.nama}
                                    </h4>
                                 </Card.Header>
                                 <Card.Body>
                                    {HTMLReactParser(data.keterangan)}
                                    <hr />
                                    <a href={`/tingkatan/${data.id}`} className="card-link">
                                       Selengkapnya...
                                    </a>
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
ReactDOM.render(<Home />, document.getElementById("root"));
