import React, { useEffect, useState } from "react";
import { Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { get, post, notification, isset } from "../../Helpers";
import decodeHtml from "decode-html";

const Forms = (props) => {
   const { openModalForms, setOpenModalForms, detailContent, setDetailContent, setRefreshTable } = props;

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
   const [is_publish, setIs_publish] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && openModalForms) {
         getBAB({ id_tingkatan: isset(detailContent, "id_tingkatan") });
         getJudul({ id_bab: isset(detailContent, "id_bab") });

         setId(isset(detailContent, "id_soal"));
         setId_judul(isset(detailContent, "id_judul"));
         setNama(isset(detailContent, "nama"));
         setId_tingkatan(isset(detailContent, "id_tingkatan"));
         setId_bab(isset(detailContent, "id_bab"));
         setIs_publish(isset(detailContent, "is_publish"));
         setTimeout(() => {
            tinymce.activeEditor.setContent(decodeHtml(`${detailContent.content}`));
         }, 1000);
      }
      return () => {};
   }, [openModalForms, detailContent]);

   const clearProps = () => {
      setOpenModalForms(false);
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
      setIs_publish("");
      tinymce.activeEditor.setContent("");
      tinymce.remove();
   };

   const getJudul = (formData = {}) => {
      post("/editor/soal/getjudul", formData)
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
      post("/editor/soal/getbab", formData)
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
      get("/editor/soal/gettingkatan")
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
            tinymce.init({
               selector: "#tinymce",
               plugins:
                  "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
               menubar: false,
               toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media link anchor codesample | ltr rtl code",
               height: 600,
               image_caption: true,
               content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
               images_upload_handler: function (blobInfo, success, failure) {
                  success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
               },
               image_class_list: [
                  { title: "None", value: "" },
                  { title: "Responsive", value: "img-responsive img-thumbnail" },
               ],
            });
         });
      }
      return () => {};
   }, [openModalForms]);

   const submit = () => {
      const formData = {
         id: id,
         id_judul: id_judul,
         nama: nama,
         content: tinymce.activeEditor.getContent(),
         is_publish: is_publish,
      };

      setIsSubmit(true);
      post("/editor/soal/submit", formData)
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
      <React.Fragment>
         <div
            className={"offcanvas offcanvas-end" + (openModalForms ? " show" : "")}
            style={{ visibility: openModalForms ? "visible" : "hidden", width: "88%" }}
            data-bs-scroll={true}
         >
            <div className="offcanvas-header">
               <h5 id="offcanvasRightLabel">Validasi Soal</h5>
               <button className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={(e) => clearProps()} />
            </div>
            <div className="offcanvas-body">
               <Row>
                  <Col md={8} sm={12}>
                     <FormGroup className={errors.nama ? "has-danger" : ""}>
                        <FormLabel className="required">Judul Soal</FormLabel>
                        <FormControl value={nama} onChange={(e) => setNama(e.target.value)} />
                        <FormControl.Feedback type="invalid">{errors.nama}</FormControl.Feedback>
                     </FormGroup>
                     <FormGroup className="mb-0">
                        <FormLabel>Pertanyaan</FormLabel>
                        <FormControl as="textarea" id="tinymce" />
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
                     <FormGroup className={errors.id_judul ? " has-danger" : ""}>
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
                     <FormGroup className={"mb-0" + (errors.is_publish ? " has-danger" : "")}>
                        <FormLabel className="required">Publish</FormLabel>
                        <FormControl as="select" value={is_publish} onChange={(e) => setIs_publish(e.target.value)}>
                           <option value="">--pilih--</option>
                           <option value="1">Publish</option>
                           <option value="2">Suspend</option>
                        </FormControl>
                        <FormControl.Feedback type="invalid">{errors.is_publish}</FormControl.Feedback>
                     </FormGroup>
                     <Button size="sm" active={true} className="waves-effect" onClick={() => (isSubmit ? null : submit())}>
                        {isSubmit ? "Loading..." : "Simpan"}
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
         {openModalForms ? <div className="modal-backdrop fade show" /> : ""}
      </React.Fragment>
   );
};
export default Forms;
