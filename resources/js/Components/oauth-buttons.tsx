import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

interface Props {}

const OauthButtons = ({}: Props) => {
    return (
        <div className="flex flex-col space-y-2">
            <a href={route("oauth.redirect", "github")}>
                <Button className="w-full bg-black text-white">
                    Login with Github
                </Button>
            </a>

            <Button variant="outline" className="w-full" disabled={true}>
                Login with Google
            </Button>
        </div>
    );
};

export default OauthButtons;
