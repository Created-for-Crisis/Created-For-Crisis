import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ArticleContainer } from "../../styles/components"
import Banner from "./banner"
import ImageBlock from "./imageBlock"
import TeamMemberGrid from "./teamMemberGrid"
import Pattern from "./pattern"

function compileBlock(block) {
  switch (block.__typename) {
    case "ContentfulBanner":
      return <Banner key={block.id} {...block} />
    case "ContentfulImageBlock":
      return <ImageBlock key={block.id} {...block} />
    case "ContentfulTeamMemberGrid":
      return <TeamMemberGrid key={block.id} {...block} />
    case "ContentfulPattern":
      return <Pattern key={block.id} {...block} />
    default:
      return (
        <section key={block.id} id={block.id} className="block">
          <p>
            {block.id} {block.__typename}
          </p>
        </section>
      )
  }
}

const PageBuilder = (blocks, content) => (
  <>
    {blocks && blocks.map(block => compileBlock(block))}
    {content && (
      <ArticleContainer>
        {documentToReactComponents(content.json)}
      </ArticleContainer>
    )}
  </>
)

export default PageBuilder
