import React, { useState } from "react";
import { Button, Col, Container, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactNotificationsComponent from "react-notifications-component";
import { post, notification } from "./Helpers";

const Login = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   // object
   const [errors, setErrors] = useState({});

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         username: username,
         password: password,
      };

      setIsSubmit(true);
      post("/login/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               if (data.role === "1") {
                  open("/admin/dashboard", "_parent");
               } else if (data.role === "2") {
                  open("/editor/dashboard", "_parent");
               } else if (data.role === "3") {
                  open("/translator/dashboard", "_parent");
               }
            }
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
            setIsSubmit(false);
         });
   };

   return (
      <>
         <ReactNotificationsComponent />
         <Container fluid={true} className="p-0">
            <Row className="g-0">
               <Col lg={4} sm={12}>
                  <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                     <div className="w-100">
                        <Row className="justify-content-center">
                           <Col lg={9} sm={12}>
                              <div>
                                 <div className="text-center">
                                    <div>
                                       <a href="/">
                                          <img src="/assets/images/home_page_logo.png" alt="" height="20" className="auth-logo logo-dark mx-auto" />
                                          <img src="/assets/images/home_page_logo.png" alt="" height="20" className="auth-logo logo-light mx-auto" />
                                       </a>
                                    </div>
                                    <h4 className="font-size-18 mt-4">Selamat Datang Kembali !</h4>
                                    <p className="text-muted">Silahkan login terlebih dahulu.</p>
                                 </div>
                                 <div className="p-2 mt-5">
                                    <Form onSubmit={submit}>
                                       <div className="mb-3 auth-form-group-custom mb-4">
                                          <i className="ri-user-2-line auti-custom-input-icon" />
                                          <FormLabel htmlFor="username">Username</FormLabel>
                                          <FormControl
                                             value={username}
                                             onChange={(e) => setUsername(e.target.value)}
                                             id="username"
                                             placeholder="Masukkan username"
                                             autoFocus={true}
                                          />
                                       </div>
                                       <div className="mb-3 auth-form-group-custom mb-4">
                                          <i className="ri-lock-2-line auti-custom-input-icon" />
                                          <FormLabel htmlFor="userpassword">Password</FormLabel>
                                          <FormControl
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             type="password"
                                             id="userpassword"
                                             placeholder="Masukkan password"
                                          />
                                       </div>
                                       <div className="mt-4 text-center">
                                          <Button variant="primary" className="w-md waves-effect waves-light" type="submit">
                                             {isSubmit ? "Loading..." : "Masuk"}
                                          </Button>
                                       </div>
                                       {/* <div className="mt-4 text-center">
                                       <a href="auth-recoverpw.html" className="text-muted">
                                          <i className="mdi mdi-lock me-1"></i> Forgot your password?
                                       </a>
                                    </div> */}
                                    </Form>
                                 </div>
                                 <div className="mt-5 text-center">
                                    <p>
                                       Crafted with <i className="mdi mdi-heart text-danger" /> by Sqone.developer
                                    </p>
                                 </div>
                              </div>
                           </Col>
                        </Row>
                     </div>
                  </div>
               </Col>
               <div className="col-lg-8">
                  <div className="authentication-bg" />
               </div>
            </Row>
         </Container>
      </>
   );
};
ReactDOM.render(<Login />, document.getElementById("root"));
