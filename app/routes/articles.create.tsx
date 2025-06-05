import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { Form } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { ICreateBlogPost } from '../types/models/BlogPost';
import { createPost } from '../services/BlogPostService';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const title = form.get('title') ?? '';
    const body = form.get('body') ?? '';
    const payload: ICreateBlogPost = {
        title: String(title),
        body: String(body),
    };

    const post = await createPost(payload);

    return redirect("/articles");
};

export default function Create() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Form method="post" className="w-1/2">
                <div className="mb-5 text-center">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        New Post
                    </h1>
                </div>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="title" placeholder="title" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
                    <textarea rows={20} id="body" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="body" placeholder="body" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </Form>
        </div>
    );
}