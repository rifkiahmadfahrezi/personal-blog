import { cn } from "@/lib/utils"
import { load } from "outstatic/server"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { Button } from "./ui/button"

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
  demoUrl?: string
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
      "demoUrl",
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
        <Card key={work.slug} className="space-y-3 p-3 gap-0">
          {work.thumbnail && (
            <figure className="aspect-square overflow-hidden rounded">
              <Image
                width={300}
                height={170}
                className="w-full"
                src={work.thumbnail}
                alt={work.title}
              />
            </figure>
          )}
          <div className="flex flex-col justify-between items-start gap-2 h-full">
            <div className="h-full space-y-3">
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
                <p className="line-clamp-3 text-muted-foreground">
                  {work.description}
                </p>
              )}
            </div>
            <div className="flex w-full gap-3">
              {work.demoUrl && (
                <Button className="flex-grow" asChild>
                  <Link href={`/works/${work.slug}`}>Demo</Link>
                </Button>
              )}
              <Button variant={"primary"} className="flex-grow" asChild>
                <Link href={`/works/${work.slug}`}>Use case</Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
