import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  completed: boolean;
};

const StyledCheckbox = styled.View<{
  completed: boolean;
  border: string;
  bg: string;
}>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border-width: 2px;
  border-color: ${(props) => (props.completed ? props.bg : props.border)};
  background-color: ${(props) => (props.completed ? props.bg : "transparent")};
  align-items: center;
  justify-content: center;
`;

export function Checkbox({ completed }: Props) {
  const { theme } = useTheme();

  return (
    <StyledCheckbox
      completed={completed}
      border={theme.colors.border}
      bg={theme.colors.success}
    >
      {completed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
    </StyledCheckbox>
  );
}
