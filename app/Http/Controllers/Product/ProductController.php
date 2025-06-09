<?php

namespace App\Http\Controllers\Product;

use App\DTOs\OperationResultDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/Product');
    }

    public function list(): JsonResponse
    {
        try {
            $user = Auth::user();
            $products = $user->products()->where('user_id', $user->user_id)->get();

            return response()->json(new OperationResultDTO(
                true,
                'Successfully fetched products.',
                null,
                $products
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to fetch products for this account.',
                null,
                $e->getMessage()
            ), 404);
        }
    }

    public function find($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);

            return response()->json(new OperationResultDTO(
                true,
                'Successfully fetched target product of user.',
                null,
                $product
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to fetch target product for this account.',
                null,
                $e->getMessage()
            ), 404);
        }
    }

    public function store(ProductRequest $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $product = Product::create($request->validated());

            $product->save();

            // Attach to the `user_product` table
            $user->products()->attach($product->product_id);

            return response()->json(new OperationResultDTO(
                true,
                'Successfully created a product for this user.',
                null,
                $product
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to create a product for this account.',
                null,
                $e->getMessage()
            ), 404);
        }
    }

    public function update(ProductRequest $request, $id): JsonResponse
    {
        try {
            $user = Auth::user();
            $product = $user->products()->where('product.product_id', $id)->firstOrFail();

            // Update product details
            $product->update($request->validated());

            return response()->json(new OperationResultDTO(
                true,
                'Successfully updated a product for this user.',
                null,
                $product
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to update a product for this account.',
                null,
                $e->getMessage()
            ), 404);
        }
    }

    public function delete($id): JsonResponse
    {
        try {
            $user = Auth::user();
            $product = $user->products()->where('product.product_id', $id)->firstOrFail();

            // Detach to the `user_product` table
            $user->products()->detach($product->product_id);

            $product->delete();

            return response()->json(new OperationResultDTO(
                true,
                'Successfully deleted a product for this user.',
                null,
                $product
            ), 200);
        } catch (Exception $e) {
            return response()->json(new OperationResultDTO(
                false,
                'Failed to deleted a product for this account.',
                null,
                $e->getMessage()
            ), 404);
        }
    }
}
