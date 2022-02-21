<?php

namespace App\Controllers\Translator;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Translator;
use App\Validation\Translator\Soal as Validate;
use App\Models\Translator\Soal as Model;

class Soal extends Translator {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Soal',
         'internalCss' => $this->assets->datatable['css'],
         'internalJs' => [
            tinymce['js'],
            $this->assets->datatable['js'],
         ],
      ];

      $this->template($this->data, 'soal');
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
         $action .= '<a class="btn btn-sm btn-warning" href="#" id="edit"><i class="ri-edit-2-line"></i></a>';
         $action .= '<a class="btn btn-sm btn-danger" href="#" id="delete"><i class="ri-delete-bin-line"></i></a>';
         $action .= '</div>';

         $detailContent = [
            'id_soal' => $data['id_soal'],
            'id_judul' => $data['id_judul'],
            'nama' => $data['nama'],
            'content' => $data['content'],
            'id_tingkatan' => $data['id_tingkatan'],
            'id_bab' => $data['id_bab'],
            'sub_bab' => $data['sub_bab'],
            'bab' => $data['bab'],
            'tingkatan' => $data['tingkatan'],
         ];
   
         $result = [];
         $result['detailContent'] = $detailContent;
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