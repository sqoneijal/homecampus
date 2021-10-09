<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Profile extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               if ($key === 'password') {
                  $data[$key] = password_hash($val, PASSWORD_BCRYPT);
               } else {
                  $data[$key] = trim($val);
               }
            }
         }
         unset($data['id'], $data['old_avatar']);

         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}