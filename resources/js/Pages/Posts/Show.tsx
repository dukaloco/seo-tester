import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import SinglePost from "@/Components/posts/single-post";
import Seo from "@/Components/seo";
import { Card, CardContent } from "@/Components/ui/card";
import { Category, Post, User } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    post: Post & { category?: Category | null; user: User | null };
}

const Show = ({ post }: Props) => {
    return (
        <>
            <Seo
                title={post.title}
                description={post.excerpt}
                image={post.featured_img}
            />

            <div className="container">
                <Navbar />

                <SinglePost post={post} />

                <Footer />
            </div>
        </>
    );
};

export default Show;
