<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index($userId, $memberId)
    {
        $response = Chat::where('userId', 'like', $userId)
            ->where('memberId', 'like', $memberId)->get();

        return response()->json([
            'status' => 'success',
            'chats' => $response
        ]);
    }

    public function notification($userId)
    {
        $response = Chat::where('userId', 'like', $userId)->get();

        return response()->json([
            'status' => 'success',
            'notifications' => $response
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required',
            'memberId' => 'required',
            'title' => 'string|max:255',
            'category' => 'string|max:255',
            'description' => 'string|max:255',
            'message' => 'required|string|max:255',
        ]);

        $chat = Chat::create([
            'userId' => $request->userId,
            'memberId' => $request->memberId,
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'message' => $request->message,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Chat created successfully',
            'chat' => $chat,
        ]);
    }
}
