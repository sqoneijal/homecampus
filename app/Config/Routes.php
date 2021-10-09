<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers\FrontPage');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

$routes->group('tingkatan', function($routes) {
	$routes->get('(:num)', 'Tingkatan::index/$1');
	$routes->get('getdetail/(:num)', 'Tingkatan::getDetail/$1');
	$routes->get('getbab/(:num)', 'Tingkatan::getBAB/$1');
	$routes->get('getjudul', 'Tingkatan::getJudul');

	$routes->group('(:num)', function($routes) {
		$routes->group('bab', function($routes) {
			$routes->get('(:num)', 'BAB::index/$1');
		});
	});
});

$routes->group('judul', function($routes) {
	$routes->get('(:num)', 'Judul::index/$1');
	$routes->get('getdetailjudul/(:num)', 'Judul::getDetailJudul/$1');
	$routes->get('getdaftarsoal/(:num)', 'Judul::getDaftarSoal/$1');
});

$routes->group('navigation', function($routes) {
	$routes->get('gettingkatan', 'Navigation::getTingkatan');
	$routes->get('getbab', 'Navigation::getBAB');
});

$routes->group('login', ['namespace' => 'App\Controllers'], function($routes) {
	$routes->get('/', 'Login::index');
	$routes->get('logout', 'Login::logout');

	$routes->post('submit', 'Login::submit');
});

$routes->group('admin', ['namespace' => 'App\Controllers\Admin'], function($routes) {
	$routes->group('dashboard', function($routes) {
		$routes->get('/', 'Dashboard::index');
	});

	$routes->group('pengguna', ['namespace' => 'App\Controllers\Admin\Pengguna'], function($routes) {
		$routes->group('akun', function($routes) {
			$routes->get('/', 'Akun::index');

			$routes->post('getdata', 'Akun::getData');
			$routes->post('submit', 'Akun::submit');
			$routes->post('hapus', 'Akun::hapus');
		});
	});

	$routes->group('tingkatan', function($routes) {
		$routes->get('/', 'Tingkatan::index');

		$routes->post('submit', 'Tingkatan::submit');
		$routes->post('getdata', 'Tingkatan::getData');
		$routes->post('hapus', 'Tingkatan::hapus');
	});

	$routes->group('bab', function($routes) {
		$routes->get('/', 'BAB::index');
		$routes->get('gettingkatan', 'BAB::getTingkatan');

		$routes->post('submit', 'BAB::submit');
		$routes->post('getdata', 'BAB::getData');
		$routes->post('hapus', 'BAB::hapus');
	});

	$routes->group('judul', function($routes) {
		$routes->get('/', 'Judul::index');
		$routes->get('gettingkatan', 'Judul::getTingkatan');

		$routes->post('submit', 'Judul::submit');
		$routes->post('getdata', 'Judul::getData');
		$routes->post('hapus', 'Judul::hapus');
		$routes->post('getbab', 'Judul::getBAB');
	});
});

$routes->group('translator', ['namespace' => 'App\Controllers\Translator'], function($routes) {
	$routes->group('dashboard', function($routes) {
		$routes->get('/', 'Dashboard::index');
	});

	$routes->group('soal', function($routes) {
		$routes->get('/', 'Soal::index');
		$routes->get('gettingkatan', 'Soal::getTingkatan');

		$routes->post('submit', 'Soal::submit');
		$routes->post('getbab', 'Soal::getBAB');
		$routes->post('getjudul', 'Soal::getJudul');
		$routes->post('getdata', 'Soal::getData');
		$routes->post('hapus', 'Soal::hapus');
	});
});

$routes->group('editor', ['namespace' => 'App\Controllers\Editor'], function($routes) {
	$routes->group('dashboard', function($routes) {
		$routes->get('/', 'Dashboard::index');
	});

	$routes->group('soal', function($routes) {
		$routes->get('/', 'Soal::index');
		$routes->get('gettingkatan', 'Soal::getTingkatan');

		$routes->post('getdata', 'Soal::getData');
		$routes->post('getbab', 'Soal::getBAB');
		$routes->post('getjudul', 'Soal::getJudul');
		$routes->post('submit', 'Soal::submit');
	});
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
