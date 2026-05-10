import styled from "styled-components/native";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { ScreenContent } from "@/components/layout/ScreenContent";
import { IconCircle } from "@/components/ui/IconCircle";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProgressBar } from "@/components/ui/ProgressBar";

const TaskCard = styled.View<{
  bg: string;
  border: string;
  completed: boolean;
}>`
  background-color: ${(props) => props.bg};
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 14px;
  border: 1px solid ${(props) => props.border};
  opacity: ${(props) => (props.completed ? 0.85 : 1)};
`;

const TaskHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const TaskTextBlock = styled.View`
  flex: 1;
`;

const TaskTitle = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.color};
`;

const TaskDesc = styled.Text<{ color: string }>`
  font-size: 13px;
  color: ${(props) => props.color};
  margin-top: 2px;
`;

const tasksMeta = [
  { icon: "finger-print-outline" as const, color: "#007AFF" },
  { icon: "hand-left-outline" as const, color: "#34C759" },
  { icon: "timer-outline" as const, color: "#AF52DE" },
  { icon: "move-outline" as const, color: "#5856D6" },
  { icon: "arrow-forward-outline" as const, color: "#FF9500" },
  { icon: "arrow-back-outline" as const, color: "#5AC8FA" },
  { icon: "scan-outline" as const, color: "#FF2D55" },
  { icon: "trophy-outline" as const, color: "#FFCC00" },
  { icon: "duplicate-outline" as const, color: "#A2845E" },
  { icon: "swap-horizontal-outline" as const, color: "#32ADE6" },
];

export default function ChallengesScreen() {
  const { theme } = useTheme();
  const { tasks } = useGame();

  return (
    <ScreenContainer bg={theme.colors.background}>
      <ScreenContent>
        {tasks.map((task, index) => {
          const meta = tasksMeta[index];

          return (
            <TaskCard
              key={task.id}
              bg={theme.colors.card}
              border={theme.colors.border}
              completed={task.completed}
            >
              <TaskHeader>
                <IconCircle icon={meta.icon} color={meta.color} />
                <TaskTextBlock>
                  <TaskTitle color={theme.colors.text}>{task.title}</TaskTitle>
                  <TaskDesc color={theme.colors.textSecondary}>
                    {task.description}
                  </TaskDesc>
                </TaskTextBlock>
                <Checkbox completed={task.completed} />
              </TaskHeader>
              <ProgressBar
                current={task.current}
                target={task.target}
                completed={task.completed}
              />
            </TaskCard>
          );
        })}
      </ScreenContent>
    </ScreenContainer>
  );
}
