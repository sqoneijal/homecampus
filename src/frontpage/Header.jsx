import React from "react";
import ReactDOM from "react-dom";

const Header = () => {
   return (
      <div className="navbar-header">
         <div className="d-flex">
            <div className="navbar-brand-box">
               <a href="/" className="logo logo-dark">
                  <span className="logo-sm">
                     <img src="/assets/images/home_page_logo.png" alt="logo-sm-dark" height="22" />
                  </span>
                  <span className="logo-lg">
                     <img src="/assets/images/home_page_logo.png" alt="logo-dark" height="20" />
                  </span>
               </a>
               <a href="/" className="logo logo-light">
                  <span className="logo-sm">
                     <img src="/assets/images/home_page_logo.png" alt="logo-sm-light" height="22" />
                  </span>
                  <span className="logo-lg">
                     <img src="/assets/images/home_page_logo.png" alt="logo-light" height="20" />
                  </span>
               </a>
            </div>
            <button
               type="button"
               className="btn btn-sm px-3 font-size-24 d-lg-none header-item"
               data-bs-toggle="collapse"
               data-bs-target="#topnav-menu-content"
            >
               <i className="ri-menu-2-line align-middle"></i>
            </button>
         </div>
         <div className="d-flex">
            <div className="d-inline-block">
               <a href="/login" className="d-none d-xl-inline-block ms-1">
                  Login
               </a>
            </div>
         </div>
      </div>
   );
};
ReactDOM.render(<Header />, document.getElementById("page-topbar"));
