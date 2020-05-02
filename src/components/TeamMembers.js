import React from "react"
import styled from "styled-components"
import { GitHub, Linkedin, ExternalLink } from "react-feather"

const StyledArticle = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 8px;

  h3,
  p {
    margin-bottom: 0;
  }
`

const Icons = styled.aside`
  display: grid;
  grid-template-columns: repeat(3, minmax(24px, auto));
  grid-gap: 32px;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    color: ${props => props.theme.colors.shades.textDark};
  }

  a:hover {
    color: ${props => props.theme.colors.shades.textLight};
  }
`

const SocialIconLink = ({ url, name, social, Icon }) => {
  if (!url) {
    return <div />
  }
  return (
    <a
      title={`Visit ${name}'s ${social}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon title={social} />
    </a>
  )
}

const Name = styled.h3`
  color: ${props => props.theme.colors.shades.textDark};
  :hover {
    color: ${props => props.theme.colors.shades.textLight};
  }
`

const TeamMember = ({ name, title, gitHubUrl, linkedInUrl, website }) => (
  <StyledArticle>
    <div>
      <Name>{name}</Name>
      <p>{title}</p>
    </div>
    <Icons>
      <SocialIconLink
        Icon={GitHub}
        url={gitHubUrl}
        name={name}
        social="GitHub profile"
      />
      <SocialIconLink
        Icon={Linkedin}
        url={linkedInUrl}
        name={name}
        social="LinkedIn profile"
      />
      <SocialIconLink
        Icon={ExternalLink}
        url={website}
        name={name}
        social="website"
      />
    </Icons>
  </StyledArticle>
)

const StyledH2 = styled.h2`
  margin-bottom: 32px;
`

const TeamMembers = ({ members }) => (
  <section>
    <StyledH2>Team Members</StyledH2>
    {members.map((member, index) => (
      <TeamMember key={index} {...member} />
    ))}
  </section>
)

export { TeamMember, TeamMembers }
