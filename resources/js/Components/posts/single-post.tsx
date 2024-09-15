import { Post } from "@/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

interface Props {
    post: Post;
}

const SinglePost = ({ post }: Props) => {
    return (
        <Card className="flex flex-col">
            <img
                src={post.featured_img}
                alt={post.title}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div>{post.excerpt}</div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Link href={route("posts.show", post.slug)}>
                    <Button variant={"outline"}>Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default SinglePost;
