import "../globals.css"
import { Navbar } from "@/components/navbar"

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-svh mx-auto max-w-screen-lg px-3">{children}</main>
    </>
  )
}

export default BaseLayout
