<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published_at',
        'featured_img',
        'category_id',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function isPublished() : Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return $value->published_at->isFuture();
            }
        );
    }

    public function scopePublished($query)
    {
        return $query->where('published_at', '<=', now());
    }
}
