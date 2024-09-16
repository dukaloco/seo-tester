<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get("/posts/generate", [PostController::class, 'generate'])->name('posts.generate');
Route::get("/posts/client-side/{slug}", [PostController::class, 'showClientSide'])->name('posts.show.client-side');
Route::resource('/posts', PostController::class);

// Filament overrides
Route::get('/admin/login', function () {
    return redirect('/login');
})->name('filament.admin.auth.login');

/*
|--------------------------------------------------------------------------
| user dashboard Routes
|--------------------------------------------------------------------------
 */
Route::prefix('dashboard')
    ->middleware(['auth:sanctum', 'verified', 'dashboard-redirector:' . implode(',', [User::ROLE_USER])])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::as('dashboard.')->group(function () {
            Route::get('/posts', [DashboardController::class, 'posts'])->name('posts.index');
            Route::get('/posts/{post}', [DashboardController::class, 'post'])->name('posts.show');
        });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | admin dashboard Routes
    |--------------------------------------------------------------------------
     */
    Route::get('/adm', function () {
        return redirect()->route('filament.admin.pages.dashboard');
    })->name('admin.dashboard');

});

require __DIR__ . '/auth.php';
require __DIR__ . '/oauth.php';
