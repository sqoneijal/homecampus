import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { post, notification } from "../Helpers";

const ModalLogin = (props) => {
   const { openModalLogin, setOpenModalLogin } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [msg_response, setMsg_response] = useState("");

   const clearProps = () => {
      setOpenModalLogin(false);
      setErrors({});
      setUsername("");
      setPassword("");
      setMsg_response("");
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         username: username,
         password: password,
      };

      setIsSubmit(true);
      post("/login/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            setMsg_response(data.msg_response);

            if (data.status) {
               if (data.role === "1") {
                  window.open("/admin/dashboard", "_parent");
               } else if (data.role === "2") {
                  window.open("/editor/dashboard", "_parent");
               } else if (data.role === "3") {
                  window.open("/translator/dashboard", "_parent");
               }
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
      <Modal
         show={openModalLogin}
         onHide={clearProps}
         contentClassName="modal-popup"
         onEntering={(e) => e.classList.add("in", "pr-17")}
         dialogClassName="mt-56"
         backdropClassName="in"
      >
         <a
            href="#"
            className="close-link"
            onClick={(e) => {
               e.preventDefault();
               setOpenModalLogin(false);
            }}
         >
            <i className="icon_close_alt2" />
         </a>
         <Form className="popup-form" onSubmit={isSubmit ? null : submit}>
            <FormControl
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className={errors.username ? "form-danger" : "form-white"}
               placeholder="Username"
            />
            <FormControl
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               type="password"
               className={errors.password ? "form-danger" : "form-white"}
               placeholder="Password"
            />
            {msg_response ? <p className="error-login-msg">{msg_response}</p> : ""}
            <div className="text-left">
               <a href="#">Lupa password?</a>
            </div>
            <Button type="submit" className="btn-submit">
               {isSubmit ? "Loading..." : "Login"}
            </Button>
         </Form>
      </Modal>
   );
};
export default ModalLogin;
