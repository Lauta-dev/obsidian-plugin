import { general } from "./template/general"
import { tags } from "./template/tags"

interface Body {
  author: string,
  clipboard: string,
  subreddit_name_prefixed: string,
  subredditLink: string,
  title: string,
  preview: string,
  selftext: string | undefined | null
  name: any,
  getVideo: string | undefined | null
}


export const template = ({
  author,
  clipboard,
  subreddit_name_prefixed,
  subredditLink,
  title,
  preview,
  selftext,
  name,
  getVideo
}: Body) => {
  return `${tags({ author, clipboard, subreddit_name_prefixed, subredditLink })}
${general({ ...name })}
![${title}](${preview})

${selftext}
`
}