<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Judul extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getDaftarSoal($id_judul) {
      try {
         $table = $this->db->table('tb_soal ts');
         $table->where('ts.id_judul', $id_judul);
         $table->where('ts.is_publish', '1');

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               if ($field === 'content') {
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

   public function getDetailJudul($id_judul) {
      try {
         $table = $this->db->table('tb_judul tj');
         $table->where('tj.id', $id_judul);

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
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}