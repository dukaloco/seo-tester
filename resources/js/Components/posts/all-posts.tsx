import { Category, PaginationMeta, Post, User } from "@/types";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import Paginator from "../paginator";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import GeneratePostsButton from "./generate-posts-button";
import PostsGrid from "./posts-grid";

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
            <PostsGrid posts={posts} jsonData={{ posts, meta }}>
                <GeneratePostsButton
                    onGenerate={() => {
                        fetchPosts();
                    }}
                />
            </PostsGrid>

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
