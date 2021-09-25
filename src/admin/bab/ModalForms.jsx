import React, { useEffect, useState } from "react";
import { Modal, Button, Row, FormGroup, FormLabel, Col, FormControl } from "react-bootstrap";
import { get, post, notification, isset } from "../../Helpers";

const ModalForms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, detailContent, setDetailContent, setRefreshTable } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [daftarTingkatan, setDaftarTingkatan] = useState([]);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [id_tingkatan, setId_tingkatan] = useState("");
   const [nama, setNama] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         setId(isset(detailContent, "id"));
         setId_tingkatan(isset(detailContent, "id_tingkatan"));
         setNama(isset(detailContent, "nama"));
         $("#summernote").summernote("code", detailContent.keterangan);
      }
      return () => {};
   }, [detailContent, pageType, openModalForms]);

   const clearProps = () => {
      setOpenModalForms(false);
      setPageType("insert");
      setDetailContent({});
      setDaftarTingkatan([]);
      setId("");
      setId_tingkatan("");
      setNama("");
      setErrors({});
   };

   const getTingkatan = () => {
      get("/admin/bab/gettingkatan")
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
         });
   };

   useEffect(() => {
      if (openModalForms) {
         getTingkatan();
         $(document).ready(() => {
            $("#summernote").summernote({
               height: 200,
            });
         });
      }
      return () => {};
   }, [openModalForms]);

   const submit = () => {
      const formData = {
         pageType: pageType,
         id: id,
         id_tingkatan: id_tingkatan,
         nama: nama,
         keterangan: $("#summernote").summernote("code"),
      };

      setIsSubmit(true);
      post("/admin/bab/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               $("#summernote").summernote("destroy");
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
            <Modal.Title>{pageType === "insert" ? "Tambah" : "Perbaharui"} BAB</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Tingkatan
               </FormLabel>
               <Col md={10} sm={12} className={errors.id_tingkatan ? "has-danger" : ""}>
                  <FormControl value={id_tingkatan} onChange={(e) => setId_tingkatan(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     {daftarTingkatan.map((data, key) => {
                        return (
                           <option value={data.id} key={key}>
                              {data.nama}
                           </option>
                        );
                     })}
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.id_tingkatan}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Judul BAB
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
