<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public function author(){
        return $this->belongsTo('App\Models\User');
    }

    protected $fillable = ['title','description','image','likes','dislikes'];

}
