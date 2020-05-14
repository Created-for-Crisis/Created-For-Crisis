/*
 **
 */
export const pathGenerator = (slug = "", parent) => {
  let path
  // If the page has a parent page include that in the path
  // Maximum depth of 2
  if (parent && parent.parent) {
    path = `/${parent.parent.slug}/${parent.slug}/${slug}/`
  } else if (parent) {
    path = `/${parent.slug}/${slug}/`
  } else {
    path = `/${slug}/`
  }
  return path
}
