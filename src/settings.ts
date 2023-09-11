export const metadata = {
  reddit: 'https://www.reddit.com',
  youtubePrefixShade: 'https://youtu.be/',
  youtubePrefixUrl: 'https://www.youtube.com/',
  type: 'text/markdown',
  length: 100
}

export const method = {
  replace: /\/([^\/]*)$/,
  deleteHashTag: ({ text }: { text: string | undefined }) => {
    const newText = text?.startsWith('#') ? text?.slice(2) : text
    return newText
  },
  extractSubRedditLink: /^(https:\/\/www\.reddit\.com\/r\/[^/]+).*$/
}