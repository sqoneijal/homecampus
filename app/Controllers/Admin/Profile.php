<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin;
use App\Validation\Admin\Profile as Validate;
use App\Models\Admin\Profile as Model;

class Profile extends Admin {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Profile'
      ];

      $this->template($this->data, 'profile');
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $max_upload = min((int) ini_get('post_max_size'), (int) ini_get('upload_max_filesize'));
         $max_upload = $max_upload * 1024;

         $avatar = $this->request->getFile('avatar');
         if ($avatar) {
            $file = new \CodeIgniter\Files\File($avatar->getTempName());

            if (in_array($avatar->getClientMimeType(), array_merge(\Config\Mimes::$mimes['png'], \Config\Mimes::$mimes['jpg'], \Config\Mimes::$mimes['jpeg']))) {
               if ((double) $file->getSizeByUnit('mb') >= $max_upload) {
                  $response['errors']['avatar'] = "Ukaran file terlalu besar dari yang diizinkan. Maksimal ukuran file {$max_upload}MB";
               } else {
                  $set_avatar_name = $avatar->getRandomName();
                  $avatar->move(ROOTPATH . "public/assets/images", $set_avatar_name);

                  $this->post['avatar'] = $set_avatar_name;
               }
            } else {
               $response['errors']['avatar'] = "File yang coba anda upload tidak diizinkan.";
            }
         }

         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
         $response['new_avatar'] = ($this->post['avatar'] ? $this->post['avatar'] : $this->post['old_avatar']);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}