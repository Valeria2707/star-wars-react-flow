// PaginationStyles.tsx
import styled from "styled-components";

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
  color: "black";
  background: ${(props) => (props.$isCurrent ? "#FFC107" : "white")};
  margin: 0 3px;
  &:disabled {
    cursor: default;
  }
`;

export const NavButton = styled(PageButton)`
  margin: 0 5px;
`;
