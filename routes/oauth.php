<?php

// socialite

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/oauth/redirect/{provider}', [AuthenticatedSessionController::class, 'oauthRedirect'])
    ->name('oauth.redirect');

Route::get('/oauth/callback/{provider}', [AuthenticatedSessionController::class, 'oauthCallback'])
    ->name('oauth.callback');

Route::get('/oauth/callback-with-token/{provider}', [AuthenticatedSessionController::class, 'oauthCallbackWithToken'])
    ->name('oauth.callback-with-token');

    Route::get('/oauth/callback-from-api/{provider}', [AuthenticatedSessionController::class, 'oauthCallbackFromApi'])
    ->name('oauth.callback-from-api');
