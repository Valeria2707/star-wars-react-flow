// PaginationStyles.tsx
import styled from "styled-components";
import { BASIC, ORANGE } from "../../constants/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const PageButton = styled.button<{ $isCurrent?: boolean }>`
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: ${(props) => (props.$isCurrent ? 600 : 400)};
  border-radius: 10px;
  color: ${BASIC[100]};
  background: ${(props) => (props.$isCurrent ? ORANGE[80] : BASIC[0])};
  margin: 0 3px;
  &:disabled {
    cursor: default;
  }
`;

export const NavButton = styled(PageButton)`
  margin: 0 5px;
`;
