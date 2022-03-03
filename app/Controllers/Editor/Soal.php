<?php

namespace App\Controllers\Editor;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Editor;
use App\Models\Editor\Soal as Model;
use App\Validation\Editor\Soal as Validate;

class Soal extends Editor {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Soal',
         'internalCss' => $this->assets->datatable['css'],
         'internalJs' => [
            $this->assets->datatable['js'],
            tinymce['js'],
         ],
      ];

      $this->template($this->data, 'soal');
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
         $action .= '<a class="btn btn-sm btn-warning" href="#" id="edit"><i class="ri-edit-2-line"></i></a>';
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