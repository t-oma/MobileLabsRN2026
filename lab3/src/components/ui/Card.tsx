import React from "react";
import styled from "styled-components/native";

type Props = {
  bg: string;
  border: string;
  children: React.ReactNode;
  padding?: number;
  marginBottom?: number;
};

const StyledView = styled.View<{
  bg: string;
  border: string;
  padding: number;
  marginBottom: number;
}>`
  background-color: ${(props) => props.bg};
  border-radius: 20px;
  padding: ${(props) => props.padding}px;
  margin-bottom: ${(props) => props.marginBottom}px;
  border: 1px solid ${(props) => props.border};
`;

export function Card({
  bg,
  border,
  children,
  padding = 20,
  marginBottom = 20,
}: Props) {
  return (
    <StyledView
      bg={bg}
      border={border}
      padding={padding}
      marginBottom={marginBottom}
    >
      {children}
    </StyledView>
  );
}
