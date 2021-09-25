import React from "react";

const Slider = () => {
   return (
      <React.Fragment>
         <div id="full-slider-wrapper">
            <div id="layerslider" style={{ width: "100%", height: 650 }}>
               <div className="ls-slide" data-ls="slidedelay: 5000; transition2d:5;">
                  <img src="/assets/frontpage/img/slides/slide_1.jpg" className="ls-bg" alt="Slide background" />
                  <h3
                     className="ls-l slide_typo"
                     style={{ top: "45%", left: "50%" }}
                     data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;"
                  >
                     Atena <strong>Excellence</strong> in teaching
                  </h3>
                  <p
                     className="ls-l slide_typo_2"
                     style={{ top: "52%", left: "50%" }}
                     data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;"
                  >
                     COLLEGE / UNIVERSITY / CAMPUS
                  </p>
                  <p className="ls-l" style={{ top: "62%", left: "50%" }} data-ls="durationin:2000;delayin:1300;easingin:easeOutElastic;">
                     <a href="tour.html" className="button_intro">
                        Take a tour
                     </a>{" "}
                     <a href="about.html" className="button_intro outline">
                        About us
                     </a>
                  </p>
               </div>
               <div className="ls-slide" data-ls="slidedelay: 5000; transition2d:5;">
                  <img src="/assets/frontpage/img/slides/slide_2.jpg" className="ls-bg" alt="Slide background" />
                  <h3
                     className="ls-l slide_typo"
                     style={{ top: "45%", left: "50%" }}
                     data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;"
                  >
                     Atena <strong>Qualified</strong> teachers
                  </h3>
                  <p
                     className="ls-l slide_typo_2"
                     style={{ top: "52%", left: "50%" }}
                     data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;"
                  >
                     COLLEGE / UNIVERSITY / CAMPUS
                  </p>
                  <p className="ls-l" style={{ top: "65%", left: "50%" }} data-ls="durationin:2000;delayin:1300;easingin:easeOutElastic;">
                     <a href="tour.html" className="button_intro">
                        Take a tour
                     </a>{" "}
                     <a href="about.html" className="button_intro outline">
                        About us
                     </a>
                  </p>
               </div>
               <div className="ls-slide" data-ls="slidedelay:5000; transition2d:5;">
                  <img src="/assets/frontpage/img/slides/slide_3.jpg" className="ls-bg" alt="Slide background" />
                  <h3
                     className="ls-l slide_typo"
                     style={{ top: "45%", left: "50%" }}
                     data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;"
                  >
                     <strong>Great</strong> students community
                  </h3>
                  <p
                     className="ls-l slide_typo_2"
                     style={{ top: "52%", left: "50%" }}
                     data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;"
                  >
                     COLLEGE / UNIVERSITY / CAMPUS
                  </p>
                  <p className="ls-l" style={{ top: "65%", left: "50%" }} data-ls="durationin:2000;delayin:1300;easingin:easeOutElastic;">
                     <a href="tour.html" className="button_intro">
                        Take a tour
                     </a>{" "}
                     <a href="about.html" className="button_intro outline">
                        About us
                     </a>
                  </p>
               </div>
               <div className="ls-slide" data-ls="slidedelay: 5000; transition2d:5;">
                  <img src="/assets/frontpage/img/slides/slide_4.jpg" className="ls-bg" alt="Slide background" />
                  <h3
                     className="ls-l slide_typo"
                     style={{ top: "45%", left: "50%" }}
                     data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;"
                  >
                     <strong>Well equiped</strong> classrooms
                  </h3>
                  <p
                     className="ls-l slide_typo_2"
                     style={{ top: "52%", left: "50%" }}
                     data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;"
                  >
                     COLLEGE / UNIVERSITY / CAMPUS
                  </p>
                  <p className="ls-l" style={{ top: "65%", left: "50%" }} data-ls="durationin:2000;delayin:1300;easingin:easeOutElastic;">
                     <a href="tour.html" className="button_intro">
                        Take a tour
                     </a>{" "}
                     <a href="about.html" className="button_intro outline">
                        About us
                     </a>
                  </p>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
export default Slider;
