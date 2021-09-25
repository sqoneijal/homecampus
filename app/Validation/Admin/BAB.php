<?php

namespace App\Validation\Admin;

class BAB {

   public function hapus() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_bab.id,id]',
            'label' => 'ID BAB'
         ],
      ];
   }

   public function submit($post = []) {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => $post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_bab.id,id]',
            'label' => 'ID BAB'
         ],
         'id_tingkatan' => [
            'rules' => 'required|numeric|is_not_unique[tb_tingkatan.id,id_tingkatan]',
            'label' => 'Tingkatan'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Judul BAB'
         ],
      ];
   }

}