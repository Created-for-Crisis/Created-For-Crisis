import React from "react"
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs"
import { Container } from "../src/components/Container"
import { Article } from "../src/components/Article"

export default {
  title: "Container",
  component: Container,
  decorators: [withKnobs],
}

export const Dynamic = () => (
  <Container
    size={select("Size", ["full", "article", "content"], "content")}
    padded={boolean("Padded", true)}
    top={text("Padding Top", "1.25rem")}
    right={text("Padding Right", "1.25rem")}
    bottom={text("Padding Bottom", "1.25rem")}
    left={text("Padding Left", "1.25rem")}
  >
    <h1>Title</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Id diam maecenas
      ultricies mi eget mauris pharetra et ultrices. Aenean euismod elementum
      nisi quis eleifend quam adipiscing. Tristique et egestas quis ipsum
      suspendisse ultrices gravida dictum. Diam phasellus vestibulum lorem sed
      risus ultricies tristique. At volutpat diam ut venenatis tellus in metus
      vulputate eu. Tincidunt eget nullam non nisi est sit. Nulla porttitor
      massa id neque aliquam vestibulum. Nunc mi ipsum faucibus vitae aliquet
      nec ullamcorper sit amet. Ac turpis egestas maecenas pharetra convallis
      posuere morbi leo urna. Habitant morbi tristique senectus et. Nisi
      scelerisque eu ultrices vitae. Nibh praesent tristique magna sit.
    </p>
    <p>
      Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Diam
      maecenas ultricies mi eget mauris pharetra et ultrices neque. Pellentesque
      sit amet porttitor eget. Sit amet consectetur adipiscing elit ut aliquam.
      Lectus arcu bibendum at varius vel pharetra. Dui vivamus arcu felis
      bibendum ut tristique et. Dui nunc mattis enim ut tellus. Faucibus purus
      in massa tempor nec feugiat nisl pretium fusce. Urna neque viverra justo
      nec ultrices dui sapien eget mi. Sed odio morbi quis commodo odio.
      Dignissim convallis aenean et tortor at. Nisi est sit amet facilisis magna
      etiam tempor orci. Eros in cursus turpis massa tincidunt dui ut ornare
      lectus. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae.
    </p>
  </Container>
)

export const WithArticle = () => (
  <Container size="article" padded>
    <Article>
      <h1>Created for Crisis</h1>
      <h2>Our Work</h2>
      <p>
        Created For Crisis is currently working with MasksNOW and Canada Sew(s)
        to provide quality, well-researched mask designs to volunteers in order
        to get well-made masks to those who need them most.
      </p>
      <p>
        We have an assortment of other ongoing projects, and have received
        requests for a variety of designs, from nasal swabs to surgical caps.
        Per requests and available facilities, our next project is to find or
        develop alternatives to other personal protective equipment, such as
        surgical caps or protective gowns.
      </p>
      <p>
        If you want to see what we’re working on and get involved, please join
        us on Discord. We can always use assistance.
      </p>
      <p>
        Created for Crisis formed from an online community during the COVID-19
        pandemic by those with valuable skills and a drive to help, all seeking
        a way to do so. A philosophy of open innovation means our design process
        is both visible and open to the public. Rather than assume our
        stakeholders will adapt to our ideas, we invite conversation and
        collaboration, and shift our vision according to feedback.
      </p>
      <h2>Our Mission</h2>
      <h3>What we do</h3>
      <ul>
        <li>
          Engage with healthcare, science, and other professionals to identify
          critical needs.
        </li>
        <li>
          Build a coalition of experts and makers committed to serving their
          communities.
        </li>
        <li>
          Provide them with the means to do so through high-quality designs
          which use existing resources.
        </li>
        <li>
          Promote an open dialogue among makers and healthcare professionals.
        </li>
      </ul>
      <h3>How we do it</h3>
      <p>
        Open-source projects like Created for Crisis (CFC) bring together
        individuals from a diverse range of industries and backgrounds who share
        a common goal. Such collaboration is a marvel of a digital world, one in
        which governments and institutions fall behind. We benefit from the
        minds of anyone with internet access, providing a constant source of
        input, feedback, and quality control.
      </p>
    </Article>
  </Container>
)
