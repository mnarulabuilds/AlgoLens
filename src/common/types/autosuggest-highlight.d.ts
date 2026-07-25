declare module "autosuggest-highlight/match" {
  export default function match(
    text: string,
    query: string
  ): Array<[number, number]>
}

declare module "autosuggest-highlight/parse" {
  export default function parse(
    text: string,
    matches: Array<[number, number]>
  ): Array<{ text: string; highlight: boolean }>
}
