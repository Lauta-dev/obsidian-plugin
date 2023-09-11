import { method } from "./settings"
import { type Reddit } from "./type"

/*
const customErrors = {
  ifNotExistSubReddit: 'No se encontro el subReddit',
  ifTheURLIsBad: 'Vea si la url la puso bien'
}
*/

export const get = async ({ url }: { url: string }) => {

  const newUrl = url.replace(method.replace, '.json')

  const res = await fetch(`${newUrl}`)

  if (!res.ok) {
    return
  }

  const json = await res.json()
  const data: Reddit = json[0].data.children[0].data
  const { title, selftext, author, media, subreddit_name_prefixed, url: thumbnail, preview } = data

  const a = preview?.images[0]?.resolutions.map(data => ({
    url: data.url
  }))

  const b = a[a.length - 1]

  const previewUrl = b.url
  const getVideo = media?.reddit_video.fallback_url

  return { title, selftext, author, media, subreddit_name_prefixed, url: thumbnail, preview: previewUrl, getVideo }

}
