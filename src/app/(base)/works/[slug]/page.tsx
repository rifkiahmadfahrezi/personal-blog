import { notFound } from "next/navigation"
import Link from "next/link"
import { InlineTOC } from "fumadocs-ui/components/inline-toc"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { Button } from "@/components/ui/button"
import { works } from "@/lib/source"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = works.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  return (
    <>
      <div className="p-3 space-y-1">
        <figure className="aspect-video rounded overflow-hidden mb-3">
          <Image
            className="w-full"
            priority
            width={750}
            height={350}
            alt={page.data.title}
            src={page.data.thumbnail}
          />
        </figure>
        <h1 className="text-xl md:text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-muted-foreground">{page.data.description}</p>
        <div className="flex items-center gap-3">
          <Avatar className="size-6">
            <AvatarImage src={page.data.author.picture} />
            <AvatarFallback>{page.data.author.name[0]}</AvatarFallback>
          </Avatar>
          <p>{page.data.author.name}</p>
        </div>
      </div>
      {page.data.toc.length !== 0 && (
        <InlineTOC className="my-3" items={page.data.toc} />
      )}
      <article className="container flex flex-col px-4 py-8">
        <div className="prose min-w-0">
          <Mdx components={defaultMdxComponents} />
        </div>
      </article>

      <Button asChild variant={"ghost"} className="w-fit">
        <Link href="/works">
          <ArrowLeft className="size-5" />
          Work list
        </Link>
      </Button>
    </>
  )
}

export function generateStaticParams(): { slug: string }[] {
  return works.getPages().map((page) => ({
    slug: page.slugs[0],
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = works.getPage([params.slug])

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `/works/${params.slug}`, // Update with your domain
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
    },
  }
}
