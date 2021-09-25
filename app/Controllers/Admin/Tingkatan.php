<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin;
use App\Validation\Admin\Tingkatan as Validate;
use App\Models\Admin\Tingkatan as Model;

class Tingkatan extends Admin {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Tingkatan',
         'internalCss' => [
            $this->assets->summernote['css'],
            $this->assets->datatable['css'],
         ],
         'internalJs' => [
            $this->assets->summernote['js'],
            $this->assets->datatable['js'],
         ],
      ];

      $this->template($this->data, 'tingkatan');
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

         $detailContent = [
            'id' => $data['id'],
            'nama' => $data['nama'],
            'keterangan' => html_entity_decode($data['keterangan'])
         ];
   
         $result = [];
         $result['detailContent'] = $detailContent;
         $result[] = $data['nama'];
         $result[] = html_entity_decode($data['keterangan']);
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