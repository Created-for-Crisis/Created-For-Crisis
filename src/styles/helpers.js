import _ from "lodash"
import { Children } from "react"

/**
 * PropStyles Mapping
 *
 * @param {String} propName The hex color code (with or without # prefix).
 * @param {Function} mapFunc
 */
const PropStyles = (propName, mapFunc) => props => {
  const theme = props.theme
  const map = mapFunc(theme)
  const prop = props[propName]

  return map[prop]
}

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @param {function} [getDefault] A function that returns a default element type.
 * @returns {string|function} A ReactElement type
 */
function getElementType(Component, props, getDefault) {
  const { defaultProps = {} } = Component

  // ----------------------------------------
  // user defined "as" element type

  if (props.as && props.as !== defaultProps.as) return props.as

  // ----------------------------------------
  // computed default element type

  if (getDefault) {
    const computedDefault = getDefault()
    if (computedDefault) return computedDefault
  }

  // ----------------------------------------
  // infer anchor links

  if (props.href) return "a"

  // ----------------------------------------
  // use defaultProp or 'div'

  return defaultProps.as || "div"
}

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
const getUnhandledProps = (Component, props) => {
  // Note that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = Component

  return Object.keys(props).reduce((acc, prop) => {
    if (prop === "childKey") return acc
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]
    return acc
  }, {})
}

/**
 * Props where only the prop key is used in the className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label tag />
 * <div class="ui tag label"></div>
 */
const useKeyOnly = (val, key) => val && key

/**
 * Props that require both a key and value to create a className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label corner='left' />
 * <div class="ui left corner label"></div>
 */
const useValueAndKey = (val, key) => val && val !== true && `${val} ${key}`

/**
 * Determine if child by type exists in children.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {Boolean}
 */
const someByType = (children, type) =>
  _.some(Children.toArray(children), { type })

/**
 * Find child by type.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {undefined|Object}
 */
const findByType = (children, type) =>
  _.find(Children.toArray(children), { type })

/**
 * Tests if children are nil in React and Preact.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */
const isNil = children =>
  children === null ||
  children === undefined ||
  (Array.isArray(children) && children.length === 0)

export {
  PropStyles,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
  useValueAndKey,
  someByType,
  findByType,
  isNil,
}
