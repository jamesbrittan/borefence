import styled, { css } from 'styled-components';
import { useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QUOTE_FIELDS, QUOTE_FORM_NAME, emptyValues, validate } from './fields';
import { netlifySubmit } from './submit';

// Colours for each variant, set once on the form as CSS custom properties so
// the individual pieces don't each need to know which variant they're in.
// - card:  dark text on the white quote card (Contact and Service pages)
// - glass: light text for the hero's smoked-glass panel (see ADR-0001)
const variants = {
  card: css`
    --quote-text: ${props => props.theme.colors.text};
    --quote-input-bg: ${props => props.theme.colors.white};
    --quote-input-border: #6B7280;
    --quote-input-border-hover: ${props => props.theme.colors.primary};
    --quote-input-border-focus: ${props => props.theme.colors.primary};
    --quote-focus-ring: rgba(37, 99, 235, 0.2);
    --quote-placeholder: #6B7280;
    --quote-input-blur: none;
    --quote-button-bg: ${props => props.theme.colors.primary};
    --quote-button-bg-hover: ${props => props.theme.colors.primaryDark};
    --quote-button-text: ${props => props.theme.colors.white};
    --quote-button-outline: ${props => props.theme.colors.primary};
    --quote-error-text: ${props => props.theme.colors.error};
    --quote-error-accent: ${props => props.theme.colors.error};
  `,
  glass: css`
    --quote-text: ${props => props.theme.colors.white};
    --quote-input-bg: rgba(0, 0, 0, 0.2);
    --quote-input-border: rgba(255, 255, 255, 0.6);
    --quote-input-border-hover: rgba(255, 255, 255, 0.8);
    --quote-input-border-focus: ${props => props.theme.colors.white};
    --quote-focus-ring: rgba(255, 255, 255, 0.2);
    --quote-placeholder: rgba(255, 255, 255, 0.85);
    --quote-input-blur: blur(10px);
    --quote-button-bg: ${props => props.theme.colors.white};
    --quote-button-bg-hover: ${props => props.theme.colors.white};
    --quote-button-text: ${props => props.theme.colors.primary};
    --quote-button-outline: ${props => props.theme.colors.white};
    /* White error text keeps 4.5:1 on the smoked glass; the red bar marks it as an error */
    --quote-error-text: ${props => props.theme.colors.white};
    --quote-error-accent: #FFB4A9;
  `,
};

const StyledForm = styled.form`
  ${props => variants[props.$variant]}
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
  width: 100%;
`;

const FormHeading = styled.h2`
  ${props => props.theme.typography.heading}
  color: var(--quote-text);
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.small};
`;

const Label = styled.label`
  color: var(--quote-text);
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.xxs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid var(--quote-input-border);
  border-radius: ${props => props.theme.radius.medium};
  background: var(--quote-input-bg);
  backdrop-filter: var(--quote-input-blur);
  -webkit-backdrop-filter: var(--quote-input-blur);
  color: var(--quote-text);
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.spacing.md};
  line-height: 1.5;
  width: 100%;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: var(--quote-placeholder);
  }

  &:hover {
    border-color: var(--quote-input-border-hover);
  }

  &:focus {
    outline: none;
    border-color: var(--quote-input-border-focus);
    box-shadow: 0 0 0 3px var(--quote-focus-ring);
  }

  &[aria-invalid='true'] {
    border-color: var(--quote-error-accent);
    border-width: 2px;
  }
`;

const FieldError = styled.p`
  margin: 0;
  padding-left: ${props => props.theme.spacing.xs};
  border-left: 3px solid var(--quote-error-accent);
  color: var(--quote-error-text);
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  line-height: 1.4;
`;

const Reassurance = styled.p`
  margin: 0;
  color: var(--quote-text);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 120px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  background: var(--quote-button-bg);
  color: var(--quote-button-text);
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: var(--quote-button-bg-hover);
  }

  /* A small lift as polish, only where there's a real mouse to hover with */
  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.medium};
    }
  }

  &:focus-visible {
    outline: 3px solid var(--quote-button-outline);
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
  ${props => props.$tone === 'success' ? css`
    background-color: rgba(16, 185, 129, 0.2);
    color: rgb(6, 95, 70);
    border: 1px solid rgba(16, 185, 129, 0.5);
  ` : css`
    background-color: rgba(239, 68, 68, 0.2);
    color: rgb(185, 28, 28);
    border: 1px solid rgba(239, 68, 68, 0.5);
  `}
`;

