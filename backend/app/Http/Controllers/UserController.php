<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAllUsers(){
        $users = User::query()->select(
            'id',
            'first_name',
            'last_name',
            'email',
            'profile_image',
            'phone',
            'birth_date',
            'user_enabled',
            'created_at',
            'updated_at'
        )->orderBy("updated_at","DESC")->get()->toJson(JSON_PRETTY_PRINT);
        return response($users,200);
    }

    public function getUser($email){
        if(User::query()->where('email', "=", $email)->exists()){
            $user = User::query()->select(
                'id',
                'first_name',
                'last_name',
                'email',
                'profile_image',
                'phone',
                'birth_date',
                'user_enabled',
                'created_at',
                'updated_at'
            )->where('email', "=", $email)->get()->toJson(JSON_PRETTY_PRINT);
            return response($user,200);
        }   else {
            return response()->json([
                "message" => "Author not found"
            ],404);
        }
    }

    public function getUserById($id){
        if(User::query()->whereKey( $id)->exists()){
            $user = User::query()->select(
                'id',
                'first_name',
                'last_name',
                'email',
                'profile_image',
                'phone',
                'birth_date',
                'user_enabled',
                'created_at',
                'updated_at'
            )->whereKey($id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($user,200);
        }   else {
            return response()->json([
                "message" => "Author not found"
            ],404);
        }
    }

    public function searchUser($query){
        if(User::query()->where("first_name",'LIKE',"%".$query."%")->orWhere("last_name",'LIKE',"%".$query."%")->orWhere("email",'LIKE',"%".$query."%")->exists()){
            $user = user::query()->select(
                'id',
                'first_name',
                'last_name',
                'email',
                'profile_image',
                'phone',
                'birth_date',
                'user_enabled',
                'created_at',
                'updated_at'
            )->where("first_name",'LIKE',"%".$query."%")
                ->orWhere("last_name",'LIKE',"%".$query."%")
                ->orWhere("email",'LIKE',"%".$query."%")->get()->toJson(JSON_PRETTY_PRINT);
            return response($user,200);
        }else{
            return response()->json([
                "message" => "Author not found"
            ],404);
        }
    }


    public function updateUser(Request $request, $id){
        if (User::query()->whereKey($id)->exists()){
            $user = User::query()->find($id);
            $user-> first_name = is_null($request->first_name) ? $user->first_name : $request->first_name;
            $user-> last_name = is_null($request->last_name) ? $user->last_name : $request->last_name;
            $user-> profile_image = is_null($request->profile_image) ? $user->profile_image : $request->profile_image;
            $user-> phone = is_null($request->phone) ? $user->phone : $request->phone;
            $user-> birth_date = is_null($request->birth_date) ? $user->birth_date : $request->birth_date;
            $user-> user_enabled = is_null($request->user_enabled) ? $user->user_enabled : $request->user_enabled;
            $user-> save();

            return response()->json([
                "message" => "records updated succesfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Author not found"
            ],201);
        }
    }

}
