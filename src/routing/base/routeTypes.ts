export type TopicDifficulty = "beginner" | "intermediate" | "advanced"

export type PageTopic = {
  topic: string
  label: string
  difficulty?: TopicDifficulty
  /** Topic ids (category/topic) recommended before this one */
  prerequisites?: string[]
}

export type Category = {
  topic: string
  label: string
  pages: PageTopic[]
}

export type SiteSuggestion = {
  route: string
  title: string
  path: string
  topicId: string
  topicLabel: string
  categoryLabel: string
  difficulty: TopicDifficulty
  prerequisites: string[]
}
