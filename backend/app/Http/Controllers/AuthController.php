<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'profile_image' => 'string',
            'phone' => 'string|between:3,25|nullable',
            'birth_date' => 'date|nullable',
            'user_enabled' => 'required|boolean',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
//            date('Y-m-d h:i:s', strtotime($yourDate));
            ['birth_date' => date('Y-m-d h:i:s', strtotime($request->birth_date))],
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function updatePassword(Request $request){

            $data = $request->all();
            $user = Auth::guard('api')->user();

            //Changing the password only if is different of null
            if( isset($data['password']) && !empty($data['password']) && $data['password'] !== "" && $data['password'] !=='undefined') {
                //checking the old password first
                $validator = Validator::make($data, [
                    'email' => 'required|email',
                    'password' => 'required|string|min:8'
                ]);

                $validatorNewPassword = Validator::make($data, [

                    'newPassword' => 'required|string|confirmed|min:8'
                ]);
                if($validator->fails()){
                    return response()->json($validator->errors(), 422);
                }
                else if(!$validatorNewPassword->fails()) {

                    $user->password = bcrypt($data['newPassword']);
                    if (! $token = auth()->attempt($validator->validated())) {
                        return response()->json(['error' => 'Unauthorized'], 401);
                    }

                    $result = $this->createNewToken($token);

                    //Changing the type
                    $user->save();

                    return $result; //sending the new token
                }
                else {
                    return "Wrong New password";
                }
            }
            return "Wrong Old password";
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function deleteUser($id){


            if(User::query()->whereKey($id)->exists()){
            $user = User::query()->find($id);
            $user->delete();

            return response()->json([
                "message" => "User deleted succesfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => ['email'=> auth()->user()->email, "id" => auth()->user()->id, "first_name" => auth()->user()->first_name]
        ]);
    }



}
