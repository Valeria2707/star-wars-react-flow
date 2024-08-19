import styled, { keyframes } from "styled-components";
import { BASIC } from "../../constants/colors";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

export const Spinner = styled.div`
  width: 70px;
  height: 70px;
  border: 7px solid ${BASIC[20]};
  border-top: 4px solid ${BASIC[0]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
