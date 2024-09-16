import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import SinglePost from "@/Components/posts/single-post";
import { Card, CardContent } from "@/Components/ui/card";
import { Category, Post, User } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    post: Post & { category?: Category | null; user: User | null };
}

const Show = ({ post }: Props) => {
    return (
        <>
            <Head title={post.title} />

            <div className="container">
                <Navbar />

                <SinglePost post={post} />

                <Footer />
            </div>
        </>
    );
};

export default Show;
