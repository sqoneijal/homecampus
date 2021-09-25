<?php

function user_role($key) {
   $config = [
      '1' => 'Administrator',
      '2' => 'Editor',
      '3' => 'Translator',
      '4' => 'Member'
   ];

   return @$config[$key];
}

function user_status($key) {
   $config = [
      '1' => 'Aktif',
      '0' => 'Suspend',
      '3' => 'Belum Verifikasi',
   ];

   return @$config[$key];
}

function is_soal_publish($key) {
   $config = [
      '1' => '<span class="text-success">Publish</span>',
      '2' => '<span class="text-danger">Suspend</span>',
      '' => '<span class="text-warning">Draft</span>',
   ];

   return @$config[$key];
}