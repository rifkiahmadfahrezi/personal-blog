// source.config.ts
import { defineConfig } from "fumadocs-mdx/config";
import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import z from "zod";
var source_config_default = defineConfig({
  mdxOptions: {
    // MDX options
  }
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blogs",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    status: z.enum(["published", "draft"]),
    author: z.object({
      name: z.string(),
      picture: z.string()
    }),
    publishedAt: z.string()
  })
});
var work = defineCollections({
  type: "doc",
  dir: "content/works",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    demoUrl: z.string(),
    category: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    status: z.enum(["published", "draft"]),
    author: z.object({
      name: z.string(),
      picture: z.string()
    }),
    publishedAt: z.string()
  })
});
export {
  blog,
  source_config_default as default,
  work
};
