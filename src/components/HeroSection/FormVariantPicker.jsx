import { useState } from 'react';
import styled from 'styled-components';
import { FORM_VARIANTS } from './formVariants';

// Review-only (issue #12): lets the site owner flip between quote-form styles
// on the deploy preview. Delete along with formVariants.js once one is chosen.

const Panel = styled.aside`
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 2000;
  max-width: 300px;
  padding: 12px;
  background: #FFFFFF;
  color: #1A1A1A;
  border: 2px dashed #B54141;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  font-size: 0.85rem;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const PanelTitle = styled.p`
  font-weight: 700;
  margin: 0;
`;

const Toggle = styled.button`
  padding: 2px 8px;
  border: 1px solid #4D4D4D;
  border-radius: 4px;
  background: #FFFFFF;
  color: #1A1A1A;
  font-size: 0.75rem;
  cursor: pointer;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
`;

const Option = styled.button`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #1B3B5F;
  background: ${props => (props['aria-pressed'] ? '#1B3B5F' : '#FFFFFF')};
  color: ${props => (props['aria-pressed'] ? '#FFFFFF' : '#1B3B5F')};
  font-size: 0.8rem;
  cursor: pointer;
`;

const Description = styled.p`
  margin: 0;
  color: #4D4D4D;
`;

const FormVariantPicker = ({ variant, onSelect }) => {
  const [open, setOpen] = useState(true);

  return (
    <Panel aria-label="Quote form style preview" data-review-only>
      <PanelHeader>
        <PanelTitle>Preview only: quote form style</PanelTitle>
        <Toggle type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'Hide' : 'Show'}
        </Toggle>
      </PanelHeader>
      {open && (
        <>
          <Options>
            {Object.entries(FORM_VARIANTS).map(([key, option]) => (
              <Option
                key={key}
                type="button"
                aria-pressed={variant === key}
                onClick={() => onSelect(key)}
              >
                {option.label}
              </Option>
            ))}
          </Options>
          <Description>{FORM_VARIANTS[variant].description}</Description>
        </>
      )}
    </Panel>
  );
};

export default FormVariantPicker;
