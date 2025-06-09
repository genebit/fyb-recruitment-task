<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\OperationResultDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password)
            ]);

            $token = Auth::login($user);

            return response()->json(new OperationResultDTO(
                true,
                "User {$request->email} has been successfully registered.",
                null,
                $this->respondWithToken($token)
            ), 201);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Registration failed: ' . $e->getMessage(),
                null
            ), 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');

            if (! $token = Auth::attempt($credentials)) {
                throw new Exception('Invalid credentials', 401);
            }

            return response()->json(new OperationResultDTO(
                true,
                'Login successful.',
                null,
                $this->respondWithToken($token)
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Login failed: ' . $e->getMessage(),
                null
            ), $e->getCode() ?: 500);
        }
    }

    public function me(): JsonResponse
    {
        try {
            $user = Auth::user();

            return response()->json(new OperationResultDTO(
                true,
                'User retrieved successfully.',
                null,
                $user
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to retrieve user: ' . $e->getMessage(),
                null
            ), 500);
        }
    }

    public function logout(): JsonResponse
    {
        try {
            Auth::logout();

            return response()->json(new OperationResultDTO(
                true,
                'User has been successfully logged out.',
                null
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Logout failed: ' . $e->getMessage(),
                null
            ), 500);
        }
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token'  => $token,
            'token_type'    => 'bearer',
            'expires_in'    => Auth::factory()->getTTL() * 60
        ]);
    }
}
