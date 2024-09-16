import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import SinglePost from "@/Components/posts/single-post";
import { Card, CardContent } from "@/Components/ui/card";
import { Category, Post, User } from "@/types";
import { Head } from "@inertiajs/react";
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
            <Head title={post?.title} />

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
