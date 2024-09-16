import { Category, Post, User } from "@/types";
import { PropsWithChildren } from "react";
import ReactJson from "react-json-view";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

import SinglePost from "./single-post";

interface Props extends PropsWithChildren {
    posts: (Post & {
        category: Category | null;
        user: User | null;
    })[];
    jsonData?: any;
}

const PostsGrid = ({ posts, jsonData, children }: Props) => {
    return (
        <div className="space-y-4">
            {/* buttons */}
            <div className="flex gap-x-4">
                {children}

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
                                    src={jsonData}
                                    name="json-data"
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
        </div>
    );
};

export default PostsGrid;
