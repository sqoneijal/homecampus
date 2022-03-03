<?php

namespace App\Validation\Admin;

class Soal {

   public function hapus() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_soal.id,id]',
            'label' => 'ID soal'
         ],
      ];
   }

   public function submit() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_soal.id,id]',
            'label' => 'ID soal'
         ],
         'id_judul' => [
            'rules' => 'required|numeric',
            'label' => 'Sub BAB'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Judul soal'
         ],
         'is_publish' => [
            'rules' => 'required|numeric',
            'label' => 'Publish'
         ],
      ];
   }
   
}