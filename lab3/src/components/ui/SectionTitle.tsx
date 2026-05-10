import React from "react";
import styled from "styled-components/native";

type Props = {
  color: string;
  children: React.ReactNode;
};

const StyledText = styled.Text<{ color: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.color};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`;

export function SectionTitle({ color, children }: Props) {
  return <StyledText color={color}>{children}</StyledText>;
}
