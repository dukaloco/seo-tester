import { Category, Post, User } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

interface Props {
    post: Post & { category?: Category | null; user: User | null };
}

const PostCard = ({ post }: Props) => {
    return (
        <article>
            <Card className="flex flex-col">
                <img
                    src={post.featured_img}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="flex justify-between items-center gap-x-2">
                        {post.category && (
                            <span>
                                <Link href="#">{post.category.name}</Link>
                            </span>
                        )}

                        <span className="capitalize">
                            <Link href="#">{post.user?.name}</Link>
                        </span>

                        <span>{post.published_at_human}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div>{post.excerpt}</div>
                </CardContent>
                <CardFooter className="flex justify-between gap-x-3">
                    <Link href={route("posts.show", post.slug)}>
                        <Button variant={"outline"}>Read More</Button>
                    </Link>

                    <Link href={route("posts.show.client-side", post.slug)}>
                        <Button variant={"secondary"}>Client-Side</Button>
                    </Link>
                </CardFooter>
            </Card>
        </article>
    );
};

export default PostCard;
