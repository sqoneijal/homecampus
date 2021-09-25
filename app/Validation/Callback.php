<?php

namespace App\Validation;

class Callback {

   public function checkUsernameActive(string $str, string &$error = null) : bool {
      try {
         $db = \Config\Database::connect();
         $table = $db->table('tb_users');
         $table->select('count(*) as jumlah');
         $table->where('username', $str);
         $table->where('status', '1');

         $get = $table->get();
         $data = $get->getRowArray();

         if ((int) $data['jumlah'] > 0) {
            return true;
         }

         $error = 'Akun anda tidak aktif.';
         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }
   
}