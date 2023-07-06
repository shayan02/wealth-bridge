<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $posts = Post::all();
        return response()->json([
            'status' => 'success',
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:500',
            'description' => 'required|string|max:500',
            'category' => 'required|string|max:500'
        ]);

        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'post' => $post,
        ]);
    }

    public function show($id)
    {
        $post = Post::find($id);
        return response()->json([
            'status' => 'success',
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:500',
            'description' => 'required|string|max:500',
            'category' => 'required|string|max:500'
        ]);

        $post = Post::find($id);
        $post->title = $request->title;
        $post->description = $request->description;
        $post->category = $request->category;
        $post->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Post updated successfully',
            'post' => $post,
        ]);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully',
            'post' => $post,
        ]);
    }
}