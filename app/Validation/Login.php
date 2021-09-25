<?php

namespace App\Validation;

class Login {

   public function submit() {
      return [
         'username' => [
            'rules' => 'required|is_not_unique[tb_users.username,username]|checkUsernameActive',
            'label' => 'Username'
         ],
         'password' => [
            'rules' => 'required',
            'label' => 'Password'
         ],
      ];
   }
   
}