import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const nav_array = [
   {
      label: "Dashboard",
      icon: "ri-dashboard-line",
      active: ["dashboard"],
      url: "/translator/dashboard",
      sub: false,
   },
   {
      label: "Soal",
      icon: "ri-dashboard-line",
      active: ["soal"],
      url: "/translator/soal",
      sub: false,
   },
];

const Navigation = () => {
   useEffect(() => {
      $("#side-menu").metisMenu();
      $("#sidebar-menu a").each(function () {
         var e = window.location.href.split(/[?#]/)[0];
         this.href == e &&
            ($(this).addClass("active"),
            $(this).parent().addClass("mm-active"),
            $(this).parent().parent().addClass("mm-show"),
            $(this).parent().parent().prev().addClass("mm-active"),
            $(this).parent().parent().parent().addClass("mm-active"),
            $(this).parent().parent().parent().parent().addClass("mm-show"),
            $(this).parent().parent().parent().parent().parent().addClass("mm-active"));
      });

      $(document).ready(function () {
         var e;
         0 < $("#sidebar-menu").length &&
            0 < $("#sidebar-menu .mm-active .active").length &&
            300 < (e = $("#sidebar-menu .mm-active .active").offset().top) &&
            ((e -= 300), $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: e }, "slow"));
      });
      return () => {};
   }, []);

   return (
      <ul className="metismenu list-unstyled" id="side-menu">
         <li className="menu-title">Menu</li>
         {nav_array.map((data, key) => {
            return (
               <li key={key}>
                  <a href={data.url} className={"waves-effect" + (data.sub ? " has-arrow" : "")}>
                     <i className={data.icon} />
                     <span>{data.label}</span>
                  </a>
                  {data.sub ? (
                     <ul className="sub-menu">
                        {data.child.map((a, b) => {
                           return (
                              <li key={b} className="waves-effect">
                                 <a href={a.url}>{a.label}</a>
                              </li>
                           );
                        })}
                     </ul>
                  ) : (
                     ""
                  )}
               </li>
            );
         })}
      </ul>
   );
};
ReactDOM.render(<Navigation />, document.getElementById("sidebar-menu"));
