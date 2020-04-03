import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ContentContainer, ActionGroup } from "../../styles/components"
import Button from "../button"
import * as FeatherIcons from "react-feather"
import DiscordLogo from "../../assets/logos/Discord-Logo-White.svg"

const Pattern = ({ name, description: { json }, actions }) => {
  return (
    <ContentContainer style={{ margin: "0 auto 4rem" }}>
      <div className="content" style={{ maxWidth: "720px" }}>
        <h3>{name}</h3>
        {documentToReactComponents(json)}
        {actions && (
          <ActionGroup>
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
  )
}

Pattern.propTypes = {
  name: PropTypes.string,
}

Pattern.defaultProps = {
  children: (
    <>
      <h1>Pattern</h1>
    </>
  ),
}

export default Pattern
