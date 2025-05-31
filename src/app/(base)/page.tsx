import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDocuments } from "outstatic/server"
import { BlogList } from "@/components/blog-list"
import { WorksList } from "@/components/works-list"
import Image from "next/image"

const Home = async () => {
  const hero: {
    title: string
    content: string
    avatar?: string
  } = await getHero()

  return (
    <div className="space-y-20 my-20">
      <section id="hero" className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">{hero.title}</h2>
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: hero.content }}
          />
        </div>

        {hero.avatar && (
          <figure className="aspect-video overflow-hidden rounded">
            <Image
              width={500}
              height={300}
              className="w-full"
              priority
              src={hero.avatar}
              alt=""
            />
          </figure>
        )}
      </section>
      <section id="works">
        <h2 className="italic w-fit text-2xl md:text-3xl font-semibold">
          <Link
            href={"/works"}
            className="flex gap-5 items-center group hover:underline"
          >
            Works{" "}
            <span className="group-hover:translate-x-3 transition duration-150 ease-out">
              <ArrowRight />
            </span>
          </Link>
        </h2>
        <WorksList limit={4} className="my-10" />
      </section>
      <section id="blogs">
        <h2 className="italic w-fit text-2xl md:text-3xl font-semibold">
          <Link
            href={"/blogs"}
            className="flex gap-5 items-center group hover:underline"
          >
            Latest blogs{" "}
            <span className="group-hover:translate-x-3 transition duration-150 ease-out">
              <ArrowRight />
            </span>
          </Link>
        </h2>
        <BlogList limit={4} className="my-10" />
      </section>
    </div>
  )
}

const getHero = async () => {
  const hero = getDocuments("hero", ["title", "content", "avatar"])
  return hero[0]
}

export default Home
