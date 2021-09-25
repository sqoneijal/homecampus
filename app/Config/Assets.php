<?php

namespace App\Config;

use CodeIgniter\Config\BaseConfig;

class Assets extends BaseConfig {

   public $datatable = [
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
   ];

   public $placeholder = [
      'css' => ['assets/css/placeholder.min.css'],
   ];

   public $summernote = [
      'css' => ['assets/plugins/summernote-0.8.18/summernote.min.css'],
      'js' => ['assets/plugins/summernote-0.8.18/summernote.min.js']
   ];

}