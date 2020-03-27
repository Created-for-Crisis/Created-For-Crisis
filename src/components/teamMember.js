import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GitHub, Linkedin } from "react-feather"
import { up } from "styled-breakpoints"

const StyledTeamMember = styled.div`
  margin-bottom: 2rem;
  h3 {
    font-family: ${props => props.theme.fonts.header};
    font-weight: 700;
    margin-bottom: 0;
  }
  p.role {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.mediumGrey};
    font-family: ${props => props.theme.fonts.accent};
    margin: 0.5rem 0 0;
  }

  p.bio {
    margin: 0.5rem 0 0;
  }

  .leadership {
    display: grid;

    img {
      display: none;
    }

    aside {
      order: 1;
      margin-top: 1rem;
    }

    .socials {
      display: flex;
      align-items: center;

      a {
        color: ${props => props.theme.colors.text};
        transition: all 0.15s ease;
        margin-right: 0.5rem;
        &:hover {
          color: ${props => props.theme.colors.mediumGrey};
        }
      }
    }

    ${up("sm")} {
      grid-template-columns: calc(120px + 2rem) 1fr;

      .content,
      aside {
        padding: 1rem;
      }

      aside {
        order: 0;
        margin-top: 0;
      }

      img {
        display: block;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
      }

      .socials {
        justify-content: space-around;
        a {
          margin: 0.5rem;
        }
      }
    }
  }

  .contributor {
    text-align: center;
    padding: 1rem;
  }
`

const TeamMember = ({
  name,
  role,
  leadership,
  image,
  gitHubUrl,
  linkedInUrl,
  biography,
}) => (
  <StyledTeamMember>
    {leadership ? (
      <div className="leadership">
        <aside>
          {image && <img src={image.fluid.src} alt={image.description} />}
          <div className="socials">
            {gitHubUrl && (
              <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                <GitHub />
              </a>
            )}
            {linkedInUrl && (
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </a>
            )}
          </div>
        </aside>
        <div className="content">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          {biography && <p className="bio">{biography.internal.content}</p>}
        </div>
      </div>
    ) : (
      <div className="contributor">
        <h3>{name}</h3>
        <p className="role">{role}</p>
      </div>
    )}
  </StyledTeamMember>
)

TeamMember.propTypes = {
  leadership: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.shape({
    fluid: PropTypes.shape({
      src: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
  biography: PropTypes.shape({
    internal: PropTypes.shape({
      content: PropTypes.string,
    }),
  }),
  gitHubUrl: PropTypes.string,
  linkedInUrl: PropTypes.string,
}

TeamMember.defaultProps = {
  leadership: false,
  name: "Ryan McKenna",
  role: "UI/UX Design",
}

export default TeamMember