import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  color: white;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  margin: auto;
  object-fit: cover;
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

export const Info = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 70%;
  padding: 7px;
  margin: auto;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
`;
