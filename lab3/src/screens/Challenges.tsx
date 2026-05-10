import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";

const Container = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${(props) => props.bg};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

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
`;

const IconCircle = styled.View<{ bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
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

const Checkbox = styled.View<{
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

const ProgressTrack = styled.View<{ bg: string }>`
  height: 6px;
  background-color: ${(props) => props.bg};
  border-radius: 3px;
  margin-top: 12px;
  overflow: hidden;
`;

const ProgressFill = styled.View<{ bg: string; fill: number }>`
  height: 6px;
  background-color: ${(props) => props.bg};
  border-radius: 3px;
  width: ${(props) => `${Math.min(props.fill * 100, 100)}%`};
`;

const ProgressLabel = styled.Text<{ color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-top: 6px;
  text-align: right;
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
    <Container bg={theme.colors.background}>
      <Content showsVerticalScrollIndicator={false}>
        {tasks.map((task, index) => {
          const meta = tasksMeta[index];
          const progress = task.target > 0 ? task.current / task.target : 0;

          return (
            <TaskCard
              key={task.id}
              bg={theme.colors.card}
              border={theme.colors.border}
              completed={task.completed}
            >
              <TaskHeader>
                <IconCircle bg={`${meta.color}20`}>
                  <Ionicons name={meta.icon} size={20} color={meta.color} />
                </IconCircle>
                <TaskTextBlock>
                  <TaskTitle color={theme.colors.text}>{task.title}</TaskTitle>
                  <TaskDesc color={theme.colors.textSecondary}>
                    {task.description}
                  </TaskDesc>
                </TaskTextBlock>
                <Checkbox
                  completed={task.completed}
                  border={theme.colors.border}
                  bg={theme.colors.success}
                >
                  {task.completed && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </Checkbox>
              </TaskHeader>
              <ProgressTrack bg={theme.colors.overlay}>
                <ProgressFill
                  bg={
                    task.completed ? theme.colors.success : theme.colors.primary
                  }
                  fill={progress}
                />
              </ProgressTrack>
              <ProgressLabel color={theme.colors.textSecondary}>
                {task.current}/{task.target}
              </ProgressLabel>
            </TaskCard>
          );
        })}
      </Content>
    </Container>
  );
}
