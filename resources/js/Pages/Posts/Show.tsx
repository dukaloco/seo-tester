import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import { Card, CardContent } from "@/Components/ui/card";
import { Category, Post, User } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    post: Post & { category?: Category | null; user: User | null };
}

const Show = ({ post }: Props) => {
    console.log("post", post);
    return (
        <>
            <Head title={post.title} />

            <div className="container">
                <Navbar />

                <div className="relative">
                    <article className="space-y-3 prose lg:prose-lg">
                        <h1 className="text-3xl font-bold text-center">
                            {post.title}
                        </h1>
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
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Show;
