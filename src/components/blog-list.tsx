import { cn } from "@/lib/utils"
import { load } from "outstatic/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const revalidate = 30

type Blog = {
  title: string
  slug: string
  publishedAt: string
  description?: string
}

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
    <div className={cn("grid grid-cols-1 gap-8", className)} {...props}>
      {blogs.map((blog: Blog) => (
        <div key={blog.slug} className="space-y-3">
          <p className="flex gap-1 text-muted-foreground">
            <Calendar className="size-4" />
            <span className="text-sm">
              {new Date(blog.publishedAt).toDateString()}
            </span>
          </p>
          <h3 className="font-semibold text-xl md:text-2xl text-primary">
            <Link href={`/blogs/${blog.slug}`} className="hover:underline">
              {blog.title}
            </Link>
          </h3>
          {blog.description && (
            <p className="line-clamp-4 text-muted-foreground">
              {blog.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