const SUCCESS_MESSAGE = `Thank you for your message! We'll be in touch soon.`;
const ERROR_MESSAGE = 'Something went wrong. Please try again or contact us directly.';

/**
 * The "Get a free quote" form, submitted to Netlify Forms.
 * - variant: 'card' (light) or 'glass' (on the hero's smoked-glass panel)
 * - headingLevel: 'h2' by default; 'h1' where the form is the page's main content
 * - submit: submit adapter (see ./submit.js); defaults to Netlify
 */
const QuoteRequest = ({ variant = 'card', headingLevel = 'h2', submit = netlifySubmit }) => {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const location = useLocation();
  const id = useId();
  const fieldRefs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has an error, re-check it as the visitor fixes it
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: validate(next)[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = QUOTE_FIELDS.find((field) => found[field.name]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid.name]?.focus();
      return;
    }
    setStatus('submitting');
    // Every named field, including the hidden form-name, form-source and honeypot
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await submit(fields);
      setValues(emptyValues());
      setStatus('success');
    } catch (error) {
      console.error('Quote request submission error:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <StyledForm
        $variant={variant}
        name={QUOTE_FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Required by Netlify Forms */}
        <input type="hidden" name="form-name" value={QUOTE_FORM_NAME} />
        {/* Which page the request came from */}
        <input type="hidden" name="form-source" value={location.pathname} />
        {/* Honeypot: bots fill this in, people never see it */}
        <p hidden>
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>

        <FormHeading as={headingLevel}>Get a free quote</FormHeading>

        {QUOTE_FIELDS.map(({ name, label, type, autoComplete, placeholder, required }) => {
          const Control = type === 'textarea' ? TextArea : Input;
          const fieldId = `${id}-${name}`;
          const error = errors[name];
          return (
            <FormGroup key={name}>
              <Label htmlFor={fieldId}>{label}</Label>
              <Control
                ref={(el) => (fieldRefs.current[name] = el)}
                id={fieldId}
                name={name}
                {...(type === 'textarea' ? { rows: 4 } : { type })}
                autoComplete={autoComplete}
                placeholder={placeholder}
                required={required}
                value={values[name]}
                onChange={handleChange}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${fieldId}-error` : undefined}
              />
              {error && <FieldError id={`${fieldId}-error`}>{error}</FieldError>}
            </FormGroup>
          );
        })}

        <SubmitButton type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Request a free quote'}
        </SubmitButton>
        <Reassurance>We&apos;ll only use your details to reply to your enquiry.</Reassurance>
      </StyledForm>

      {/* Always-present live regions so screen readers announce the result.
          Kept outside the form so the empty regions don't add flex gap. */}
      <div role="status">
        {status === 'success' && <StatusMessage $tone="success">{SUCCESS_MESSAGE}</StatusMessage>}
      </div>
      <div role="alert">
        {status === 'error' && <StatusMessage $tone="error">{ERROR_MESSAGE}</StatusMessage>}
      </div>
    </>
  );
};

export default QuoteRequest;

// Full-width band with a soft divider line along its top
const Band = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding-block: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.section};
  position: relative;
  /* When jumped to (e.g. #quote), stop below the sticky header */
  scroll-margin-top: 5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}40,
      transparent
    );
  }
`;

const Card = styled.section`
  width: calc(100% - 2 * ${props => props.theme.spacing.gutter});
  max-width: 600px;
  margin-inline: auto;
  padding: ${props => props.theme.spacing.card};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

/** The quote form in its white card, in a full-width band (Contact and Service pages). */
export const QuoteRequestSection = ({ id, className, headingLevel, submit }) => (
  <Band id={id} className={className}>
    <Card>
      <QuoteRequest variant="card" headingLevel={headingLevel} submit={submit} />
    </Card>
  </Band>
);
