/**
 * A group of Posts regarded as having particular shared characteristics.
 *
 * @param id   An identifier of the Category
 * @param name A name of the Category
 * @param slug A valid URL string composes with name and ID
 */
export default interface Category {
  id: string,
  name: string,
  slug: string
}
