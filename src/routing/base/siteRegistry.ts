import type { Category, SiteSuggestion, TopicDifficulty } from "./routeTypes"

const DEFAULT_DIFFICULTY: TopicDifficulty = "intermediate"

export function categoryRoute(categoryTopic: string, subjectTopic: string): string {
  return `/${categoryTopic}/${subjectTopic}`
}

export function categoryModulePath(
  categoryTopic: string,
  subjectTopic: string
): string {
  return `site/${categoryTopic}/components/${subjectTopic}`
}

export type TopicRef = {
  id: string
  label: string
  category: string
  route: string
}

export type SiteRegistry = {
  siteSuggestions: SiteSuggestion[]
  topicByRoute: Record<string, TopicRef>
  getTopicFromRoute: (route: string) => TopicRef | undefined
}

/** Registry pattern: single builder for all route-derived lookups. */
export function buildSiteRegistry(categories: Category[]): SiteRegistry {
  const siteSuggestions: SiteSuggestion[] = []
  const topicByRoute: Record<string, TopicRef> = {}

  categories.forEach((category) => {
    category.pages.forEach((subject) => {
      const path = categoryModulePath(category.topic, subject.topic)
      const route = categoryRoute(category.topic, subject.topic)
      const title = `${category.label} : ${subject.label}`
      const topicId = `${category.topic}/${subject.topic}`

      siteSuggestions.push({
        route,
        title,
        path,
        topicId,
        topicLabel: subject.label,
        categoryLabel: category.label,
        difficulty: subject.difficulty ?? DEFAULT_DIFFICULTY,
        prerequisites: subject.prerequisites ?? [],
      })

      topicByRoute[route] = {
        id: topicId,
        label: subject.label,
        category: category.label,
        route,
      }
    })
  })

  return {
    siteSuggestions,
    topicByRoute,
    getTopicFromRoute: (route: string) => topicByRoute[route],
  }
}
