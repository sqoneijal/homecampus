<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Admin extends BaseController {

   protected $env = 'production';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);

      $session = \Config\Services::session();
      if ($session->get('role') !== '1') {
         exit('Anda tidak memiliki akses untuk halaman ini.');
      }
   }

   public function template($content = [], $fileJs) {
      $internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);
		
		$data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
		$data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS($fileJs);
      $data['segment'] = $this->setSegment();
      $data['footerJs'] = json_encode(@$content['footerJs'] ? $content['footerJs'] : []);
      $data['users'] = json_encode($this->getUsersLogin());

		echo view('Admin', $data);
   }

   protected function getUsersLogin() {
      try {
         $session = \Config\Services::session()->get();
         $db = \Config\Database::connect();

         $table = $db->table('tb_users tu');
         $table->select('tu.id as id_user, tu.avatar, tu.nama, tu.username, tu.email, tu.role, tu.status');
         $table->where('tu.id', $session['id_user']);
         $table->where('tu.username', $session['username']);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();

         $this->role = $data['role'];

         $response = [];
         foreach ($fieldNames as $field) {
            if ($field === 'avatar') {
               $response[$field] = base_url('assets/images/' . $data['avatar']);
            } else {
               $response[$field] = trim($data[$field]);
            }
         }

         $response['avatar_file'] = $data['avatar'];

         return $response;
      } catch (\Exeption $e) {
         die($e->getMessage());
      }
   }

   protected function generateWebpackJS($fileJs) {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/vendor.js',
            'http://localhost:8081/topbar.js',
            'http://localhost:8081/navigation.js',
            "http://localhost:8081/{$fileJs}.js"
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/admin/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $script_tag[] = base_url("bundle/admin/{$set['vendor.js']}");
         $script_tag[] = base_url("bundle/admin/{$set['topbar.js']}");
         $script_tag[] = base_url("bundle/admin/{$set['navigation.js']}");
         $script_tag[] = base_url("bundle/admin/{$set[$fileJs . '.js']}");

         return script_tag($script_tag);
      }
   }

}