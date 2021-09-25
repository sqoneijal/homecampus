<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage;
use App\Models\FrontPage\BAB as Model;

class BAB extends FrontPage {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index($id_bab) {
      $this->data = [
         'title' => 'BAB'
      ];

      $this->template($this->data, 'bab');
   }

   public function getDetail() {
      $model = new Model();
      $content = $model->getDetail($this->post['id_bab']);
      return $this->response->setJSON($content);
   }

   public function getDaftarJudul() {
      $model = new Model();
      $content = $model->getDaftarJudul($this->post['id_bab']);
      return $this->response->setJSON($content);
   }

}