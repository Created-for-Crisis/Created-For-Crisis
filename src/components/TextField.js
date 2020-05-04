import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  label {
    margin-bottom: 8px;
    color: ${props => props.theme.colors.shades.textDark};
    font-size: 1.25rem;
    font-family: "Open Sans" sans-serif;
    font-weight: 600;
    text-transform: uppercase;
  }

  input:focus + label {
    color: ${props => props.theme.colors.shades.textLight};
  }

  small {
    margin-top: 8px;
  }
`

const StyledInput = styled.input`
  box-shadow: 0px 1px 3px #e6ebf1;
  border-radius: 4px;
  border: none;
  padding: 6px;
  font-size: 17px;
`

const TextField = ({
  id,
  label,
  placeholder,
  helperText,
  value,
  name,
  onChange,
  inputProps,
  inputLabelProps,
}) => {
  /* these elements are in reverse order with column-reverse
  so we can focus on the label when we focus the input*/
  return (
    <StyledDiv>
      {helperText && <small>{helperText}</small>}
      <StyledInput
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={id} {...inputLabelProps}>
        {label}
      </label>
    </StyledDiv>
  )
}

TextField.props = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  inputLabelProps: PropTypes.object,
}

TextField.defaultProps = {
  value: "",
  name: "",
  placeholder: "",
  helperText: null,
  inputProps: {},
  inputLabelProps: {},
}

export default TextField
