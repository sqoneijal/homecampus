<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8" />
   <title><?php echo $title;?></title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta content="Belajar matematika SD/SMP online. Memecahkan masalah matematika tak terbatas untuk kelas 4, kelas 5 dan kelas 6 berdasarkan silabus Singapura. Pantau kemajuan Anda. Ikuti tes matematika." name="description" />
   <meta content="author" name="sqone.developer" />
   <link rel="icon" href="/public/assets/images/favicon.ico" />
   <link rel="apple-touch-icon-precomposed" href="/public/assets/frontpage/img/apple-touch-icon.png"/>
   <?php
   echo @$internalCss;
   echo css_tag([
      'public/assets/css/bootstrap.min.css',
      'public/assets/css/icons.min.css',
      'public/assets/css/app.min-default.css',
      'public/assets/css/notification.css',
      'public/assets/css/pace.min.css',
      'public/assets/css/custom.css',
   ]);
   ?>
   <style>
      .page-content {
         margin-top: 30px !important;
      }
   </style>
</head>
<body data-topbar="light" data-layout="horizontal">
   <div id="layout-wrapper">
      <header id="page-topbar"></header>
      <div class="topnav" id="navigation" style="margin-top: 45px;"></div>
      <div class="main-content" id="root"></div>
   </div>
   <?php
   echo "<script>";
   echo "var segment = {$segment};";
   echo "</script>";
   echo script_tag([
      'public/assets/js/jquery.min.js',
      'public/assets/js/bootstrap.bundle.min.js',
      'public/assets/js/waves.min.js',
      'public/assets/js/pace.min.js',
      'https://themesdesign.in/nazox/layouts/assets/libs/masonry-layout/masonry.pkgd.min.js'
   ]);
   echo $webpack_js;
   echo '<script>window.Waves.init();</script>';
   ?>
</body>
</html>