<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Validation\Login as Validate;
use App\Models\Login as Model;

class Login extends BaseController {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $session = \Config\Services::session();

      // $config = [
      //    'is_login' => true,
      //    'id_user' => '1',
      //    'username' => 'admin',
      //    'role' => '1'
      // ];
      // $session->set($config);
      // return redirect()->to('/admin/dashboard');

      $config = [
         'is_login' => true,
         'id_user' => '5',
         'username' => 'editor',
         'role' => '2'
      ];
      $session->set($config);
      return redirect()->to('/editor/dashboard');
      
      // $config = [
      //    'is_login' => true,
      //    'id_user' => '6',
      //    'username' => 'translator',
      //    'role' => '3'
      // ];
      // $session->set($config);
      // return redirect()->to('/translator/dashboard');
   }

   public function logout() {
      $session = \Config\Services::session();

      $session->destroy();
      return redirect()->to('/');
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $content = $model->submit($this->post);

         if ($content) {
            $session = \Config\Services::session();
            $session->set($content);

            $response['status'] = true;
            $response['role'] = $content['role'];
         } else {
            $response['msg_response'] = 'Username atau password salah!';
         }
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}