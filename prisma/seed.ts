import { posts } from './posts';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    for (let post of posts) {
        await prisma.blog_posts.create({
            data: post,
        });
    }
}
main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });