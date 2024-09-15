<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

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

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function isPublished(): Attribute
    {
        return Attribute::make(
            get: fn() => !empty($this->published_at),
        );
    }

    public function excerpt(): Attribute
    {
        return Attribute::make(
            get: fn() => Str::substr(strip_tags($this->content), 0, 100),
        );
    }

    public function scopePublished($query)
    {
        return $query->where('published_at', '<=', now());
    }
}
