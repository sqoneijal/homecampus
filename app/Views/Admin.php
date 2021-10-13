<!DOCTYPE html>
<html lang="id">
<head>
   <meta charset="utf-8" />
   <title><?php echo $title;?></title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta content="Belajar matematika SD/SMP online. Memecahkan masalah matematika tak terbatas untuk kelas 4, kelas 5 dan kelas 6 berdasarkan silabus Singapura. Pantau kemajuan Anda. Ikuti tes matematika." name="description" />
   <meta content="author" name="sqone.developer" />
   <link rel="icon" href="/assets/images/favicon.ico" />
   <?php
   echo @$internalCss;
   echo css_tag([
      'assets/css/bootstrap.min.css',
      'assets/css/icons.min.css',
      'assets/css/app.min-default.css',
      'assets/css/notification.css',
      'assets/css/pace.min.css',
      'assets/css/custom.css',
   ]);
   ?>
</head>
<body data-sidebar="dark">
   <div id="layout-wrapper">
      <header id="page-topbar"></header>
      <div class="vertical-menu">
         <div data-simplebar class="h-100">
            <div id="sidebar-menu"></div>
         </div>
      </div>
      <div class="main-content" id="root"></div>
   </div>
   <?php
   echo "<script>";
   echo "var segment = {$segment}, content = {$footerJs}, user = {$users};";
   echo "</script>";
   echo script_tag([
      'assets/js/jquery.min.js',
      'assets/js/bootstrap.bundle.min.js',
      'assets/js/metisMenu.min.js',
      'assets/js/simplebar.min.js',
      'assets/js/waves.min.js',
      'assets/js/pace.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js',
   ]);
   echo @$internalJs;
   echo $webpack_js;
   echo '<script>window.Waves.init();</script>';
   ?>
</body>
</html>