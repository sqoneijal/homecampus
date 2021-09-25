import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ReactNotificationsComponent from "react-notifications-component";
import ModalForms from "./ModalForms";
import { post, notification } from "../../Helpers";

let datatable;

const Lists = () => {
   // bool
   const [openModalForms, setOpenModalForms] = useState(false);
   const [refreshTable, setRefreshTable] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});

   // string
   const [pageType, setPageType] = useState("insert");

   const hapus = (id) => {
      post("/admin/tingkatan/hapus", { id: id })
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);

            if (data.status) {
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
         });
   };

   useEffect(() => {
      datatable = $("#datatable").DataTable({
         ordering: true,
         processing: true,
         serverSide: true,
         pageLength: 100,
         ajax: {
            url: "/admin/tingkatan/getdata",
            type: "POST",
         },
         createdRow: (row, data) => {
            row.querySelector("#edit").onclick = (e) => {
               e.preventDefault();
               setDetailContent(data.detailContent);
               setPageType("update");
               setOpenModalForms(true);
            };

            row.querySelector("#delete").onclick = (e) => {
               e.preventDefault();
               bootbox.confirm({
                  title: "Konfirmasi",
                  message: "Apakah anda yakin ingin menghapus tingkatan ini?",
                  buttons: {
                     confirm: {
                        label: "Iya",
                        className: "btn-success active btn-sm waves-effect",
                     },
                     cancel: {
                        label: "Tidak",
                        className: "btn-danger active btn-sm waves-effect",
                     },
                  },
                  callback: function (result) {
                     if (result) {
                        hapus(data.detailContent.id);
                     }
                  },
               });
            };
         },
         columns: [null, null, { class: "text-center", orderable: false }],
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
         <ReactNotificationsComponent />
         <ModalForms
            openModalForms={openModalForms}
            setOpenModalForms={(e) => setOpenModalForms(e)}
            setRefreshTable={(e) => setRefreshTable(e)}
            detailContent={detailContent}
            setDetailContent={(e) => setDetailContent(e)}
            pageType={pageType}
            setPageType={(e) => setPageType(e)}
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
                                    <th style={{ width: "20%" }}>TINGKAT</th>
                                    <th>KETERANGAN</th>
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
                  <Col md={6} sm={12}>
                     <Button size="sm" active={true} className="waves-effect" onClick={() => setOpenModalForms(true)}>
                        Tambah
                     </Button>
                  </Col>
                  <Col md={6} sm={12}>
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
