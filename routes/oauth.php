<?php

// socialite

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/oauth/redirect/{provider}', [AuthenticatedSessionController::class, 'oauthRedirect'])
    ->name('oauth.redirect');

Route::get('/oauth/callback/{provider}', [AuthenticatedSessionController::class, 'oauthCallback'])
    ->name('oauth.callback');
