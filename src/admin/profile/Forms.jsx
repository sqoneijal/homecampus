import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import { post, notification } from "../../Helpers";

const Forms = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [avatarImage, setAvatarImage] = useState("");
   const [avatar, setAvatar] = useState("");
   const [nama, setNama] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      setAvatarImage(user.avatar);
      setNama(user.nama);
      setUsername(user.username);
      setEmail(user.email);
      return () => {};
   }, []);

   const submit = () => {
      const formData = {
         id: user.id_user,
         avatar: avatar,
         nama: nama,
         username: username,
         email: email,
         password: password,
         old_avatar: user.avatar_file,
      };

      setIsSubmit(true);
      post("/admin/profile/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               setAvatarImage("/public/assets/images/" + data.new_avatar);
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
      <React.Fragment>
         <ReactNotification />
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
                  <Col md={3} sm={12}>
                     <Card>
                        <Card.Body className="text-center">
                           <img src={avatarImage} className="img-thumbnail img-responsive" />
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={9} sm={12}>
                     <Card>
                        <Card.Body>
                           <FormGroup as={Row}>
                              <FormLabel column md={2} sm={12}>
                                 Avatar
                              </FormLabel>
                              <Col md={10} sm={12} className={errors.avatar ? "has-danger" : ""}>
                                 <FormControl type="file" onChange={(e) => setAvatar(e.target.files[0])} className="form-control" />
                                 <FormControl.Feedback type="invalid">{errors.avatar}</FormControl.Feedback>
                              </Col>
                           </FormGroup>
                           <FormGroup as={Row}>
                              <FormLabel column md={2} sm={12} className="required">
                                 Nama Lengkap
                              </FormLabel>
                              <Col md={10} sm={12} className={errors.nama ? "has-danger" : ""}>
                                 <FormControl value={nama} onChange={(e) => setNama(e.target.value)} />
                                 <FormControl.Feedback type="invalid">{errors.nama}</FormControl.Feedback>
                              </Col>
                           </FormGroup>
                           <FormGroup as={Row}>
                              <FormLabel column md={2} sm={12} className="required">
                                 Username
                              </FormLabel>
                              <Col md={10} sm={12} className={errors.username ? "has-danger" : ""}>
                                 <FormControl value={username} disabled={true} />
                                 <FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
                              </Col>
                           </FormGroup>
                           <FormGroup as={Row}>
                              <FormLabel column md={2} sm={12} className="required">
                                 Email
                              </FormLabel>
                              <Col md={10} sm={12} className={errors.email ? "has-danger" : ""}>
                                 <FormControl value={email} disabled={true} />
                                 <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                              </Col>
                           </FormGroup>
                           <FormGroup as={Row}>
                              <FormLabel column md={2} sm={12}>
                                 Password
                              </FormLabel>
                              <Col md={10} sm={12} className={errors.password ? "has-danger" : ""}>
                                 <FormControl
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Kosongkan jika tidak ingin mengganti dengan yang baru!"
                                 />
                                 <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
                              </Col>
                           </FormGroup>
                           <Col md={{ offset: 2, span: 10 }} sm={12}>
                              <Button className="waves-effect" active={true} onClick={() => (isSubmit ? null : submit())}>
                                 {isSubmit ? "Loading..." : "Update"}
                              </Button>
                           </Col>
                        </Card.Body>
                     </Card>
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
ReactDOM.render(<Forms />, document.getElementById("root"));
