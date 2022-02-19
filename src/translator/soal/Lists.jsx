import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import ModalForms from "./ModalForms";
import { post, notification } from "../../Helpers";
import ModalDetail from "./ModalDetail";
import Forms from "./Forms";

let datatable;

const Lists = () => {
   // bool
   const [openModalForms, setOpenModalForms] = useState(false);
   const [refreshTable, setRefreshTable] = useState(false);
   const [openModalDetail, setOpenModalDetail] = useState(false);
   const [openForms, setOpenForms] = useState(false);

   // string
   const [pageType, setPageType] = useState("insert");

   // object
   const [detailContent, setDetailContent] = useState({});

   const hapus = (id) => {
      const formData = {
         id: id,
      };

      post("/translator/soal/hapus", formData)
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
         pageLenght: 100,
         ajax: {
            url: "/translator/soal/getdata",
            type: "POST",
            data: {
               user_modified: window.user.username,
            },
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
               setPageType("update");
               setOpenForms(true);
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
            openForms={openForms}
            setOpenForms={(e) => setOpenForms(e)}
            pageType={pageType}
            setPageType={(e) => setPageType(e)}
            setRefreshTable={(e) => setRefreshTable(e)}
            detailContent={detailContent}
            setDetailContent={(e) => setDetailContent(e)}
         />
         <ModalForms
            openModalForms={openModalForms}
            setOpenModalForms={(e) => setOpenModalForms(e)}
            pageType={pageType}
            setPageType={(e) => setPageType(e)}
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
                              <Breadcrumb.Item active>Translator</Breadcrumb.Item>
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
                  <Col md={6} sm={12}>
                     <Button size="sm" active={true} className="waves-effect" onClick={() => setOpenForms(true)}>
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
