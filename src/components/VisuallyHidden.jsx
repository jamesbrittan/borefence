import styled from 'styled-components';

// Hidden on screen but still read by screen readers (e.g. live announcements,
// headings that give structure without a visible title).
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default VisuallyHidden;
