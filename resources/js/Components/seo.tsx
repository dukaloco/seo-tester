import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";

interface Props {
    title?: string;
    description?: string;
    image?: string;
}

const Seo = ({ title, description, image }: Props) => {
    const pageProps = usePage().props;
    const site = pageProps.site as PageProps["site"];
    const pageTitle = pageProps.title as string | undefined;
    const pageDescription = pageProps.description as string | undefined;
    const pageImage = pageProps.image as string | undefined;

    return (
        <Head title={title ?? pageTitle ?? site.name}>
            <meta
                name="description"
                content={description ?? pageDescription ?? site.description}
            />
            <meta name="image" content={image ?? pageImage ?? site.image} />
            <meta name="keywords" content={site.slogan} />
        </Head>
    );
};

export default Seo;
