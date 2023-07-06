<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index($userId)
    {
        $users = Cart::where('userId', 'like', $userId)->get();
        return response()->json([
            'status' => 'success',
            'cart' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'userId' => 'required'
        ]);

        $cart = Cart::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'userId' => $request->userId
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'cart' => $cart,
        ]);
    }

    public function destroy($id)
    {
        $cart = Cart::find($id);
        $cart->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cart deleted successfully',
            'cart' => $cart,
        ]);
    }
}