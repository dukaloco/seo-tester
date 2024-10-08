import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import SinglePost from "@/Components/posts/single-post";
import Seo from "@/Components/seo";
import { Category, Post, User } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

interface Props {
    slug: string;
}

const Show = ({ slug }: Props) => {
    // fetch the post
    const [isPending, startTransition] = useTransition();
    const [post, setPost] = useState<
        (Post & { category?: Category | null; user: User | null }) | null
    >(null);

    const fetchPost = () => {
        startTransition(() => {
            axios
                .get(`/api/posts/${slug}`)
                .then((res) => res.data)
                .then((data) => {
                    setPost(data.data);
                });
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <>
            <Seo
                title={post?.title}
                description={post?.excerpt}
                image={post?.featured_img}
            />

            <div className="container">
                <Navbar />

                {isPending ? (
                    <p>
                        Loading <Loader2 />
                    </p>
                ) : !post ? (
                    <h3 className="text-center font-semibold text-red-300">
                        POST NOT FOUND or NOT PUBLISHED!
                    </h3>
                ) : (
                    <SinglePost post={post} />
                )}

                <Footer />
            </div>
        </>
    );
};

export default Show;
