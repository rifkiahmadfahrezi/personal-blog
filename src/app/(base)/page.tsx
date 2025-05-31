import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

import { BlogList } from "@/components/blog-list"
import { WorksList } from "@/components/works-list"

const Home = () => {
  return (
    <div>
      <section id="works">
        <h2 className="text-2xl md:text-3xl font-semibold flex gap-5 items-center group">
          Works{" "}
          <span className="group-hover:translate-x-3 transition duration-150 ease-out">
            <ArrowRight />
          </span>
        </h2>
        <WorksList limit={4} className="my-10" />
      </section>
      <section id="blogs">
        <h2 className="text-2xl md:text-3xl font-semibold flex gap-5 items-center group">
          Latest blogs{" "}
          <span className="group-hover:translate-x-3 transition duration-150 ease-out">
            <ArrowRight />
          </span>
        </h2>
        <BlogList limit={4} className="my-10" />
      </section>
    </div>
  )
}

export default Home
