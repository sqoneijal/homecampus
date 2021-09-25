<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Navigation extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getBAB() {
      try {
         $table = $this->db->table('tb_bab tb');
         $table->select('tb.id, tb.id_tingkatan, tb.nama');
         $table->orderBy('tb.nama');

         $get = $table->get();
         $result = $get->getResultArray();

         $response = [];
         foreach ($result as $data) {
            $response[$data['id_tingkatan']][] = $data;
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getTingkatan() {
      try {
         $table = $this->db->table('tb_tingkatan tt');
         $table->select('tt.id, tt.nama, tt.keterangan');
         $table->orderBy('tt.nama');

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               if ($field === 'keterangan') {
                  $response[$key][$field] = html_entity_decode($val[$field]);
               } else {
                  $response[$key][$field] = trim($val[$field]);
               }
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}