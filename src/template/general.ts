interface Body {
  title: string
  selftext: string
}

export const general = ({
  title,
  selftext
}: Body) => {
  return `# ${title}

  ${selftext}`
}