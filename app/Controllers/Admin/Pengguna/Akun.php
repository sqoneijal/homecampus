<?php

namespace App\Controllers\Admin\Pengguna;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin;
use App\Models\Admin\Pengguna\Akun as Model;
use App\Validation\Admin\Pengguna\Akun as Validate;

class Akun extends Admin {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Akun',
         'internalCss' => $this->assets->datatable['css'],
         'internalJs' => $this->assets->datatable['js'],
      ];

      $this->template($this->data, 'akun');
   }

   public function hapus() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $model->hapus($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
            $errors = \Config\Services::validation()->getErrors();
            foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->submit($this->post))) {
         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function getData() {
      $model = new Model();
      $query = $model->getData($this->getVar);
   
      $i = $this->post['start'];
      $response = [];
      foreach ($query->getResultArray() as $data) {
         $i++;
   
         $action = '<div class="btn-group">';
         $action .= '<a class="btn btn-sm btn-warning" title="Edit" href="#" id="edit"><i class="ri-edit-2-line"></i></a>';
         $action .= '<a class="btn btn-sm btn-danger" title="Hapus" href="#" id="delete"><i class="ri-delete-bin-line"></i></a>';
         $action .= '</div>';
   
         $result = [];
         $result['detailContent'] = $data;
         $result[] = '<img src="/public/assets/images/'.$data['avatar'].'" class="img-circle img-responsive" style="width: 30px; height: 30px;" />';
         $result[] = $data['nama'];
         $result[] = $data['username'];
         $result[] = $data['email'];
         $result[] = user_role($data['role']);
         $result[] = user_status($data['status']);
         $result[] = $action;
   
         $response[] = $result;
      }
   
      $output = array(
         'draw'            => intval($this->post['draw']),
         'recordsTotal'    => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data'            => $response
      );
      return $this->response->setJSON($output);
   }

}