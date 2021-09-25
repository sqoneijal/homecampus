import React, { useEffect, useState } from "react";
import { Modal, Button, Row, FormGroup, FormLabel, Col, FormControl } from "react-bootstrap";
import { get, post, notification, isset } from "../../Helpers";

const ModalForms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, detailContent, setDetailContent, setRefreshTable } = props;

   // array
   const [daftarTingkatan, setDaftarTingkatan] = useState([]);
   const [daftarBAB, setDaftarBAB] = useState([]);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [id_tingkatan, setId_tingkatan] = useState("");
   const [id_bab, setId_bab] = useState("");
   const [nama, setNama] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         setId(isset(detailContent, "id"));
         setId_tingkatan(isset(detailContent, "id_tingkatan"));
         setId_bab(isset(detailContent, "id_bab"));
         getBAB(isset(detailContent, "id_tingkatan"));
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
      setErrors({});
      $("#summernote").summernote("destroy");
      setId("");
      setId_tingkatan("");
      setId_bab("");
      setNama("");
      setDaftarBAB([]);
   };

   const getBAB = (id_tingkatan) => {
      post("/admin/judul/getbab", { id_tingkatan: id_tingkatan })
         .then((res) => {
            const { data } = res;
            setDaftarBAB(data);
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
         });
   };

   const getTingkatan = () => {
      get("/admin/judul/gettingkatan")
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
         id_bab: id_bab,
         nama: nama,
         keterangan: $("#summernote").summernote("code"),
      };

      setIsSubmit(true);
      post("/admin/judul/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               if (pageType === "insert") {
                  setNama("");
                  $("#summernote").summernote("code", "");
                  setErrors({});
               } else {
                  clearProps();
               }
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
            <Modal.Title>{pageType === "insert" ? "Tambah" : "Perbaharui"} Judul</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Tingkatan
               </FormLabel>
               <Col md={10} sm={12} className={errors.id_tingkatan ? "has-danger" : ""}>
                  <FormControl
                     value={id_tingkatan}
                     onChange={(e) => {
                        setId_tingkatan(e.target.value);
                        getBAB(e.target.value);
                     }}
                     as="select"
                  >
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
                  BAB
               </FormLabel>
               <Col md={10} sm={12} className={errors.id_bab ? "has-danger" : ""}>
                  <FormControl value={id_bab} onChange={(e) => setId_bab(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     {daftarBAB.map((data, key) => {
                        return (
                           <option value={data.id} key={key}>
                              {data.nama}
                           </option>
                        );
                     })}
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.id_bab}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column md={2} sm={12} className="required">
                  Judul
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
                  <FormControl as="textarea" id="summernote" />
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
