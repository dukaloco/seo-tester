interface Props {
    laravelVersion?: string;
    phpVersion?: string;
}

const Footer = ({ laravelVersion, phpVersion }: Props) => {
    return (
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
            <span className="font-semibold">Laravel</span>

            {laravelVersion && phpVersion && (
                <div>
                    <span className="mx-1 text-gray-400">&middot;</span>
                    <span>{laravelVersion}</span>
                    <span className="mx-1 text-gray-400">&middot;</span>
                    <span className="font-semibold">PHP</span>
                    <span className="mx-1 text-gray-400">&middot;</span>
                    <span>{phpVersion}</span>
                </div>
            )}
        </footer>
    );
};

export default Footer;
