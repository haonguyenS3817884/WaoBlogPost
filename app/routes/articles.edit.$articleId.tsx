import type { MetaFunction, ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { IUpdateBlogPost, IBlogPost } from '../types/models/BlogPost';
import { updatePost, getPostById } from '../services/BlogPostService';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

type LoaderData = {
    post: IBlogPost
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    if (request.method === "PUT") {
        const form = await request.formData();
        const id = form.get('id') ?? '';
        const title = form.get('title') ?? '';
        const body = form.get('body') ?? '';
        const payload: IUpdateBlogPost = {
            title: String(title),
            body: String(body),
        };

        const post = await updatePost(String(id), payload);

        return redirect(`/articles/${id}`);
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

export default function Edit() {
    const { post } = useLoaderData<LoaderData>()

    return (
        <div className="flex h-screen items-center justify-center">
            <Form method="put" className="w-1/2">
                <div className="mb-5 text-center">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Edit Post
                    </h1>
                </div>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="title" defaultValue={post.title} placeholder="title" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
                    <textarea rows={20} id="body" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="body" defaultValue={post.body} placeholder="body" required />
                </div>
                <input type="hidden" id="id" name="id" value={post.id} />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
            </Form>
        </div>
    );
}