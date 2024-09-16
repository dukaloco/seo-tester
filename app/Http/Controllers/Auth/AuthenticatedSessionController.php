<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use function Illuminate\Log\log;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedSessionController extends Controller
{
    protected $allowedProviders = [
        'github',
    ];

    /**
     * Display the login view.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse | Response
    {
        $request->authenticate();

        if ($request->wantsJson()) {
            $user = auth()->user();
            $deviceName = $request->device_name ?? $user->name . ' device';

            return response()->json([
                'message' => 'Login Successful',
                'two_factor' => false,
                'errors' => false,
                'auth' => true,
                'user' => new UserResource($user),
                'access_token' => $user->createToken($deviceName)->plainTextToken,
                // 'refresh_token' => $token->refresh_token,
            ]);
        }

        $request->session()->regenerate();

        $user = auth()->user();

        if ($user->isAdmin || $user->isSudo) {
            return Inertia::location(route('admin.dashboard'));
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * redirect to the oauth provider
     */
    public function oauthRedirect(Request $request, $provider)
    {
        $provider = strtolower($provider);

        abort_if(!in_array($provider, $this->allowedProviders), 404);

        return Socialite::driver($provider)->redirect();
    }

    /**
     * handle oauth provider callback
     */
    public function oauthCallback(Request $request, $provider)
    {
        $provider = strtolower($provider);

        abort_if(!in_array($provider, $this->allowedProviders), 404);

        try {
            $oauthUser = Socialite::driver($provider)->user();

            $user = $this->getUserFromProvider($provider, $oauthUser);

            Auth::login($user);

            if ($user->isAdmin || $user->isSudo) {
                return Inertia::location(route('admin.dashboard'));
            }

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (Exception $e) {
            log($e->getMessage());

            return redirect()->route('home')->withError('An Error Occurred!');
        }
    }

    /**
     * handle oauth provider callback with oauth token.
     */
    public function oauthCallbackWithToken(Request $request, $provider)
    {
        $request->validate([
            'token' => 'required|string|min:1',
        ]);

        $provider = strtolower($provider);

        abort_if(!in_array($provider, $this->allowedProviders), 404);

        $oauthUser = Socialite::driver($provider)->userFromToken($request->token);

        $user = $this->getUserFromProvider($provider, $oauthUser);

        Auth::login($user);

        if ($user->isAdmin || $user->isSudo) {
            return Inertia::location(route('admin.dashboard'));
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * handle oauth provider callback from api
     */
    public function oauthCallbackFromApi(Request $request, $provider)
    {
        $request->validate([
            'token' => 'nullable|string|min:1',
        ]);

        $provider = strtolower($provider);

        try {
            abort_if(!in_array($provider, $this->allowedProviders), 404, "{$provider} is not allowed");

            $oauthUser = request('token')
            ? Socialite::driver($provider)->stateless()->userFromToken($request->token)
            : Socialite::driver($provider)->stateless()->user();

            $user = $this->getUserFromProvider($provider, $oauthUser);

            // create a token for the user, so they can login
            $token = $user->createToken(config('app.name'))->accessToken;

            return response()->json([
                'success' => true,
                'access_token' => $token,
                'user' => new UserResource(resource: $user),
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * get or create a user fomr an oauthUser
     */
    private function getUserFromProvider(string $provider, $oauthUser)
    {
        $provider = strtolower($provider);

        return User::updateOrCreate([
            $provider . "_id" => $oauthUser->id,
        ], [
            'name' => $oauthUser->name,
            'email' => $oauthUser->email,
            $provider . '_token' => $oauthUser->token,
            $provider . '_refresh_token' => $oauthUser->refreshToken,
            'avatar' => $oauthUser->getAvatar(),
            'password' => bcrypt(Str::random()),
        ]);
    }
}
