<?php

namespace App\Validation\Admin;

class Tingkatan {

   public function hapus() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_tingkatan.id,id]',
            'label' => 'ID tingkatan'
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
            'rules' => $post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_tingkatan.id,id]',
            'label' => 'ID tingkatan'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama tingkatan'
         ],
      ];
   }

}