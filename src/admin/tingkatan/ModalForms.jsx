import React, { useEffect, useState } from "react";
import { Modal, Button, FormGroup, FormLabel, Col, FormControl, Row } from "react-bootstrap";
import { post, notification, isset } from "../../Helpers";

const ModalForms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, detailContent, setDetailContent, setRefreshTable } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [nama, setNama] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         setId(isset(detailContent, "id"));
         setNama(isset(detailContent, "nama"));
         $("#summernote").summernote("code", detailContent.keterangan);
      }
      return () => {};
   }, [openModalForms, pageType, detailContent]);

   const clearProps = () => {
      setOpenModalForms(false);
      setPageType("insert");
      setDetailContent({});
      setId("");
      setNama("");
      setErrors({});
   };

   useEffect(() => {
      if (openModalForms) {
         $(document).ready(function () {
            $("#summernote").summernote({
               height: 300,
            });
         });
      }
      return () => {};
   }, [openModalForms]);

   const submit = () => {
      const formData = {
         pageType: pageType,
         id: id,
         nama: nama,
         keterangan: $("#summernote").summernote("code"),
      };

      setIsSubmit(true);
      post("/admin/tingkatan/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               clearProps();
               setRefreshTable(true);
               $("#summernote").summernote("destroy");
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
            <Modal.Title>{pageType === "insert" ? "Tambah" : "Perbaharui"} Tingkatan</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Nama Tingkat
               </FormLabel>
               <Col md={10} sm={12} className={errors.nama ? "has-danger" : ""}>
                  <FormControl value={nama} onChange={(e) => setNama(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.nama}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-0">
               <FormLabel column md={2} sm={12}>
                  Keterangan
               </FormLabel>
               <Col md={10} sm={12}>
                  <FormControl id="summernote" as="textarea" />
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
