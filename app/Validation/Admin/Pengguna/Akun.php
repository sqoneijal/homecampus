<?php

namespace App\Validation\Admin\Pengguna;

class Akun {

   public function hapus() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID akun'
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
            'rules' => $post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID akun'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama'
         ],
         'username' => [
            'rules' => $post['pageType'] === 'insert' ? 'required|is_unique[tb_users.username,username]' : 'required|is_not_unique[tb_users.username,username]',
            'label' => 'Username'
         ],
         'email' => [
            'rules' => $post['pageType'] === 'insert' ? 'required|valid_email|is_unique[tb_users.email,email]' : 'required|valid_email|is_not_unique[tb_users.email,email]',
            'label' => 'Email'
         ],
         'password' => [
            'rules' => $post['pageType'] === 'insert' ? 'required' : 'permit_empty',
            'label' => 'Password'
         ],
         'role' => [
            'rules' => 'required|numeric',
            'label' => 'Role'
         ],
         'status' => [
            'rules' => 'required|numeric',
            'label' => 'Status'
         ],
      ];
   }

}