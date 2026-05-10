import React from "react";
import styled from "styled-components/native";

type Props = {
  bg: string;
  children: React.ReactNode;
};

const StyledView = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${(props) => props.bg};
`;

export function ScreenContainer({ bg, children }: Props) {
  return <StyledView bg={bg}>{children}</StyledView>;
}
