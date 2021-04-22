<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getAllPosts(){
        $post = Post::query()->orderBy("updated_at","DESC")->get()->toJson( JSON_PRETTY_PRINT);
        return response($post,200);
    }

    public function createPost(Request $request){
        $user = User::query()->find($request->user_id);

        $post = new Post;
        $post-> title = $request-> title;
        $post-> description = $request-> description;
        $post-> image = $request-> image;
        $post-> likes = $request-> likes;
        $post-> dislikes = $request-> dislikes;
        if( $request-> status == 'E'|| $request-> status == 'D' || $request-> status == 'S' ){
            $post-> status = $request -> status;
        }else{
            return response()->json([
                "message" => "invalid status"
            ], 400);
        }
        $user->Post()->save($post);

        return response()-> json([
            "message" => "Post record created"
        ],201);
    }

    public function getAllAuthorPosts($user_id){
        if(User::query()->whereKey($user_id)->exists()){
//                $posts = User::query()->find($user_id)->post()->get();

            $posts = User::query()->find($user_id)->Post()->get()->toJson(JSON_PRETTY_PRINT);
            return response($posts, 200);

        }   else {
            return response()->json([
                "message" => "User not found"
            ],404);
        }
    }

    public function getPostById($post_id){
        if(Post::query()->whereKey($post_id)->exists()){
            $post = Post::query()->whereKey($post_id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($post, 200);
        }
        else{
            return response()->json([
                "message" => "Post not found"
            ],404);
        }
    }

    public function getAuthorPostsGBY(Request $request){
        if(User::query()->whereKey($request->user_id)->exists()){

            $posts = Post::query()->where("user_id", "=", $request->user_id)->whereYear('created_at', "=", $request->year)->get();
            return response($posts, 200);

        }   else {
            return response()->json([
                "message" => "Post not found"
            ],404);
        }
    }

    public function searchPost($query){
        if(Post::query()->where("title",'LIKE',"%".$query."%")->orWhere("description",'LIKE',"%".$query."%")->exists()){
            $post = Post::query()->where("title",'LIKE',"%".$query."%")->orWhere("description",'LIKE',"%".$query."%")->get()->toJson(JSON_PRETTY_PRINT);
            return response($post,200);
        }else{
            return response()->json([
                "message" => "User not found"
            ],404);
        }
    }

    public function updatePost(Request $request, $id){
        if (Post::query()->whereKey($id)->exists()){
            $post = Post::query()->find($id);
            $post-> title = is_null($request->title) ? $post->title : $request->title;
            $post-> description = is_null($request->description) ? $post->description : $request->description;
            $post-> image = is_null($request->image) ? $post->image : $request->image;
            $post-> likes = is_null($request->likes) ? $post->likes : $request->likes;
            $post-> dislikes = is_null($request->dislikes) ? $post->dislikes : $request->dislikes;
            if( $request-> status === 'E'|| $request-> status === 'D' || $request-> status === 'S' ){
                $post-> status = $request -> status;
            }else{
                return response()->json([
                    "message" => "invalid status"
                ], 500);
            }
            $post-> save();

            return response()->json([
                "message" => "records updated succesfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Post not found"
            ],201);
        }
    }

    public function deletePost($id){
        if(Post::query()->whereKey($id)->exists()){
            $post = Post::query()->find($id);
            $post->delete();

            return response()->json([
                "message" => "records deleted succesfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }
}
