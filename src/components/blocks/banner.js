import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ContentContainer, ActionGroup } from "../../styles/components"
import Button from "../button"
import * as FeatherIcons from "react-feather"
import DiscordLogo from "../../assets/logos/Discord-Logo-White.svg"

const StyledSplash = styled.section`
  .content {
    padding: 2rem 0;
    margin: auto;
    text-align: center;
    background-image: url(${props => props.image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;

    p {
      max-width: 620px;
      font-size: 1.5rem;
      margin: 0 auto 1rem;
    }
    /* h3,
    p {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
    }
    h1 {
      font-size: 4rem;
      margin-bottom: 0.5rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    p {
      max-width: 420px;
    } */
  }

  ${up("md")} {
    .content {
      padding: 4rem 0;
      max-width: 900px;
      /* background-repeat: no-repeat; */
      /* background-position: bottom 50% right 5%; */
      /* background-size: auto 75%; */
      /* span,
      p {
        font-size: 1.25rem;
      }
      h1 {
        font-size: 4rem;
      } */
      h1 {
        font-size: 110px;
      }
    }
  }

  ${ContentContainer} {
    ${up("md")} {
    }
  }

  ${up("xl")} {
    min-height: 500px;
    background-size: auto 75%;
  }
`

const Banner = ({
  content: { json },
  illustration: {
    file: { url: image },
  },
  actions,
}) => {
  return (
    <StyledSplash image={image}>
      <ContentContainer>
        <div className="content">
          {documentToReactComponents(json)}
          {actions && (
            <ActionGroup
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {actions.map(({ text, link, variant, icon, internal_link }) => {
                const Icon = icon
                  ? FeatherIcons[icon]
                  : variant === "discord"
                  ? DiscordLogo
                  : null

                return (
                  <Button
                    key={link}
                    variant={variant}
                    as={internal_link ? Link : "a"}
                    to={link}
                    href={link}
                    size="lg"
                    target="_blank"
                    className="action"
                  >
                    {text} <Icon />
                  </Button>
                )
              })}
            </ActionGroup>
          )}
        </div>
      </ContentContainer>
    </StyledSplash>
  )
}

Banner.propTypes = {
  image: PropTypes.string,
}

Banner.defaultProps = {
  children: (
    <>
      <h1>Banner</h1>
    </>
  ),
}

export default Banner
