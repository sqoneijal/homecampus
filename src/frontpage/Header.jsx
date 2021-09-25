import React, { useState } from "react";
import ReactDOM from "react-dom";
import ModalLogin from "./ModalLogin";
import ReactNotificationsComponent from "react-notifications-component";

const Header = () => {
   // bool
   const [openModalLogin, setOpenModalLogin] = useState(false);

   return (
      <React.Fragment>
         <ReactNotificationsComponent />
         <ModalLogin openModalLogin={openModalLogin} setOpenModalLogin={(e) => setOpenModalLogin(e)} />
         <a id="logo" href="/">
            <img src="/assets/frontpage/img/logo.png" width="125" height="40" alt="Atena" data-retina="true" />
         </a>
         <nav id="top-nav">
            <ul>
               <li>
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        setOpenModalLogin(true);
                     }}
                  >
                     Login
                  </a>
               </li>
            </ul>
         </nav>
         <a id="menu-trigger" href="#">
            <span className="menu-trigger-text">Menu</span>
            <span className="menu-trigger-icon" />
         </a>
      </React.Fragment>
   );
};
ReactDOM.render(<Header />, document.getElementById("header"));
