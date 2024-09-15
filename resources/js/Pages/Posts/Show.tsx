import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import { Post } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    post: Post;
}

const Show = ({ post }: Props) => {
    return (
        <>
            <Head title={post.title} />

            <div className="container">
                <Navbar />

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
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </article>

                <Footer />
            </div>
        </>
    );
};

export default Show;
