<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/posts/generate", [PostController::class, 'generate']);
Route::get('/posts', [PostController::class, 'index']);

Route::get('/categories', [CategoryController::class, 'index']);
