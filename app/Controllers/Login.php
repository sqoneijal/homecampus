<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Validation\Login as Validate;
use App\Models\Login as Model;

class Login extends BaseController {

   protected $env = 'production';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Login',
         'webpack_js' => $this->generateWebpackJS('login')
      ];

      return view('Login', $this->data);
      // $session = \Config\Services::session();

      // $config = [
      //    'is_login' => true,
      //    'id_user' => '1',
      //    'username' => 'admin',
      //    'role' => '1'
      // ];
      // $session->set($config);
      // return redirect()->to('/admin/dashboard');

      // $config = [
      //    'is_login' => true,
      //    'id_user' => '5',
      //    'username' => 'editor',
      //    'role' => '2'
      // ];
      // $session->set($config);
      // return redirect()->to('/editor/dashboard');
      
      // $config = [
      //    'is_login' => true,
      //    'id_user' => '6',
      //    'username' => 'translator',
      //    'role' => '3'
      // ];
      // $session->set($config);
      // return redirect()->to('/translator/dashboard');
   }

   protected function generateWebpackJS($fileJs) {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/vendor.js',
            "http://localhost:8081/{$fileJs}.js"
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/login/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $script_tag[] = base_url("bundle/login/{$set['vendor.js']}");
         $script_tag[] = base_url("bundle/login/{$set[$fileJs . '.js']}");

         return script_tag($script_tag);
      }
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
            $response['msg_response'] = 'Login berhasil, halaman segera dialihkan!';
         } else {
            $response['msg_response'] = 'Username atau password salah!';
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

}