import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
  width: 100%;
`;

const FormHeading = styled.h2`
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
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.text};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.xxs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.$dark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280'};
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.$dark ? 'rgba(0, 0, 0, 0.2)' : props.theme.colors.white};
  backdrop-filter: ${props => props.$dark ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$dark ? 'blur(10px)' : 'none'};
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.spacing.md};
  line-height: 1.5;
  width: 100%;
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.$dark ? 'rgba(255, 255, 255, 0.85)' : '#6B7280'};
  }

  &:hover {
    border-color: ${props => props.$dark ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.primary};
    background: ${props => props.$dark ? 'rgba(0, 0, 0, 0.2)' : props.theme.colors.white};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)'};
    background: ${props => props.$dark ? 'rgba(0, 0, 0, 0.2)' : props.theme.colors.white};
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusMessage = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.medium};
  text-align: center;
  font-weight: ${props => props.theme.fonts.weights.medium};
  background-color: ${props => 
    props.$success 
      ? 'rgba(16, 185, 129, 0.2)' 
      : props.$error 
        ? 'rgba(239, 68, 68, 0.2)' 
        : 'transparent'
  };
  color: ${props => 
    props.$success 
      ? 'rgb(6, 95, 70)' 
      : props.$error 
        ? 'rgb(185, 28, 28)' 
        : props.theme.colors.text
  };
  border: 1px solid ${props => 
    props.$success 
      ? 'rgba(16, 185, 129, 0.5)' 
      : props.$error 
        ? 'rgba(239, 68, 68, 0.5)' 
        : 'transparent'
  };
  display: ${props => (props.$success || props.$error) ? 'block' : 'none'};
`;

const ContactForm = ({ dark = true, headingLevel = 'h2' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });
    
    const form = e.target;
    
    try {
      // For Netlify forms
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setStatus({
        submitting: false,
        success: true,
        error: false,
        message: `Thank you for your message! We'll be in touch soon.`
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: `Something went wrong. Please try again or contact us directly.`
      });
    }
  };

  return (
    <>
      <StyledForm 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit}
        netlify-honeypot="bot-field"
      >
        {/* This hidden input is required for Netlify forms */}
        <input type="hidden" name="form-name" value="contact" />
        {/* Hidden input to track which page the form was submitted from */}
        <input type="hidden" name="form-source" value={location.pathname} />
        {/* Honeypot field to prevent spam */}
        <p hidden>
          <label>
            Don{`'`}t fill this out if you{`'`}re human: <input name="bot-field" />
          </label>
        </p>
        
        <FormHeading as={headingLevel} $dark={dark}>Get a free quote</FormHeading>
        
        <FormGroup>
          <Label $dark={dark} htmlFor="name">Name</Label>
          <Input 
            $dark={dark} 
            type="text" 
            id="name" 
            name="name" 
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name" 
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label $dark={dark} htmlFor="email">Email</Label>
          <Input 
            $dark={dark} 
            type="email" 
            id="email" 
            name="email" 
            value={formState.email}
            onChange={handleChange}
            placeholder="Your email" 
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label $dark={dark} htmlFor="phone">Phone (optional)</Label>
          <Input 
            $dark={dark} 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formState.phone}
            onChange={handleChange}
            placeholder="Your phone number" 
          />
        </FormGroup>

        <FormGroup>
          <Label $dark={dark} htmlFor="message">Message</Label>
          <TextArea 
            $dark={dark} 
            id="message" 
            name="message" 
            value={formState.message}
            onChange={handleChange}
            placeholder="Your message" 
            rows={4} 
            required 
          />
        </FormGroup>

        <SubmitButton 
          $dark={dark} 
          type="submit" 
          disabled={status.submitting}
        >
          {status.submitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>
        
      </StyledForm>

      {/* Always-present live regions so screen readers announce the result.
          Kept outside the form so the empty regions don't add flex gap. */}
      <div role="status">
        {status.success && <StatusMessage $success>{status.message}</StatusMessage>}
      </div>
      <div role="alert">
        {status.error && <StatusMessage $error>{status.message}</StatusMessage>}
      </div>
    </>
  );
};

export default ContactForm;
