<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/posts/generate", [PostController::class, 'generate']);
Route::get('/posts', [PostController::class, 'index']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::prefix('dashboard')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/posts', [DashboardController::class, 'posts']);
        Route::get('/posts/{post}', [DashboardController::class, 'post']);
    });

require __DIR__ . '/oauth.php';
