<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'site' => [
                'name' => config('app.name'),
                'slogan' => "The best place to get your daily dose of posts!",
                'description' => "This is a sample description. If you see this, please don't hesitate to contact us at support@example.com. WE THE BEST MUSIK!",
                'image' => asset('logo.png'),
            ],
        ];
    }
}
