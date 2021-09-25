<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class IsLogin implements FilterInterface {

   public function before(RequestInterface $request, $arguments = null) {
      $session = \Config\Services::session()->get();
      
      if (!@$session['is_login'] && !@$session['id_user'] && !@$session['username']) {
         die('Silahkan <a href="/login">login</a> terlebih dahulu!');
      }
   }

   public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}

}