import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Button } from "../Button"
import Discord from "../../assets/icons/discord"
import Header from "./Header"

const HeroText = styled.h6`
  max-width: 731px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  button,
  a {
    margin-right: 32px;
  }
`

const HomeHeader = ({ color, routes }) => {
  return (
    <Header
      color={color}
      routes={routes}
      backgroundPosition={{ x: "right", y: "center" }}
    >
      <h1>Created for Crisis</h1>
      <HeroText>
        We’re here to solve problems faced by healthcare providers during the
        COVID-19 pandemic and beyond.
      </HeroText>
      <ButtonContainer>
        <Button color="white" as="a" href="mailto:info@createdforcrisis.org">
          Contact Us
        </Button>
        <Button
          color="discord"
          iconPosition="left"
          as="a"
          href="https://discord.gg/T2Xw2j7"
        >
          <Discord />
          Get Involved
        </Button>
      </ButtonContainer>
    </Header>
  )
}

HomeHeader.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
}

HomeHeader.defaultProps = {
  color: "light",
}

export default HomeHeader
