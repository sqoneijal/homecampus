import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
   useEffect(() => {
      var _Hasync = _Hasync || [];
      _Hasync.push(["Histats.start", "1,4597034,4,400,120,90,00011111"]);
      _Hasync.push(["Histats.fasi", "1"]);
      _Hasync.push(["Histats.track_hits", ""]);
      (function () {
         var hs = document.createElement("script");
         hs.type = "text/javascript";
         hs.async = true;
         hs.src = "//s10.histats.com/js15_as.js";
         document.getElementById("hitstat").appendChild(hs);
      })();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="page-content">
            <Container fluid={true}>
               <Row>
                  <Col xs={12}>
                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{document.title}</h4>
                        <div className="page-title-right">
                           <Breadcrumb className="m-0">
                              <Breadcrumb.Item active>Administrator</Breadcrumb.Item>
                              <Breadcrumb.Item active>{document.title}</Breadcrumb.Item>
                           </Breadcrumb>
                        </div>
                     </div>
                  </Col>
               </Row>
               <Row>
                  <Col xs={12} id="hitstat"></Col>
               </Row>
            </Container>
         </div>
         <footer className="footer">
            <Container fluid={true}>
               <Row>
                  <Col md={6} sm={12}>
                     <script>document.write(new Date().getFullYear());</script>© Nazox.
                  </Col>
                  <Col md={6} sm={12}>
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
ReactDOM.render(<Dashboard />, document.getElementById("root"));
