import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"
import { Download, ExternalLink } from "react-feather"
import { TeamMember } from "./TeamMembers"
import { Button } from "./Button"

const StyledContent = styled.div`
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.5;
  }

  /* Remove the Margin from the Last Child */
  *:last-child {
    margin-bottom: 0;
  }
`

const options = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  // },
  renderNode: {
    // Blocks
    [BLOCKS.EMBEDDED_ENTRY]: ({
      data: {
        target: {
          sys: {
            contentType: {
              sys: { id },
            },
          },
          fields,
        },
      },
    }) => {
      // console.log({ id, fields })
      switch (id) {
        case "teamMember":
          return (
            <TeamMember
              name={fields.name["en-US"]}
              title={fields.role["en-US"]}
              linkedInUrl={fields.linkedInUrl["en-US"]}
              gitHubUrl={fields.gitHubUrl["en-US"]}
              website={fields.website["en-US"]}
            />
          )
        default:
          break
      }
    },
    // Inlines
    [INLINES.EMBEDDED_ENTRY]: ({
      data: {
        target: {
          sys: {
            contentType: {
              sys: { id },
            },
          },
          fields,
        },
      },
    }) => {
      // console.log({ id, fields })
      switch (id) {
        case "button":
          let Icon
          switch (fields.icon["en-US"]) {
            case "ExternalLink":
              Icon = ExternalLink
              break
            case "Download":
              Icon = Download
              break
            default:
              break
          }
          return (
            <Button
              style={{ marginRight: "1rem" }}
              color={fields.color["en-US"]}
              iconPosition={fields.iconPosition["en-US"]}
              as={fields.external["en-US"] ? OutboundLink : Link}
              target={fields.external["en-US"] ? "_blank" : "Link"}
              to={fields.url["en-US"]}
              href={fields.url["en-US"]}
            >
              {Icon && fields.iconPosition["en-US"] === "left" && <Icon />}
              {fields.text["en-US"]}
              {Icon && fields.iconPosition["en-US"] === "right" && <Icon />}
            </Button>
          )
        default:
          break
      }
    },
  },
}

export const ContentBuilder = ({ content }) => {
  // console.log({ content })
  return (
    <StyledContent className="content-builder">
      {content && documentToReactComponents(content.json, options)}
    </StyledContent>
  )
}
