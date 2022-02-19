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
      'assets/css/bootstrap.min.css',
      'assets/css/icons.min.css',
      'assets/css/app.min-default.css',
      'assets/css/notification.css',
      'assets/css/pace.min.css',
   ]);
   ?>
</head>
<body class="auth-body-bg">
   <div id="root"></div>
   <?php
   echo script_tag([
      'assets/js/jquery.min.js',
      'assets/js/bootstrap.bundle.min.js',
      'assets/js/waves.min.js',
      'assets/js/pace.min.js',
   ]);
   echo $webpack_js;
   echo '<script>window.Waves.init();</script>';
   ?>
</body>
</html>