import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
  width: 100%;
`;

const FormHeading = styled.h3`
  ${props => props.theme.typography.heading}
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
`;

const Label = styled.label`
  ${props => props.theme.typography.label}
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.text};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.xxs};
  text-shadow: ${props => props.$dark ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.$dark ? 'rgba(255, 255, 255, 0.3)' : props.theme.colors.border};
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.$dark ? 'rgba(255, 255, 255, 0.15)' : props.theme.colors.white};
  backdrop-filter: ${props => props.$dark ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$dark ? 'blur(10px)' : 'none'};
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.spacing.md};
  line-height: 1.5;
  width: 100%;
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.$dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:hover {
    border-color: ${props => props.$dark ? 'rgba(255, 255, 255, 0.5)' : props.theme.colors.primary};
    background: ${props => props.$dark ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.white};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$dark ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)'};
    background: ${props => props.$dark ? 'rgba(255, 255, 255, 0.25)' : props.theme.colors.white};
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 120px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.$dark 
    ? props.theme.colors.white
    : props.theme.colors.primary};
  color: ${props => props.$dark 
    ? props.theme.colors.primary
    : props.theme.colors.white};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$dark 
      ? props.theme.colors.white
      : props.theme.colors.primaryDark};
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:focus-visible {
    outline: 3px solid ${props => props.$dark 
      ? props.theme.colors.white 
      : props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ContactForm = ({ dark = true }) => {
  return (
    <StyledForm>
      <FormHeading $dark={dark}>Get a free quote</FormHeading>
      <FormGroup>
        <Label $dark={dark} htmlFor="name">Name</Label>
        <Input $dark={dark} type="text" id="name" placeholder="Your name" />
      </FormGroup>

      <FormGroup>
        <Label $dark={dark} htmlFor="email">Email</Label>
        <Input $dark={dark} type="email" id="email" placeholder="Your email" />
      </FormGroup>

      <FormGroup>
        <Label $dark={dark} htmlFor="phone">Phone</Label>
        <Input $dark={dark} type="tel" id="phone" placeholder="Your phone number" />
      </FormGroup>

      <FormGroup>
        <Label $dark={dark} htmlFor="message">Message</Label>
        <TextArea $dark={dark} id="message" placeholder="Your message" rows={4} />
      </FormGroup>

      <SubmitButton $dark={dark} type="submit">
        Send Message
      </SubmitButton>
    </StyledForm>
  );
};

ContactForm.propTypes = {
  dark: PropTypes.bool
};

export default ContactForm;
