import { MouseEvent, useTransition } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Props {
    onGenerate: () => void;
}

const GeneratePostsButton = ({ onGenerate }: Props) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        startTransition(() => {
            axios.get("/api/posts/generate").then((res) => {
                onGenerate();
            });
        });
    };

    return (
        <Button onClick={handleClick} disabled={isPending}>
            Generate Posts
            {isPending && <Loader2 className="ml-2" />}
        </Button>
    );
};

export default GeneratePostsButton;
