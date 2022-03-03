<?php

/**
 * The goal of this file is to allow developers a location
 * where they can overwrite core procedural functions and
 * replace them with their own. This file is loaded during
 * the bootstrap process and is called during the frameworks
 * execution.
 *
 * This can be looked at as a `master helper` file that is
 * loaded early on, and may also contain additional functions
 * that you'd like to use throughout your entire application
 *
 * @link: https://codeigniter4.github.io/CodeIgniter4/
 */

define('app_version', [
   'admin' => 'v1.0',
   'editor' => 'v1.0',
]);

define('tinymce', [
   'js' => [
      'assets/plugins/tinymce_5.10.2/tinymce.min.js'
   ],
]);

define('datatable', [
   'css' => [
      'assets/plugins/datatable/dataTables.bootstrap4.min.css',
      'assets/plugins/datatable/responsive.bootstrap4.min.css',
   ],
   'js' => [
      'assets/plugins/datatable/jquery.dataTables.min.js',
      'assets/plugins/datatable/dataTables.bootstrap4.min.js',
      'assets/plugins/datatable/dataTables.responsive.min.js',
      'assets/plugins/datatable/responsive.bootstrap4.min.js',
   ]
]);