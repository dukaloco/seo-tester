import { Category, PaginationMeta, Post, User } from "@/types";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import Paginator from "../paginator";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import GeneratePostsButton from "./generate-posts-button";
import SinglePost from "./single-post";
import ReactJson from "react-json-view";
import { ScrollArea } from "../ui/scroll-area";

interface Props {}

const AllPosts = ({}: Props) => {
    const [posts, setPosts] = useState<
        (Post & {
            category: Category;
            user: User;
        })[]
    >([]);

    const [meta, setMeta] = useState<PaginationMeta | null>(null);

    const [isPending, startTransition] = useTransition();

    const fetchPosts = (page = 1) => {
        startTransition(() => {
            axios
                .get(`/api/posts?page=${page}`)
                .then((res) => res.data)
                .then((data) => {
                    setPosts(data.data);
                    setMeta(data.meta);
                });
        });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (isPending) {
        return <SkeletonLoader />;
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-x-4">
                <GeneratePostsButton
                    onGenerate={() => {
                        fetchPosts();
                    }}
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">View JSON Response</Button>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>JSON Response</DialogTitle>
                        </DialogHeader>
                        <div>
                            <ScrollArea className="h-[80vh] w-full rounded-md border">
                                <ReactJson
                                    src={posts}
                                    name="posts"
                                    collapsed={true}
                                />
                            </ScrollArea>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                    <SinglePost key={post.id} post={post} />
                ))}
            </div>

            {meta && (
                <Paginator
                    meta={meta}
                    onNextPage={() => {
                        fetchPosts(meta?.current_page + 1);
                    }}
                    onPreviousPage={() => {
                        fetchPosts(meta?.current_page - 1);
                    }}
                />
            )}
        </div>
    );
};

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Card>
                <CardContent>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AllPosts;
