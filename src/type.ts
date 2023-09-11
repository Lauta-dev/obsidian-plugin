export interface Reddit {
  title: string
  selftext: string
  author: string
  media: {
    oembed: {
      author_name: string
      author_url: string
      provider_name: string
      thumbnail_url: string
      title: string
    }
    type: string

    reddit_video: {
      fallback_url: string
    }

  } | null | undefined

  subreddit_name_prefixed: string
  url: string
  preview: {
    enabled: boolean
    images: [{
      id: string
      resolutions: [{
        "width": number
        "height": number,
        "url": string,
      }]
    }]
  }
}

export type GetMedia = Reddit["media"]
