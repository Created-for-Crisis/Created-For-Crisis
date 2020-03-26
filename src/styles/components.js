import styled from "styled-components"

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

export { StyledHeader, StyledText, ContentContainer }
