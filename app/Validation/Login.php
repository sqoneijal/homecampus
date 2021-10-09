<?php

namespace App\Validation;

class Login {

   public function submit() {
      return [
         'username' => [
            'rules' => 'required|is_not_unique[tb_users.username,username]|checkUsernameActive',
            'label' => 'Username',
            'errors' => [
               'is_not_unique' => 'Username atau password anda masukkan salah.'
            ]
         ],
         'password' => [
            'rules' => 'required',
            'label' => 'Password'
         ],
      ];
   }
   
}