<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    /**
     * Fetch user posts
     */
    public function posts(Request $request)
    {
        $data = Post::with('category', 'user')
            ->where('user_id', auth()->id())
            ->paginate(4);

        if ($request->wantsJson()) {
            return PostResource::collection($data);
        }

        return Inertia::render('Dashboard/Posts/Index', [
            'posts' => PostResource::collection($data),
        ]);
    }

    /**
     * Fetch single post
     */
    public function post(Request $request, Post $post)
    {
        abort_if(!($post->user_id == auth()->id() || $post->is_published), 403);

        $post = $post->load('category', 'user');

        if ($request->wantsJson()) {
            return new PostResource($post);
        }

        return Inertia::render('Dashboard/Posts/Show', [
            'post' => new PostResource($post),
        ]);
    }
}
