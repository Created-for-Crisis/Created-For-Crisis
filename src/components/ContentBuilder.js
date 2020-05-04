import React from "react"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { TeamMember } from "./TeamMembers"

// Leaving these in as samples for now.
const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
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
      console.log({ id, fields })
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
  },
}

export const ContentBuilder = ({ content }) => {
  console.log({ content })
  return <>{content && documentToReactComponents(content.json, options)}</>
}
