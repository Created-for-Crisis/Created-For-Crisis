import React from "react"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { GitHub, Linkedin, ExternalLink } from "react-feather"

const StyledTeamMember = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 1.5rem 0;

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .info {
    width: 100%;
  }

  h3,
  p.title {
    margin-bottom: 0;
  }

  p.title {
    color: ${props => props.theme.colors.shades.textMedium};
  }

  h3 {
    flex: 1 0 auto;
    will-change: color;
    transition: color 0.15s ease;
    color: ${props => props.theme.colors.shades.textDark};
  }

  &:hover h3 {
    color: ${props => props.theme.colors.shades.textLight};
  }
`

const MemberImage = styled.div`
  flex: 1 0 110px;
  margin-right: 1.25rem;
  border-radius: 0.25rem;
  width: 110px;
  height: 110px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: none;

  ${up("sm")} {
    display: block;
  }
`

const Bio = styled.div`
  margin: 0.5rem auto 0;
`

const Icons = styled.div`
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

const TeamMember = ({
  name,
  title,
  biography,
  image,
  gitHubUrl,
  linkedInUrl,
  website,
}) => (
  <StyledTeamMember>
    {image && <MemberImage image={image.fields.file["en-US"].url} />}
    <div className="info">
      <header>
        <h3>{name}</h3>
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
      </header>
      <p className="title">{title}</p>
      {biography && <Bio>{biography}</Bio>}
    </div>
  </StyledTeamMember>
)
export { TeamMember }
