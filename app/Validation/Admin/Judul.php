<?php

namespace App\Validation\Admin;

class Judul {

   public function hapus() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_judul.id,id]',
            'label' => 'ID judul'
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
            'rules' => $post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_judul.id,id]',
            'label' => 'ID judul'
         ],
         'id_tingkatan' => [
            'rules' => 'required|numeric',
            'label' => 'Tingkatan'
         ],
         'id_bab' => [
            'rules' => 'required|numeric',
            'label' => 'Judul BAB'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Judul'
         ],
      ];
   }

}