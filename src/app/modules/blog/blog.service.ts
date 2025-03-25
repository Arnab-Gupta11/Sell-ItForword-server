import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

//Create a blog into DB
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

//Get All blog from DB
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .sortOrder();
  const result = await blogQuery.modelQuery;
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

//Update a blog into DB
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  //Update blog.
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

//Delete a blog From DB
const deleteBlogFromDB = async (id: string) => {
  //Delete blog.
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
