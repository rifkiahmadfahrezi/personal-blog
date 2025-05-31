import Link from "next/link"
import { Button } from "./ui/button"
import { Logo } from "./logo"

import { cn } from "@/lib/utils"

const navMenus = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Works",
    href: "/works",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
]

export const Navbar = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn("w-full bg-background sticky top-0 p-3", className)}
      {...props}
    >
      <nav className="max-w-screen-lg mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Logo className="size-12" />
        </Link>

        <div className="flex items-center gap-4">
          {navMenus.map((menu) => (
            <Button key={menu.href} asChild variant={"ghost"}>
              <Link href={menu.href}>{menu.label}</Link>
            </Button>
          ))}
        </div>
      </nav>
    </header>
  )
}
