<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class BAB extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getDaftarJudul($id_bab) {
      try {
         $table = $this->db->table('tb_judul tj');
         $table->where('tj.id_bab', $id_bab);
         $table->orderBy('tj.nama');

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

   public function getDetail($id_bab) {
      try {
         $table = $this->db->table('tb_bab tb');
         $table->where('tb.id', $id_bab);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($fieldNames as $field) {
            if ($field === 'keterangan') {
               $response[$field] = html_entity_decode($data[$field]);
            } else {
               $response[$field] = trim($data[$field]);
            }
         }
         $response['id_bab'] = $id_bab;
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}