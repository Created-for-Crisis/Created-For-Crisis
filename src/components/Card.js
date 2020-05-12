import React from "react"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import PropTypes from "prop-types"
import { Grid, Cell } from "styled-css-grid"
import cx from "classnames"
import {
  getUnhandledProps,
  getElementType,
  useKeyOnly,
  isNil,
} from "../styles/helpers"

/*
 ** Card
 */
const CardBody = styled(Cell)`
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  background-color: ${props => props.theme.colors.shades.white};
  transition: all 0.15s ease;
  will-change: background-color transform box-shadow;

  &.shadow {
    box-shadow: ${props => props.theme.shadows.card};
    &:hover,
    &:focus,
    &:active {
      box-shadow: ${props => props.theme.shadows.cardActive};
    }
  }

  &:hover,
  &:focus,
  &:active {
    transform: translateY(-1px);
    background-color: ${props => props.theme.colors.shades.muteGrey};
  }
`

const CardImage = styled.img`
  border-radius: 0.25rem;
  margin: 0 auto;
  max-width: 60px;
`

const CardHeader = styled.h3`
  margin: 0 auto 0.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.shades.textDark};
`

const CardContent = styled.div`
  margin: 0;
  flex: ${props => (props.image ? "0 0 80px" : "1")};
`

const CardMeta = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.whiteGrey};

  p {
    color: ${props => props.theme.colors.shades.textMedium};
    margin: 0;
  }
`

export const Card = props => {
  const { children, image, title, source, date, shadow } = props

  const classes = cx(useKeyOnly(shadow, "shadow"), useKeyOnly(image, "image"))
  const rest = getUnhandledProps(Card, props)
  const ElementType = getElementType(Card, props)

  return !isNil(children) ? (
    <CardBody as={ElementType} {...rest} className={classes}>
      {children}
    </CardBody>
  ) : (
    <CardBody as={ElementType} {...rest} className={classes}>
      {image && (
        <CardContent image>
          <picture>
            <source type="image/webp" srcset={image.fluid.srcSetWebp} />
            <CardImage src={image.fluid.src} alt={image.title} />
          </picture>
        </CardContent>
      )}
      <CardContent>
        <CardHeader>{title}</CardHeader>
        <CardMeta>
          {date && <p>{date}</p>}
          {source && <p>{source}</p>}
        </CardMeta>
      </CardContent>
    </CardBody>
  )
}

// Attach Card Building Blocks to Card
// For use as children
Card.Image = CardImage
Card.Header = CardHeader
Card.Content = CardContent
Card.Meta = CardMeta

Card.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "thumbnail", "featured"]),
  image: PropTypes.shape({
    title: PropTypes.string,
    fluid: PropTypes.shape({
      srcSetWebp: PropTypes.string,
      src: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  source: PropTypes.string,
  date: PropTypes.string,
  shadow: PropTypes.bool,
}

Card.defaultProps = {
  as: "div",
  image: {
    title: "Unsplash Daily",
    fluid: {
      src: "https://source.unsplash.com/60x60/daily",
    },
  },
  title: "How To Make A Coronavirus Face Mask Out Of A T-Shirt",
  source: "abc11.com",
  date: "April 9th, 2020",
  shadow: true,
}

/*
 ** Card Grid
 */
export const CardGrid = styled(Grid).attrs(props => ({
  gap: props.gap || "1rem",
  rowGap: props.rowGap || "2rem",
}))``

/*
 ** News Grid
 */
export const NewsGrid = styled(CardGrid)`
  grid-template-columns: 1fr;

  ${up("lg")} {
    grid-template-columns: 1fr 1fr;
  }
`
