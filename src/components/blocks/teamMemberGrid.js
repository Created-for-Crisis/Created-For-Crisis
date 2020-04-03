import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GitHub, Linkedin, ExternalLink } from "react-feather"
import { ContentContainer, Grid } from "../../styles/components"

const StyledTeamMember = styled.div`
  margin-bottom: 2rem;
  h3 {
    font-family: ${props => props.theme.fonts.header};
    font-weight: 700;
    margin: 0;
  }
  p.role {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.mediumGrey};
    font-family: ${props => props.theme.fonts.accent};
    margin: 0.5rem 0 0;
  }

  .socials {
    display: flex;
    align-items: center;

    svg {
      height: 1rem;
      width: auto;
    }

    a {
      color: ${props => props.theme.colors.text};
      transition: all 0.15s ease;
      margin-right: 0.5rem;
      &:hover {
        color: ${props => props.theme.colors.mediumGrey};
      }
    }
  }

  .full-size {
    display: grid;

    img {
      display: none;
    }

    aside {
      order: 1;
      margin-top: 1rem;
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

    .socials {
      justify-content: center;
      a {
        margin: 0.5rem 1rem;
      }
    }
  }
`

const TeamMemberGrid = ({ title, snippet, format, members }) => (
  <ContentContainer>
    <section>
      <h2
        style={{
          margin: "4rem 0 2rem",
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        {title}
      </h2>
      {snippet && (
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "2rem",
          }}
        >
          {snippet}
        </p>
      )}
      {format === "Detailed" ? (
        members.map(member => (
          <TeamMember key={member.id} {...member} fullSize />
        ))
      ) : (
        <Grid lg={2}>
          {members.map(member => (
            <TeamMember key={member.id} {...member} />
          ))}
        </Grid>
      )}
    </section>
  </ContentContainer>
)

TeamMemberGrid.propTypes = {
  inverted: PropTypes.bool,
}

TeamMemberGrid.defaultProps = {
  inverted: false,
}

const TeamMember = ({
  name,
  role,
  fullSize,
  image,
  gitHubUrl,
  linkedInUrl,
  website,
  bio,
}) => (
  <StyledTeamMember>
    {fullSize ? (
      <div className="full-size">
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
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
              </a>
            )}
          </div>
        </aside>
        <div className="content">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <div className="bio">
            {bio && documentToReactComponents(bio.json)}
          </div>
        </div>
      </div>
    ) : (
      <div className="contributor">
        <h3>{name}</h3>
        <p className="role">{role}</p>
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
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
            </a>
          )}
        </div>
      </div>
    )}
  </StyledTeamMember>
)

TeamMember.propTypes = {
  fullSize: PropTypes.bool,
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

export default TeamMemberGrid
