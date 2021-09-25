<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" href="/assets/frontpage/img/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/assets/frontpage/img/apple-touch-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="college, campus, university, courses, school, educational" />
      <meta name="description" content="Kuasai semua keterampilan matematika dasar yang dipecah menjadi potongan-potongan kecil." />
      <meta name="author" content="sqone.developer" />
      <title><?php echo $title;?></title>
      <?php
      echo css_tag([
         'assets/frontpage/css/main_font.min.css',
         'assets/frontpage/css/animate.min.css',
         'assets/frontpage/css/bootstrap.min.css',
         'assets/frontpage/css/menu.css',
         'assets/frontpage/css/style.css',
         'assets/frontpage/css/responsive.css',
         'assets/frontpage/css/elegant_font.min.css',
         'assets/frontpage/css/pe-icon-7-stroke.min.css',
         'assets/frontpage/css/fontello.min.css',
         'assets/frontpage/css/edu_fonts.min.css',
         'assets/frontpage/css/magnific-popup.min.css',
         'assets/frontpage/css/custom.css',
         'assets/frontpage/css/layerslider.min.css',
         'assets/frontpage/css/tabs.min.css',
         'assets/css/pace.min.css',
         'assets/css/notification.css',
      ]);
      ?>
   </head>
   <body>
      <header id="header"></header>
      <nav id="side-nav"></nav>
      <div class="main-wrapper" id="root"></div>
      <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="myRegister" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content modal-popup">
               <a href="#" class="close-link"><i class="icon_close_alt2"></i></a>
               <form action="#" class="popup-form" id="myRegister">
                  <input type="text" class="form-control form-white" placeholder="Name" />
                  <input type="text" class="form-control form-white" placeholder="Last Name" />
                  <input type="email" class="form-control form-white" placeholder="Email" />
                  <input type="text" class="form-control form-white" placeholder="Password" />
                  <div class="checkbox-holder text-left">
                     <div class="checkbox">
                        <input type="checkbox" value="accept_2" id="check_2" name="check_2" />
                        <label for="check_2"
                           ><span>I Agree to the <strong>Terms &amp; Conditions</strong></span></label
                        >
                     </div>
                  </div>
                  <button type="submit" class="btn btn-submit">Register</button>
               </form>
            </div>
         </div>
      </div>
      <?php
      echo script_tag([
         'assets/frontpage/js/jquery-1.11.2.min.js',
         'assets/frontpage/js/common_scripts_min.js',
         'assets/frontpage/js/functions.min.js',
         'assets/frontpage/js/greensock.js',
         'assets/frontpage/js/layerslider.transitions.js',
         'assets/frontpage/js/layerslider.kreaturamedia.jquery.js',
         'assets/js/pace.min.js',
      ]);
      ?>
      <script type="text/javascript">
         $(document).ready(function () {
            "use strict";
            $("#layerslider").layerSlider({
               autoStart: true,
               responsive: true,
               responsiveUnder: 1280,
               layersContainer: 1170,
               skinsPath: "assets/frontpage/css/",
            });
         });
      </script>
      <?php echo script_tag('assets/frontpage/js/tabs.min.js');?>
      <script>
         new CBPFWTabs(document.getElementById("tabs"));
      </script>
      <?php
      echo "<script>";
      echo "var segment = {$segment};";
      echo "</script>";
      echo $webpack_js;
      ?>
   </body>
</html>
