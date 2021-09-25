<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage;
use App\Models\FrontPage\Navigation as Model;

class Navigation extends FrontPage {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function getBAB() {
      $model = new Model();
      $content = $model->getBAB();
      return $this->response->setJSON($content);
   }

   public function getTingkatan() {
      $model = new Model();
      $content = $model->getTingkatan();
      return $this->response->setJSON($content);
   }

}