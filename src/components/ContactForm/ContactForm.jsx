import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.default};
  width: 100%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
`;

const Label = styled.label`
  ${props => props.theme.typography.label}
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.xxs};
`;

const ErrorMessage = styled.span`
  color: #FF9494;
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xxs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: ${props => props.theme.radius.small};
  background: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.colors.white};
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  transition: all 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }

  /* Only show red border when field has been touched and is invalid */
  &[aria-invalid="true"] {
    border-color: #FF9494;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: ${props => props.theme.spacing.huge};
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.radius.small};
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-${props => props.theme.spacing.xxs});
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.white};
    outline-offset: ${props => props.theme.spacing.xxs};
    background: ${props => props.theme.colors.secondary};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
    transform: none;
  }
`;

const FormTitle = styled.h2`
  ${props => props.theme.typography.h2}
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 1.75rem;
  line-height: 1.2;
`;

const ContactForm = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Handle form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Reset form on success
        setFormState({ name: '', email: '', phone: '', message: '' });
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <StyledForm 
      onSubmit={handleSubmit}
      role="form" 
      aria-labelledby="contact-form-title"
      noValidate
    >
      <FormTitle id="contact-form-title">Contact Us</FormTitle>
      
      <FormGroup>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <ErrorMessage id="name-error" role="alert">{errors.name}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <ErrorMessage id="email-error" role="alert">{errors.email}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          aria-required="false"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="message">Message *</Label>
        <TextArea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Enter your message"
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <ErrorMessage id="message-error" role="alert">{errors.message}</ErrorMessage>
        )}
      </FormGroup>

      {errors.submit && (
        <ErrorMessage role="alert">{errors.submit}</ErrorMessage>
      )}

      <SubmitButton 
        type="submit" 
        disabled={isSubmitting}
        aria-label="Submit contact form"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </SubmitButton>
    </StyledForm>
  );
};

export default ContactForm;
