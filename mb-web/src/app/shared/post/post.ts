/**
 * A piece of content in the blog platform
 *
 * @param id          An identifier of the Post
 * @param title       A title of the Post
 * @param slug        A valid URL string composes with title and ID
 * @param status      A status that indicates the type of the Post whether publicly or privately
 * @param markdown    An original content of the Post in markdown syntax
 * @param html        A content of the Post in HTML format translated from markdown
 * @param publishedAt An RFC3339 datetime that the Post was published
 * @param createdAt   An RFC3339 datetime that the Post was created
 * @param updatedAt   An RFC3339 datetime that the Post was updated
 */
export default interface Post {
  id: string
  title: string
  slug: string
  status: string
  markdown: string
  html: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}
