import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeVariants } from '../../styles/theme';

const SwitcherContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  background: ${props => props.theme.colors.background};
  padding: 8px;
  border-radius: 20px;
  box-shadow: 0 2px 10px ${props => props.theme.colors.shadow};
  z-index: 1000;
`;

const ThemeButton = styled.button.attrs(() => ({
  type: 'button',
  // Remove isActive from DOM props
  isActive: undefined
}))`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid ${props => props.$isActive ? props.theme.colors.accent : 'transparent'};
  background: ${props => props.$color};
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeSwitcher = ({ onThemeChange, currentTheme }) => {
  return (
    <SwitcherContainer>
      {Object.entries(themeVariants).map(([key, theme]) => (
        <ThemeButton
          key={key}
          $color={theme.colors.primary}
          $isActive={currentTheme === key}
          onClick={() => onThemeChange(key)}
          title={theme.name}
        />
      ))}
    </SwitcherContainer>
  );
};

ThemeSwitcher.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
  currentTheme: PropTypes.string.isRequired
};

export default ThemeSwitcher;
