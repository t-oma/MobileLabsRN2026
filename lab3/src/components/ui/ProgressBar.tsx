import { useTheme } from "@/context/ThemeContext";
import React from "react";
import styled from "styled-components/native";

type Props = {
  current: number;
  target: number;
  completed: boolean;
};

const Track = styled.View<{ bg: string }>`
  height: 6px;
  background-color: ${(props) => props.bg};
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled.View<{ bg: string; fill: number }>`
  height: 6px;
  background-color: ${(props) => props.bg};
  border-radius: 3px;
  width: ${(props) => `${Math.min(props.fill * 100, 100)}%`};
`;

const Label = styled.Text<{ color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-top: 6px;
  text-align: right;
`;

export function ProgressBar({ current, target, completed }: Props) {
  const { theme } = useTheme();

  const progress = target > 0 ? current / target : 0;

  return (
    <>
      <Track bg={theme.colors.overlay}>
        <Fill
          bg={completed ? theme.colors.success : theme.colors.primary}
          fill={progress}
        />
      </Track>
      <Label color={theme.colors.textSecondary}>
        {current}/{target}
      </Label>
    </>
  );
}
