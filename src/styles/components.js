import styled from "styled-components"
import { up } from "styled-breakpoints"

const StyledHeader = styled.header.attrs(props => ({
  color: props.inverted ? props.theme.colors.white : props.theme.colors.text,
}))`
  color: ${props => props.color};
`

const StyledText = styled.p.attrs(props => ({
  color: props.inverted ? props.theme.colors.white : props.theme.colors.text,
}))`
  color: ${props => props.color};
`

const ContentContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.lg};
  padding: 0 1rem;
  width: 100%;
  margin: auto;
`

const ActionGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .action + .action {
    margin: 1rem 0 0 0;
  }

  ${up("xs")} {
    flex-direction: row;
    .action + .action {
      margin: 0 0 0 1rem;
    }
  }
`

export { StyledHeader, StyledText, ContentContainer, ActionGroup }
