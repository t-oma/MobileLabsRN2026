import React from "react";
import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";

type Props = ScrollViewProps & {
  children: React.ReactNode;
};

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export function ScreenContent({ children, ...props }: Props) {
  return (
    <StyledScrollView showsVerticalScrollIndicator={false} {...props}>
      {children}
    </StyledScrollView>
  );
}
