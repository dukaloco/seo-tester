import { Category, Post, User } from "@/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";

interface Props {
    post: Post & { category?: Category | null; user: User | null };
}

const SinglePost = ({ post }: Props) => {
    return (
        <div className="relative">
            <article className="space-y-3 prose lg:prose-lg">
                <h1 className="text-3xl font-bold text-center">{post.title}</h1>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div className="w-full h-64">
                    <img
                        src={post.featured_img}
                        alt={post.title}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                </div>
            </article>

            {/* sidebar */}
            <div className="md:absolute md:right-0 md:top-0">
                <div className="relative">
                    <div className="sticky top-0">
                        <Card>
                            <CardContent className="pt-4">
                                <dl className="grid grid-cols-2 gap-2">
                                    <dt>By</dt>
                                    <dd>{post.user?.name}</dd>

                                    <dt>Under</dt>
                                    <dd>{post.category?.name}</dd>

                                    <dt>Published</dt>
                                    <dd>{post.published_at_human}</dd>
                                </dl>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-y-3">
                                <Link href={route("posts.show", post.slug)}>
                                    <Button variant={"outline"}>
                                        View Server-Loaded
                                    </Button>
                                </Link>

                                <Link
                                    href={route(
                                        "posts.show.client-side",
                                        post.slug
                                    )}
                                >
                                    <Button variant={"secondary"}>
                                        View Client-Side Loaded
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
