import React from "react";
import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import decodeHtml from "decode-html";
import HTMLReactParser from "html-react-parser";

const ModalDetail = (props) => {
   const { openModalDetail, setOpenModalDetail, detailContent, setDetailContent } = props;

   const clearProps = () => {
      setOpenModalDetail(false);
      setDetailContent({});
   };

   return (
      <Modal show={openModalDetail} onHide={clearProps} backdrop="static" dialogClassName="modal-90">
         <Modal.Header closeButton>
            <Modal.Title>Detail Soal : {detailContent.nama}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <Col md={8} sm={12}>
                  {HTMLReactParser(decodeHtml(`${detailContent.content}`))}
               </Col>
               <Col md={4} sm={12}>
                  <Table size="sm" hover responsive>
                     <tbody>
                        <tr>
                           <td style={{ width: "20%" }}>Tingkat</td>
                           <td style={{ width: "1%" }}>:</td>
                           <td>{detailContent.tingkatan}</td>
                        </tr>
                        <tr>
                           <td>BAB</td>
                           <td>:</td>
                           <td>{detailContent.bab}</td>
                        </tr>
                        <tr>
                           <td>Sub BAB</td>
                           <td>:</td>
                           <td>{detailContent.sub_bab}</td>
                        </tr>
                        <tr>
                           <td>Status</td>
                           <td>:</td>
                           <td>
                              {(() => {
                                 if (detailContent.is_publish === "1") {
                                    return <span className="text-success">Publish</span>;
                                 } else if (detailContent.is_publish === "2") {
                                    return <span className="text-danger">Suspend</span>;
                                 } else {
                                    return <span className="text-warning">Draft</span>;
                                 }
                              })()}
                           </td>
                        </tr>
                        <tr>
                           <td>Author</td>
                           <td>:</td>
                           <td>
                              <a href={`mailto:${detailContent.user_email}?subject=${detailContent.nama}&body=Judul Soal : ${detailContent.nama}`}>{detailContent.user_author}</a>
                           </td>
                        </tr>
                     </tbody>
                  </Table>
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" size="sm" active={true} className="waves-effect" onClick={clearProps}>
               Kembali
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalDetail;
