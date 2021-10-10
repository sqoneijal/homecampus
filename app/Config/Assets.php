<?php

namespace App\Config;

use CodeIgniter\Config\BaseConfig;

class Assets extends BaseConfig {

   public $datatable = [
      'css' => [
         'public/assets/plugins/datatable/dataTables.bootstrap4.min.css',
         'public/assets/plugins/datatable/responsive.bootstrap4.min.css',
      ],
      'js' => [
         'public/assets/plugins/datatable/jquery.dataTables.min.js',
         'public/assets/plugins/datatable/dataTables.bootstrap4.min.js',
         'public/assets/plugins/datatable/dataTables.responsive.min.js',
         'public/assets/plugins/datatable/responsive.bootstrap4.min.js',
      ]
   ];

   public $placeholder = [
      'css' => ['public/assets/css/placeholder.min.css'],
   ];

   public $summernote = [
      'css' => ['public/assets/plugins/summernote-0.8.18/summernote.min.css'],
      'js' => ['public/assets/plugins/summernote-0.8.18/summernote.min.js']
   ];

}