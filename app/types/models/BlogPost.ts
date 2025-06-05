export interface ICreateBlogPost {
    title: string;
    body: string;
}

export interface IUpdateBlogPost {
    title?: string;
    body?: string;
}

export interface IBlogPost {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}