<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage;
use App\Models\FrontPage\Judul as Model;

class Judul extends FrontPage {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index($id_bab) {
      $this->data = [
         'title' => 'Judul'
      ];

      $this->template($this->data, 'judul');
   }

   public function getDetail() {
      $model = new Model();
      $content = $model->getDetail($this->post['id_judul']);
      return $this->response->setJSON($content);
   }

   public function getDaftarSoal() {
      $model = new Model();
      $content = $model->getDaftarSoal($this->post['id_judul']);
      return $this->response->setJSON($content);
   }

}