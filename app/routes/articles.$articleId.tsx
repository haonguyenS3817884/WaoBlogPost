import type { MetaFunction, LoaderFunction, LoaderFunctionArgs, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData, Link } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { IBlogPost } from '../types/models/BlogPost';
import { getPostById, deletePost } from '../services/BlogPostService';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

type LoaderData = {
    post: IBlogPost;
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method === "DELETE") {
        const form = await request.formData();
        const id = form.get('id') ?? '';

        const post = await deletePost(String(id));

        return redirect("/articles");
    }

    return redirect("/");
};

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const { articleId } = params;
    
    const post: IBlogPost | null = await getPostById(articleId ?? '');

    if (!post) {
        return redirect("/");
    }
    
    return {
        post
    };
};

export default function Article() {
    const { post } = useLoaderData<LoaderData>();
    
    return (
        <div className="flex h-screen justify-center py-8">
            <div className="w-1/2">
                <div className="mb-5 text-center">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Post Detail
                    </h1>
                </div>
                <div className="mb-5">
                    <div className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Title</div>
                    <div className="text-gray-900 text-sm">{post.title}</div>
                </div>
                <div className="mb-5">
                    <div className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Body</div>
                    <div className="text-gray-900 text-sm">{post.body}</div>
                </div>
                <div className="mb-5 text-right">
                    <Form method="delete">
                        <input type="hidden" id="id" name="id" value={post.id} />
                        <Link to={`/articles/edit/${post.id}`} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					        Update
				        </Link>
                        <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}