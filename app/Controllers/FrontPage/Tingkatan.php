<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage;
use App\Models\FrontPage\Tingkatan as Model;

class Tingkatan extends FrontPage {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index($id_tingkatan) {
      $this->data = [
         'title' => 'Tingkatan'
      ];

      $this->template($this->data, 'tingkatan');
   }

   public function getDetail($id_tingkatan) {
      $model = new Model();
      $content = $model->getDetail($id_tingkatan);
      return $this->response->setJSON($content);
   }

   public function getBAB($id_tingkatan) {
      $model = new Model();
      $content = $model->getBAB($id_tingkatan);
      return $this->response->setJSON($content);
   }

   public function getJudul() {
      $model = new Model();
      $content = $model->getJudul();
      return $this->response->setJSON($content);
   }

}