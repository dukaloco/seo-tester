<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'is_published' => $this->is_published,
            'excerpt' => $this->excerpt,

            //
            'user' => UserResource::make($this->user),
            'category' => CategoryResource::make($this->whenLoaded('category')),
        ]);
    }
}
