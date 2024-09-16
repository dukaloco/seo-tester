<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Post::with('category')
            ->published()
            ->latest('published_at')
            ->paginate(4);

        if (request()->wantsJson()) {
            return PostResource::collection($data);
        }

        return Inertia::render('Posts/Index', [
            'posts' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $post = Post::with('category', 'user')
            ->where('slug', $slug)
            ->firstOrFail();

        abort_if(!($post->is_published || $post->user_id == auth()->id()), 404);

        if (request()->wantsJson()) {
            return new PostResource($post);
        }

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function showClientSide($slug)
    {
        return Inertia::render('Posts/ShowClientSide', [
            'slug' => $slug,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    public function generate()
    {
        Post::factory()->count(10)->create();

        return $this->respSuccess();
    }
}
