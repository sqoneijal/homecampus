import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
   return (
      <React.Fragment>
         <footer>
            <Container fluid={false}>
               <Row>
                  <Col sm={12} className="text-center">
                     <ul className="ul-inline">
                        <li>
                           <a href="/">Lembar Kerja</a>
                        </li>
                        <li>
                           <a href="/">Kalkulator</a>
                        </li>
                        <li>
                           <a href="/">Matematika Singapura</a>
                        </li>
                        <li>
                           <a href="/">Tentang Kami</a>
                        </li>
                        <li>
                           <a href="/">Kontak</a>
                        </li>
                        <li>
                           <a href="/">FAQ</a>
                        </li>
                        <li>
                           <a href="/">Penafian</a>
                        </li>
                        <li>
                           <a href="/">Kebijakan</a>
                        </li>
                        <li>
                           <a href="/">Panduan Pengguna</a>
                        </li>
                     </ul>
                  </Col>
               </Row>
            </Container>
         </footer>
         <div id="copy">
            <div className="container">© Home Campus {new Date().getFullYear()} - Seluruh hak cipta.</div>
         </div>
      </React.Fragment>
   );
};
export default Footer;
