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

   public function index($id_judul) {
      $this->data = [
         'title' => 'Judul'
      ];

      $this->template($this->data, 'judul');
   }

   public function getDetailJudul($id_judul) {
      $model = new Model();
      $content = $model->getDetailJudul($id_judul);
      return $this->response->setJSON($content);
   }

   public function getDaftarSoal($id_judul) {
      $model = new Model();
      $content = $model->getDaftarSoal($id_judul);
      return $this->response->setJSON($content);
   }

}