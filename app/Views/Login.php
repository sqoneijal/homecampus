<!doctype html>
<html lang="id">
<head>
   <meta charset="utf-8" />
   <title><?php echo $title;?></title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta content="Belajar matematika SD/SMP online. Memecahkan masalah matematika tak terbatas untuk kelas 4, kelas 5 dan kelas 6 berdasarkan silabus Singapura. Pantau kemajuan Anda. Ikuti tes matematika." name="description" />
   <meta content="author" name="sqone.developer" />
   <link rel="icon" href="/assets/images/favicon.ico" />
   <?php
   echo css_tag([
      'public/assets/css/bootstrap.min.css',
      'public/assets/css/icons.min.css',
      'public/assets/css/app.min-default.css',
      'public/assets/css/notification.css',
      'public/assets/css/pace.min.css',
   ]);
   ?>
</head>
<body class="auth-body-bg">
   <div id="root"></div>
   <?php
   echo script_tag([
      'public/assets/js/jquery.min.js',
      'public/assets/js/bootstrap.bundle.min.js',
      'public/assets/js/waves.min.js',
      'public/assets/js/pace.min.js',
   ]);
   echo $webpack_js;
   echo '<script>window.Waves.init();</script>';
   ?>
</body>
</html>