import App from "base/App"
import { pages, siteSuggestions } from "routing/base/routes"

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["profile"] },
    ...pages.map((category) => ({ slug: [category.topic] })),
    ...siteSuggestions.map((site) => ({
      slug: site.route.slice(1).split("/"),
    })),
  ]
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug = [] } = await params
  const pathname = slug.length ? `/${slug.join("/")}` : "/"
  return <App pathname={pathname} />
}
