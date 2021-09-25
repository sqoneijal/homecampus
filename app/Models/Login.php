<?php

namespace App\Models;

use CodeIgniter\Model;

class Login extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('username', $post['username']);
         $table->where('status', '1');

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();

         if (isset($data)) {
            if (password_verify($post['password'], $data['password'])) {
               return [
                  'is_login' => true,
                  'id_user' => $data['id'],
                  'username' => $data['username'],
                  'role' => $data['role']
               ];
            }
         }
         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}