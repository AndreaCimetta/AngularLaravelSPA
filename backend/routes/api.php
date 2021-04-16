<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/update-password', [AuthController::class, 'updatePassword']);
    Route::delete('/delete-user/{id}', [AuthController::class, 'deleteUser']);

});








Route::group([
    'middleware' => 'api',
    'prefix' => 'users'

], function ($router) {
    Route::get('/get-users', [\App\Http\Controllers\UserController::class, 'getAllUsers']);
    Route::get('/get-user/{email}', [\App\Http\Controllers\UserController::class, 'getUser']);
    Route::get('/get-user-byid/{id}', [\App\Http\Controllers\UserController::class, 'getUserById']);
    Route::get('/search-user/{string}', [\App\Http\Controllers\UserController::class, 'searchUser']);
    Route::put('/update-user/{id}', [\App\Http\Controllers\UserController::class, 'updateUser']);
});






Route::group([
    'middleware' => 'api',
    'prefix' => 'posts'

], function ($router) {
    Route::post('/create-post', [\App\Http\Controllers\PostController::class, 'createPost']);
    Route::get('/get-posts', [\App\Http\Controllers\PostController::class, 'getAllPosts']);
    Route::get('/get-user-posts/{id}', [\App\Http\Controllers\PostController::class, 'getAllAuthorPosts']);
    Route::get('/search-post/{string}', [\App\Http\Controllers\PostController::class, 'searchPost']);
    Route::put('/update-post/{id}', [\App\Http\Controllers\PostController::class, 'updatePost']);
    Route::delete('/delete-post/{id}', [\App\Http\Controllers\PostController::class, 'deletePost']);
});








Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
