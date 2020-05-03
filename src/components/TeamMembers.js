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

  h3 {
    color: ${props => props.theme.colors.shades.textDark};
  }

  :hover h3 {
    color: ${props => props.theme.colors.shades.textLight};
  }
`

const Icons = styled.aside`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  a {
    margin-left: 32px;
    display: flex;
    color: ${props => props.theme.colors.shades.textDark};
    opacity: 1;
    transition: opacity 0.15s ease;
  }

  a:hover {
    opacity: 0.8;
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

const TeamMember = ({ name, title, gitHubUrl, linkedInUrl, website }) => (
  <StyledArticle>
    <div>
      <h3>{name}</h3>
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
