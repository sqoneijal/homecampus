<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin as Controller;
use App\Models\Admin\Soal as Model;
use App\Validation\Admin\Soal as Validate;

class Soal extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Soal',
         'internalCss' => datatable['css'],
         'internalJs' => [
            datatable['js'],
            tinymce['js'],
         ],
      ];

      $this->template($this->data, 'soal');
   }

   public function hapus() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
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
      if ($this->validate($validation->submit())) {
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

   public function getJudul() {
      $model = new Model();
      $content = $model->getJudul($this->post);
      return $this->response->setJSON($content);
   }

   public function getBAB() {
      $model = new Model();
      $content = $model->getBAB($this->post);
      return $this->response->setJSON($content);
   }

   public function getTingkatan() {
      $model = new Model();
      $content = $model->getTingkatan();
      return $this->response->setJSON($content);
   }

   public function getData() {
      $model = new Model();
      $query = $model->getData($this->getVar);
   
      $i = $this->post['start'];
      $response = [];
      foreach ($query->getResultArray() as $data) {
         $i++;
   
         $action = '<div class="btn-group">';
         $action .= '<a class="btn btn-sm btn-warning" href="#" id="edit" data-bs-original-title="Edit" data-bs-toggle="tooltip" data-bs-placement="top"><i class="ri-edit-2-line"></i></a>';
         $action .= '<a class="btn btn-sm btn-danger" href="#" id="delete" data-bs-original-title="Delete" data-bs-toggle="tooltip" data-bs-placement="top"><i class="ri-delete-bin-line"></i></a>';
         $action .= '</div>';
   
         $result = [];
         $result['detailContent'] = $data;
         $result[] = '<a href="#" id="nama">'.$data['nama'].'</a>';
         $result[] = $data['sub_bab'];
         $result[] = $data['bab'];
         $result[] = $data['tingkatan'];
         $result[] = is_soal_publish($data['is_publish']);
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