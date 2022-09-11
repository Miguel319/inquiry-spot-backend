import { CreateBlogHandler } from "./create-blog.handler";
import { UpdateBlogHandler } from "./update-blog.handler";

export { CreateBlogHandler } from "./create-blog.handler";

export const BlogsCommandHandlers = [CreateBlogHandler, UpdateBlogHandler];
