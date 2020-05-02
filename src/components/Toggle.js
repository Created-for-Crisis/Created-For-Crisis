import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Button } from "./Button"

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  button:not(:first-child) {
    margin-left: ${props => props.spacing}px;
  }
`

const Toggle = ({ value, options, onChange, spacing }) => {
  console.log(spacing)
  return (
    <StyledDiv spacing={spacing} role="group">
      {options.map((option, index) => {
        const isSelected = value === option.value
        return (
          <Button
            shadow={false}
            minWidth={false}
            color={isSelected ? "medium" : "plain"}
            key={index}
            onClick={() => onChange(option.value)}
            role="checkbox"
            aria-checked={isSelected}
          >
            {option.text}
          </Button>
        )
      })}
    </StyledDiv>
  )
}

Toggle.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  spacing: PropTypes.number,
}

Toggle.defaultProps = {
  spacing: 20,
}

export default Toggle
