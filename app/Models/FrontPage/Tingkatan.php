<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Tingkatan extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getJudul() {
      try {
         $table = $this->db->table('tb_judul');
         $table->orderBy('nama');

         $get = $table->get();
         $result = $get->getResultArray();

         $response = [];
         foreach ($result as $data) {
            $response[$data['id_bab']][] = [
               'id' => $data['id'],
               'nama' => $data['nama']
            ];
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getBAB($id_tingkatan) {
      try {
         $table = $this->db->table('tb_bab tb');
         $table->where('tb.id_tingkatan', $id_tingkatan);
         $table->orderBy('tb.nama');

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

   public function getDetail($id_tingkatan) {
      try {
         $table = $this->db->table('tb_tingkatan tt');
         $table->where('tt.id', $id_tingkatan);

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