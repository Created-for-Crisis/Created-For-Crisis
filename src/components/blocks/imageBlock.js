import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ContentContainer } from "../../styles/components"

const StyledImageBlock = styled.section`
  margin-top: 2rem;

  ${ContentContainer} {
    display: flex;
    align-items: center;
  }

  img {
    display: none;
    width: 100%;
    height: auto;
    ${up("md")} {
      display: block;
    }
  }

  .content {
    font-size: 1.25rem;
    ${up("md")} {
      flex: 1 0 auto;
      max-width: 540px;
      padding: 3rem 0 3rem 2rem;
      margin: 1rem 0 1rem auto;
    }
  }
`

const ImageBlock = ({
  alignment,
  content: { json },
  image: {
    file: { url: image },
  },
}) => (
  <StyledImageBlock alignment={alignment}>
    <ContentContainer>
      <img src={image} alt="ImageBlock &amp; Targets Illustration" />
      <div className="content">{documentToReactComponents(json)}</div>
    </ContentContainer>
  </StyledImageBlock>
)

ImageBlock.propTypes = {
  inverted: PropTypes.bool,
}

ImageBlock.defaultProps = {
  inverted: false,
}

export default ImageBlock
