import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, Link } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { IBlogPost } from '../types/models/BlogPost';
import { getPosts } from '../services/BlogPostService';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

type LoaderData = {
    posts: IBlogPost[];
};

export const loader: LoaderFunction = async () => {
    const posts: IBlogPost[] = await getPosts();

    return {
        posts
    };
};

export default function Articles() {
    const { posts } = useLoaderData<LoaderData>();

    return (
        <div className="flex h-screen justify-center py-8">
            <div className="w-1/2">
                <div className="mb-5">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Posts
                    </h1>
                </div>
                <div className="mb-5 mt-8">
                    <Link to="/articles/create" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					    New Post
				    </Link>
                </div>
                {posts.map((post: IBlogPost) => {
                    return <Link to={post.id}>
                        <div className="w-full rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                <p className="text-gray-700 text-base">
                                    {post.body}
                                </p>
                            </div>
                        </div>
                    </Link>;
                })}
            </div>
        </div>
    );
}