<?php

namespace App\Models\Translator;

use CodeIgniter\Model;

class Soal extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function hapus($post = []) {
      try {
         $table = $this->db->table('tb_soal');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
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
               $data[$key] = is_numeric($val) ? (double) $val : null;
            }
         }
         unset($data['pageType'], $data['id']);

         $data['content'] = htmlentities($data['content']);
         $data['is_publish'] = null;

         $table = $this->db->table('tb_soal');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = date('Y-m-d H:i:s');

            $table->insert($data);
         } else if ($post['pageType'] === 'update') {
            $data['modified'] = date('Y-m-d H:i:s');

            $table->where('id', $post['id']);
            $table->update($data);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getJudul($post = []) {
      try {
         $table = $this->db->table('tb_judul tj');
         $table->select('tj.id, tj.nama');
         $table->where('tj.id_bab', $post['id_bab']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getBAB($post = []) {
      try {
         $table = $this->db->table('tb_bab tb');
         $table->select('tb.id, tb.nama');
         $table->where('tb.id_tingkatan', $post['id_tingkatan']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getTingkatan() {
      try {
         $table = $this->db->table('tb_tingkatan tt');
         $table->select('tt.id, tt.nama');
         $table->orderBy('tt.nama');

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
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
      $table = $this->db->table('list_soal');
      $table->select('count(*) as jumlah');
      $table->where('user_modified', $post['user_modified']);
   
      $get = $table->get();
      $data = $get->getRowArray();
      return $data['jumlah'];
   }
   
   public function filteredData($post = []) {
      $table = $this->_queryData($post);
      $get = $table->get();
      return count($get->getResultArray());
   }
   
   private function _queryData($post = []) {
      $table = $this->db->table('list_soal');
      $table->where('user_modified', $post['user_modified']);
   
      $i = 0;
      $column_search = ['nama', 'sub_bab', 'bab', 'tingkatan'];
      foreach ($column_search as $item) {
         if ($_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like($item, trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike($item, trim(strtolower($_POST['search']['value'])));
            }
   
            if (count($column_search) - 1 === $i)
               $table->groupEnd();
         }
         $i++;
      }
   
      $column_order = ['nama', 'sub_bab', 'bab', 'tingkatan', 'is_publish'];
      $column = $_POST['order'][0]['column'];
      $dir = $_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   
      return $table;
   }

}