import { cn } from "@/lib/utils"
import { load } from "outstatic/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const revalidate = 30

type Work = {
  title: string
  slug: string
  publishedAt: string
  description?: string
}

export const WorksList = async ({
  className,
  limit,
  ...props
}: React.ComponentProps<"div"> & { limit?: number }) => {
  const db = await load()
  const query = db
    .find({
      collection: "works",
    })
    .project(["title", "slug", "publishedAt", "description"])

  const works = limit
    ? await query.limit(limit).toArray()
    : await query.toArray()

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-5", className)}
      {...props}
    >
      {works.map((work: Work) => (
        <div key={work.slug} className="space-y-3">
          <h3 className="font-semibold text-xl md:text-2xl text-primary">
            <Link href={`/works/${work.slug}`} className="hover:underline">
              {work.title}
            </Link>
          </h3>
          {work.description && <p>{work.description}</p>}
          <p className="flex gap-2">
            <Calendar className="size-5" />
            <span>{new Date(work.publishedAt).toDateString()}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
