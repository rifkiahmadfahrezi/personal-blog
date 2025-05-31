import { BlogList } from "@/components/blog-list"

const BlogsPage = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl my-3 font-bold">Latest blogs</h2>
      <BlogList />
    </div>
  )
}

export default BlogsPage
