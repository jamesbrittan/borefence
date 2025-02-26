import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
`;

const Label = styled.label`
  ${props => props.theme.typography.label}
  color: ${props => props.dark ? props.theme.colors.white : props.theme.colors.text};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.xxs};
  text-shadow: ${props => props.dark ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xxs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.dark ? 'rgba(255, 255, 255, 0.3)' : props.theme.colors.border};
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.dark ? 'rgba(255, 255, 255, 0.15)' : props.theme.colors.white};
  backdrop-filter: ${props => props.dark ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.dark ? 'blur(10px)' : 'none'};
  color: ${props => props.dark ? props.theme.colors.white : props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.spacing.md};
  line-height: 1.5;
  width: 100%;
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:hover {
    border-color: ${props => props.dark ? 'rgba(255, 255, 255, 0.5)' : props.theme.colors.primary};
    background: ${props => props.dark ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.white};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.dark ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)'};
    background: ${props => props.dark ? 'rgba(255, 255, 255, 0.25)' : props.theme.colors.white};
  }

  &[aria-invalid="true"] {
    border-color: ${props => props.theme.colors.error};
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.dark ? 'rgba(255, 255, 255, 0.3)' : props.theme.colors.border};
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.dark ? 'rgba(255, 255, 255, 0.15)' : props.theme.colors.white};
  backdrop-filter: ${props => props.dark ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.dark ? 'blur(10px)' : 'none'};
  color: ${props => props.dark ? props.theme.colors.white : props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.spacing.md};
  line-height: 1.5;
  width: 100%;
  min-height: 120px;
  transition: all 0.2s;
  resize: vertical;

  &::placeholder {
    color: ${props => props.dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:hover {
    border-color: ${props => props.dark ? 'rgba(255, 255, 255, 0.5)' : props.theme.colors.primary};
    background: ${props => props.dark ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.white};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.dark ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)'};
    background: ${props => props.dark ? 'rgba(255, 255, 255, 0.25)' : props.theme.colors.white};
  }

  &[aria-invalid="true"] {
    border-color: ${props => props.theme.colors.error};
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.dark 
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))' 
    : props.theme.colors.primary};
  color: ${props => props.dark ? 'rgba(0, 0, 0, 0.75)' : 'white'};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.dark 
    ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.2) inset' 
    : props.theme.shadows.medium};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover {
    background: ${props => props.dark ? props.theme.colors.secondary : props.theme.colors.secondary};
    transform: translateY(-${props => props.theme.spacing.xxs});
    box-shadow: ${props => props.dark 
      ? '0 6px 12px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.08)' 
      : props.theme.shadows.large};
    
    &::before {
      transform: translateX(100%);
    }
  }

  &:focus-visible {
    outline: 3px solid ${props => props.dark ? 'rgba(255, 255, 255, 0.3)' : props.theme.colors.primary};
    outline-offset: ${props => props.theme.spacing.xxs};
    background: ${props => props.dark ? props.theme.colors.secondary : props.theme.colors.secondary};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.dark 
      ? '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)' 
      : props.theme.shadows.small};
  }

  &:disabled {
    background: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const FormTitle = styled.h2`
  ${props => props.theme.typography.h2}
  color: ${props => props.dark ? props.theme.colors.white : props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 1.75rem;
  line-height: 1.2;
  text-shadow: ${props => props.dark ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const ContactForm = ({ dark = true }) => {
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
      <FormTitle id="contact-form-title" dark={dark}>Get a free quote</FormTitle>
      
      <FormGroup>
        <Label htmlFor="name" dark={dark}>Name *</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          dark={dark}
        />
        {errors.name && (
          <ErrorMessage id="name-error" role="alert">{errors.name}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email" dark={dark}>Email Address *</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          dark={dark}
        />
        {errors.email && (
          <ErrorMessage id="email-error" role="alert">{errors.email}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone" dark={dark}>Phone Number (Optional)</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          aria-required="false"
          dark={dark}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="message" dark={dark}>Message *</Label>
        <TextArea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          dark={dark}
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
        dark={dark}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </SubmitButton>
    </StyledForm>
  );
};

export default ContactForm;
