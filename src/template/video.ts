export const video = ({ url }) => {
  return `<video controls>
	<source src=${url}/>
</video>`
}