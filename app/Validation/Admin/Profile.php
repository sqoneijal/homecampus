<?php

namespace App\Validation\Admin;

class Profile {

   public function submit() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.username,user_modified]',
            'label' => 'User modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID user'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama lengkap'
         ],
         'username' => [
            'rules' => 'required|is_not_unique[tb_users.username,username]',
            'label' => 'Username'
         ],
         'email' => [
            'rules' => 'required|is_not_unique[tb_users.email,email]',
            'label' => 'Email'
         ],
      ];
   }

}