import { cn } from "@/lib/utils"
import { load } from "outstatic/server"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from "next/image"

export const revalidate = 30

type Work = {
  title: string
  slug: string
  publishedAt: string
  description?: string
  thumbnail?: string
  category?: {
    label: string
    value: string
  }[]
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
    .project([
      "title",
      "slug",
      "publishedAt",
      "description",
      "thumbnail",
      "category",
    ])

  const works = limit
    ? await query.limit(limit).toArray()
    : await query.toArray()

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
        className,
      )}
      {...props}
    >
      {works.map((work: Work) => (
        <Card key={work.slug} className="space-y-3 p-2 gap-0">
          {work.thumbnail && (
            <figure className="aspect-video overflow-hidden rounded">
              <Image
                width={300}
                height={170}
                className="w-full"
                src={work.thumbnail}
                alt={work.title}
              />
            </figure>
          )}
          <h3 className="font-semibold text-xl text-primary">
            <Link href={`/works/${work.slug}`} className="hover:underline">
              {work.title}
            </Link>
          </h3>
          <div className="flex flex-wrap mb-2">
            {work.category?.map((cat) => (
              <Badge variant={"primary"} key={cat.label}>
                {cat.label}
              </Badge>
            ))}
          </div>
          {work.description && (
            <p className="line-clamp-4 text-muted-foreground">
              {work.description}
            </p>
          )}
          <p className="flex gap-1">
            <Calendar className="size-4" />
            <span className="text-sm">
              {new Date(work.publishedAt).toDateString()}
            </span>
          </p>
        </Card>
      ))}
    </div>
  )
}
