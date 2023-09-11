interface Tags {
  author: string,
  subreddit_name_prefixed: string,
  clipboard: string,
  subredditLink: string
}

export const tags = ({
  author,
  subreddit_name_prefixed,
  clipboard,
  subredditLink
}: Tags) => {
  return `---
tag: reddit
author: ${author}
subreddit: ${subreddit_name_prefixed}
post_link: ${clipboard}
subreddit_link: ${subredditLink}
---`
}