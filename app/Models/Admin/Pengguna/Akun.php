<?php

namespace App\Models\Admin\Pengguna;

use CodeIgniter\Model;

class Akun extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function hapus($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->delete();
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? (int) $val : null;
            }
         }
         unset($data['pageType'], $data['id']);

         if ($data['password']) $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
         else unset($data['password']);

         $table = $this->db->table('tb_users');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = date('Y-m-d H:i:s');

            $table->insert($data);
         } else if ($post['pageType'] === 'update') {
            $data['modified'] = date('Y-m-d H:i:s');

            $table->where('id', $post['id']);
            $table->update($data);
         }
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getData($post = []) {
      try {
         $table = $this->_queryData($post);
         if ($post['length'] !== -1)
            $table->limit($post['length'], $post['start']);
         return $table->get();
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }
   
   public function countData($post = []) {
      try {
         $table = $this->db->table('tb_users tu');
         $table->select('count(*) as jumlah');
         $table->where('tu.id !=', $post['user_login']);
   
         $get = $table->get();
         $data = $get->getRowArray();
         return $data['jumlah'];
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }
   
   public function filteredData($post = []) {
      try {
         $table = $this->_queryData($post);
         $get = $table->get();
         return count($get->getResultArray());
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }
   
   private function _queryData($post = []) {
      try {
         $table = $this->db->table('tb_users tu');
         $table->where('tu.id !=', $post['user_login']);
   
         $i = 0;
         $column_search = ['tu.username', 'tu.email', 'tu.nama'];
         foreach ($column_search as $item) {
            if ($post['search']['value']) {
               if ($i === 0) {
                  $table->groupStart();
                  $table->like($item, trim(strtolower($post['search']['value'])));
               } else {
                  $table->orLike($item, trim(strtolower($post['search']['value'])));
               }
   
               if (count($column_search) - 1 === $i)
                  $table->groupEnd();
            }
            $i++;
         }
   
         $column_order = ['', 'nama','username','email','role','status'];
         $column = $post['order'][0]['column'];
         $dir = $post['order'][0]['dir'];
         $table->orderBy($column_order[$column], $dir);
   
         return $table;
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }

}