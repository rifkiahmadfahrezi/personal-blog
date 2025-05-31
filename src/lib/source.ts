import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import { blog, work } from "../../.source"

export const blogs = loader({
  baseUrl: "/blog",
  source: createMDXSource(blog),
})

export const works = loader({
  baseUrl: "/work",
  source: createMDXSource(work),
})
