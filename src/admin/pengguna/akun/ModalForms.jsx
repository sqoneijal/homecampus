import React, { useEffect, useState } from "react";
import { Modal, Button, FormGroup, Row, FormLabel, Col, FormControl } from "react-bootstrap";
import { post, notification, isset } from "../../../Helpers";

const ModalForms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, setRefreshTable, detailContent, setDetailContent } = props;

   // object
   const [errors, setErrors] = useState({});

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [id, setId] = useState("");
   const [nama, setNama] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("");
   const [status, setStatus] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         setId(isset(detailContent, "id"));
         setNama(isset(detailContent, "nama"));
         setUsername(isset(detailContent, "username"));
         setEmail(isset(detailContent, "email"));
         setRole(isset(detailContent, "role"));
         setStatus(isset(detailContent, "status"));
      }
      return () => {};
   }, [openModalForms, detailContent, pageType]);

   const clearProps = () => {
      setOpenModalForms(false);
      setPageType("insert");
      setId("");
      setNama("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      setStatus("");
      setDetailContent({});
   };

   const submit = () => {
      const formData = {
         pageType: pageType,
         id: id,
         nama: nama,
         username: username,
         email: email,
         password: password,
         role: role,
         status: status,
      };

      setIsSubmit(true);
      post("/admin/pengguna/akun/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               clearProps();
               setRefreshTable(true);
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
      <Modal show={openModalForms} onHide={clearProps} backdrop="static" dialogClassName="modal-60">
         <Modal.Header closeButton>
            <Modal.Title>{pageType === "insert" ? "Tambah" : "Perbaharui"} Akun Pengguna</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Nama
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
                  <FormControl value={username} onChange={(e) => setUsername(e.target.value)} disabled={pageType === "insert" ? false : true} />
                  <FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Email
               </FormLabel>
               <Col md={10} sm={12} className={errors.email ? "has-danger" : ""}>
                  <FormControl value={email} onChange={(e) => setEmail(e.target.value)} disabled={pageType === "insert" ? false : true} />
                  <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Password
               </FormLabel>
               <Col md={10} sm={12} className={errors.password ? "has-danger" : ""}>
                  <FormControl value={password} onChange={(e) => setPassword(e.target.value)} placeholder={pageType === "update" ? "Kosongkan jika tidak ingin mengganti!" : ""} />
                  <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Role
               </FormLabel>
               <Col md={10} sm={12} className={errors.role ? "has-danger" : ""}>
                  <FormControl value={role} onChange={(e) => setRole(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     <option value="1">Administrator</option>
                     <option value="2">Editor</option>
                     <option value="3">Translator</option>
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.role}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-0">
               <FormLabel column md={2} sm={12} className="required">
                  Status
               </FormLabel>
               <Col md={10} sm={12} className={errors.status ? "has-danger" : ""}>
                  <FormControl value={status} onChange={(e) => setStatus(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     <option value="1">Aktif</option>
                     <option value="0">Suspend</option>
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.status}</FormControl.Feedback>
               </Col>
            </FormGroup>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" size="sm" active={true} className="waves-effect" onClick={clearProps}>
               Batal
            </Button>
            <Button size="sm" active={true} className="waves-effect" onClick={() => (isSubmit ? null : submit())}>
               {isSubmit ? "Loading..." : "Simpan"}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalForms;
