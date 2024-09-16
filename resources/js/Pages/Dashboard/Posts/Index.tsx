import Paginator from "@/Components/paginator";
import PostsGrid from "@/Components/posts/posts-grid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Category,
    PageProps,
    PaginationLink,
    PaginationMeta,
    Post,
    User,
} from "@/types";
import { Head } from "@inertiajs/react";

interface Props extends PageProps {
    posts: {
        data: (Post & {
            category: Category | null;
            user: User | null;
        })[];
        meta: PaginationMeta;
        links: PaginationLink;
    };
}

const Index = ({ posts, auth }: Props) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="All Posts" />

            <div className="py-12">
                <div className="container">
                    <PostsGrid posts={posts.data} jsonData={posts}></PostsGrid>

                    {posts.meta && (
                        <Paginator
                            meta={posts.meta}
                            nextLink={posts.links.next}
                            previousLink={posts.links.prev}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
