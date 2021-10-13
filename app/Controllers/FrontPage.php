<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class FrontPage extends BaseController {

   protected $env = 'production';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function template($content = [], $fileJs) {
      $internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);
		
		$data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
		$data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS($fileJs);
      $data['segment'] = $this->setSegment();

		echo view('FrontPage', $data);
   }

   protected function generateWebpackJS($fileJs) {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/vendor.js',
            'http://localhost:8081/header.js',
            'http://localhost:8081/navigation.js',
            "http://localhost:8081/{$fileJs}.js"
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/frontpage/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $script_tag[] = base_url("bundle/frontpage/{$set['vendor.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$set['header.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$set['navigation.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$set[$fileJs . '.js']}");

         return script_tag($script_tag);
      }
   }

}