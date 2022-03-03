import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Col, Container, Row, Card, Table } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import Forms from "./Forms";
import ModalDetail from "./ModalDetail";
import { notification, post } from "../../Helpers";

let datatable;

const Lists = () => {
   // bool
   const [openModalForms, setOpenModalForms] = useState(false);
   const [refreshTable, setRefreshTable] = useState(false);
   const [openModalDetail, setOpenModalDetail] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});

   const hapus = (id) => {
      const formData = {
         id: id,
      };

      post("/admin/soal/hapus", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            setRefreshTable(data.status);
         })
         .catch((e) => {
            if (e.message === "Network Error") {
               notification(false, "Anda tidak terkoneksi dengan jaringan atau sedang offline !");
            } else if (typeof e.response !== "undefined") {
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

   useEffect(() => {
      datatable = $("#datatable").DataTable({
         ordering: true,
         processing: true,
         serverSide: true,
         pageLenght: 100,
         ajax: {
            url: "/admin/soal/getdata",
            type: "POST",
         },
         createdRow: (row, data) => {
            row.querySelector("#nama").onclick = (e) => {
               e.preventDefault();
               setDetailContent(data.detailContent);
               setOpenModalDetail(true);
            };

            row.querySelector("#edit").onclick = (e) => {
               e.preventDefault();
               setDetailContent(data.detailContent);
               setOpenModalForms(true);
            };

            row.querySelector("#delete").onclick = (e) => {
               e.preventDefault();
               bootbox.confirm({
                  title: "Konfirmasi",
                  message: "Apakah anda yakin ingin menghapus?",
                  buttons: {
                     confirm: {
                        label: "Iya",
                        className: "btn-success active waves-effect btn-sm",
                     },
                     cancel: {
                        label: "Tidak",
                        className: "btn-danger active waves-effect btn-sm",
                     },
                  },
                  callback: function (result) {
                     if (result) {
                        hapus(data.detailContent.id_soal);
                     }
                  },
               });
            };
         },
         columns: [null, null, null, null, { class: "text-center" }, { class: "text-center", orderable: false }],
         drawCallback: () => {
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
               return new bootstrap.Tooltip(e);
            });
         },
      });
      return () => {};
   }, []);

   useEffect(() => {
      if (refreshTable) {
         datatable.ajax.reload(null, false);
         setTimeout(() => {
            setRefreshTable(false);
         }, 1);
      }
      return () => {};
   }, [refreshTable]);

   return (
      <React.Fragment>
         <ReactNotification />
         <Forms
            openModalForms={openModalForms}
            setOpenModalForms={(e) => setOpenModalForms(e)}
            detailContent={detailContent}
            setDetailContent={(e) => setDetailContent(e)}
            setRefreshTable={(e) => setRefreshTable(e)}
         />
         <ModalDetail
            openModalDetail={openModalDetail}
            setOpenModalDetail={(e) => setOpenModalDetail(e)}
            detailContent={detailContent}
            setDetailContent={(e) => setDetailContent(e)}
         />
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
                  <Col xs={12}>
                     <Card>
                        <Card.Body>
                           <Table id="datatable" size="sm" bordered striped hover responsive>
                              <thead>
                                 <tr>
                                    <th>JUDUL</th>
                                    <th>SUB BAB</th>
                                    <th>BAB</th>
                                    <th>TINGKAT</th>
                                    <th>STATUS</th>
                                    <th style={{ width: "5%" }} />
                                 </tr>
                              </thead>
                           </Table>
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
ReactDOM.render(<Lists />, document.getElementById("root"));
