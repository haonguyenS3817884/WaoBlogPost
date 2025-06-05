import { PrismaClient, Prisma } from '@prisma/client'
import { IBlogPost, ICreateBlogPost, IUpdateBlogPost } from '../types/models/BlogPost'

const prisma = new PrismaClient();

export function getPosts(): Prisma.PrismaPromise<IBlogPost[]> {
  return prisma.blog_posts.findMany();
}

export function getPostById(id: string): Prisma.Prisma__blog_postsClient<IBlogPost | null> {
  return prisma.blog_posts.findUnique({
    where: { id },
  })
}

export function createPost(blogPostPayload: ICreateBlogPost): Prisma.Prisma__blog_postsClient<IBlogPost> {
  return prisma.blog_posts.create({ data: blogPostPayload })
}

export function updatePost(id: string, blogPostPayload: IUpdateBlogPost): Prisma.Prisma__blog_postsClient<IBlogPost> {
  return prisma.blog_posts.update({
    where: { id },
    data: blogPostPayload,
  })
}

export function deletePost(id: string): Prisma.Prisma__blog_postsClient<IBlogPost> {
  return prisma.blog_posts.delete({
    where: { id },
  })
}