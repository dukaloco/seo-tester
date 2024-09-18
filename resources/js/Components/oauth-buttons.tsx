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

            <a href={route("oauth.redirect", "google")}>
                <Button
                    variant="outline"
                    className="w-full bg-rose-500 text-white"
                >
                    Login with Google
                </Button>
            </a>
        </div>
    );
};

export default OauthButtons;
