import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

type Props = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size?: number;
};

const Circle = styled.View<{ bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export function IconCircle({ icon, color, size = 20 }: Props) {
  return (
    <Circle bg={`${color}20`}>
      <Ionicons name={icon} size={size} color={color} />
    </Circle>
  );
}
