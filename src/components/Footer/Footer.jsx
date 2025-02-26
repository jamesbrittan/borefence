import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  ${props => props.theme.mixins.fullWidth}
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  ${props => props.theme.typography.heading}
  font-size: 1.25rem;
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.white};
  opacity: 0.9;
  line-height: 1.6;
`;

const FooterLink = styled(Link)`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.2s;
  position: relative;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }

  &:focus {
    opacity: 1;
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const FooterBottom = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Copyright = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.white};
  opacity: 0.7;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* <FooterSection>
          <FooterTitle>About BoreFence</FooterTitle>
          <FooterText>
            Your trusted partner in garden fencing and railings. We provide high-quality, durable solutions for your outdoor spaces.
          </FooterText> */}
        {/* </FooterSection> */}
        {/* <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection> */}
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>Phone: 07712345678</FooterText>
          <FooterText>Email: info@borefence.com</FooterText>
        </FooterSection>
      </FooterContent>
      {/* <FooterBottom>
        <Copyright>
          {new Date().getFullYear()} BoreFence. All rights reserved.
        </Copyright>
      </FooterBottom> */}
    </FooterContainer>
  );
};

export default Footer;
