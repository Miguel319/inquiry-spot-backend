import { CreateBlogHandler } from "./create-blog-command.handler";
import { UpdateBlogHandler } from "./update-blog-command.handler";
import { DeleteBlogCommandHandler } from "./delete-blog.command.handler";

export { CreateBlogHandler } from "./create-blog-command.handler";
export { UpdateBlogHandler } from "./update-blog-command.handler";
export { DeleteBlogCommandHandler } from "./delete-blog.command.handler";

export const BlogsCommandHandlers = [
  CreateBlogHandler,
  UpdateBlogHandler,
  DeleteBlogCommandHandler,
];
