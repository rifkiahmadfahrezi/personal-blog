import { cn } from "@/lib/utils"
import { load } from "outstatic/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const revalidate = 30

export const BlogList = async ({
  className,
  limit,
  ...props
}: React.ComponentProps<"div"> & { limit?: number }) => {
  const db = await load()
  const query = db
    .find({
      collection: "blogs",
    })
    .project(["title", "slug", "publishedAt", "description"])

  const blogs = limit
    ? await query.limit(limit).toArray()
    : await query.toArray()

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-5", className)}
      {...props}
    >
      {blogs.map(
        (blog: { title: string; slug: string; publishedAt: string }) => (
          <div key={blog.slug}>
            <h3 className="font-semibold text-xl md:text-2xl text-primary">
              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h3>
            <p className="flex gap-2 p-2">
              <Calendar className="size-5" />
              <span>{new Date(blog.publishedAt).toDateString()}</span>
            </p>
          </div>
        ),
      )}
    </div>
  )
}
