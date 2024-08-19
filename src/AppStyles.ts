import styled from "styled-components";
import { BASIC } from "./constants/colors";

export const Container = styled.div`
  min-height: 100vh;
  background-image: url("/images/star-scy.jpeg");
  background-size: cover;
  background-position: center;
  color: ${BASIC[0]};
  padding: 20px;
`;

export const Logo = styled.img`
  margin: auto;
  width: 100%;
`;
