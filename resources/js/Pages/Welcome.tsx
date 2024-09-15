import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import AllPosts from "@/Components/posts/all-posts";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <Navbar />

                        <main className="mt-6">
                            <AllPosts />
                        </main>

                        <Footer
                            laravelVersion={laravelVersion}
                            phpVersion={phpVersion}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
