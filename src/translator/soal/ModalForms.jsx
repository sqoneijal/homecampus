import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { get, post, notification, isset } from "../../Helpers";

const ModalForms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, detailContent, setDetailContent, setRefreshTable } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [daftarTingkatan, setDaftarTingkatan] = useState([]);
   const [daftarBAB, setDaftarBAB] = useState([]);
   const [daftarJudul, setDaftarJudul] = useState([]);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [id_judul, setId_judul] = useState("");
   const [nama, setNama] = useState("");
   const [id_tingkatan, setId_tingkatan] = useState("");
   const [id_bab, setId_bab] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         getBAB({ id_tingkatan: isset(detailContent, "id_tingkatan") });
         getJudul({ id_bab: isset(detailContent, "id_bab") });

         setId(isset(detailContent, "id_soal"));
         setId_judul(isset(detailContent, "id_judul"));
         setNama(isset(detailContent, "nama"));
         setId_tingkatan(isset(detailContent, "id_tingkatan"));
         setId_bab(isset(detailContent, "id_bab"));
         $("#summernote").summernote("code", detailContent.content);
      }
      return () => {};
   }, [openModalForms, pageType, detailContent]);

   const clearProps = () => {
      setOpenModalForms(false);
      setPageType("insert");
      setDetailContent({});
      setDaftarTingkatan([]);
      setErrors({});
      setDaftarBAB([]);
      setDaftarJudul([]);
      setId("");
      setId_judul("");
      setNama("");
      setId_tingkatan("");
      setId_bab("");
      $("#summernote").summernote("destroy");
   };

   const getJudul = (formData = {}) => {
      post("/translator/soal/getjudul", formData)
         .then((res) => {
            const { data } = res;
            setDaftarJudul(data);
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

   const getBAB = (formData = {}) => {
      post("/translator/soal/getbab", formData)
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
      get("/translator/soal/gettingkatan")
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
               height: 400,
            });
         });
      }
      return () => {};
   }, [openModalForms]);

   const submit = () => {
      const formData = {
         pageType: pageType,
         id: id,
         id_judul: id_judul,
         nama: nama,
         content: $("#summernote").summernote("code"),
      };

      setIsSubmit(true);
      post("/translator/soal/submit", formData)
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
      <Modal show={openModalForms} onHide={clearProps} backdrop="static" dialogClassName="modal-90">
         <Modal.Header closeButton>
            <Modal.Title>{pageType === "insert" ? "Tambah" : "Perbaharui"} Soal</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <Col md={8} sm={12}>
                  <FormGroup className={errors.nama ? "has-danger" : ""}>
                     <FormLabel className="required">Judul Soal</FormLabel>
                     <FormControl value={nama} onChange={(e) => setNama(e.target.value)} />
                     <FormControl.Feedback type="invalid">{errors.nama}</FormControl.Feedback>
                  </FormGroup>
                  <FormGroup className="mb-0">
                     <FormLabel>Pertanyaan</FormLabel>
                     <FormControl as="textarea" id="summernote" />
                  </FormGroup>
               </Col>
               <Col md={4} sm={12}>
                  <FormGroup>
                     <FormLabel>Tingkat</FormLabel>
                     <FormControl
                        as="select"
                        value={id_tingkatan}
                        onChange={(e) => {
                           setId_tingkatan(e.target.value);
                           getBAB({ id_tingkatan: e.target.value });
                        }}
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
                  </FormGroup>
                  <FormGroup>
                     <FormLabel>BAB</FormLabel>
                     <FormControl
                        as="select"
                        value={id_bab}
                        onChange={(e) => {
                           setId_bab(e.target.value);
                           getJudul({ id_bab: e.target.value });
                        }}
                     >
                        <option value="">--pilih--</option>
                        {daftarBAB.map((data, key) => {
                           return (
                              <option value={data.id} key={key}>
                                 {data.nama}
                              </option>
                           );
                        })}
                     </FormControl>
                  </FormGroup>
                  <FormGroup className={"mb-0" + (errors.id_judul ? " has-danger" : "")}>
                     <FormLabel className="required">Sub BAB</FormLabel>
                     <FormControl as="select" value={id_judul} onChange={(e) => setId_judul(e.target.value)}>
                        <option value="">--pilih--</option>
                        {daftarJudul.map((data, key) => {
                           return (
                              <option value={data.id} key={key}>
                                 {data.nama}
                              </option>
                           );
                        })}
                     </FormControl>
                     <FormControl.Feedback type="invalid">{errors.id_judul}</FormControl.Feedback>
                  </FormGroup>
               </Col>
            </Row>
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
