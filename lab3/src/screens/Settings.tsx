import { Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useGame } from "@/context/GameContext";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { ScreenContent } from "@/components/layout/ScreenContent";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTheme } from "@/hooks/useTheme";

const ThemeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ThemeButton = styled.TouchableOpacity<{
  active: boolean;
  activeBg: string;
  inactiveBg: string;
  border: string;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.active ? props.activeBg : props.inactiveBg};
  border-width: 1px;
  border-color: ${(props) => (props.active ? props.activeBg : props.border)};
  margin-horizontal: 4px;
`;

const ThemeButtonText = styled.Text<{
  active: boolean;
  activeColor: string;
  inactiveColor: string;
}>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.active ? props.activeColor : props.inactiveColor)};
  margin-left: 6px;
`;

const ResetButton = styled.TouchableOpacity<{ bg: string }>`
  background-color: ${(props) => props.bg};
  border-radius: 14px;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ResetButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoText = styled.Text<{ color: string }>`
  font-size: 15px;
  color: ${(props) => props.color};
  margin-left: 10px;
`;

export default function SettingsScreen() {
  const { theme, mode, setMode } = useTheme();
  const { score, actions } = useGame();

  const handleReset = () => {
    Alert.alert(
      "Скинути прогрес?",
      "Це обнулить рахунок та всі виконані завдання.",
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Скинути", style: "destructive", onPress: actions.reset },
      ],
    );
  };

  const themeOptions = [
    { text: "Світла", value: "light", icon: "sunny-outline" },
    { text: "Темна", value: "dark", icon: "moon-outline" },
  ] as const;

  const aboutRows = [
    { icon: "information-circle-outline", text: "Gesture Clicker v1.0" },
    { icon: "code-slash-outline", text: "Лабораторна робота з React Native" },
    { icon: "code-slash-outline", text: "Левченко Артем, ІПЗ-23-3" },
  ] as const;

  return (
    <ScreenContainer bg={theme.colors.background}>
      <ScreenContent>
        <Card bg={theme.colors.card} border={theme.colors.border}>
          <SectionTitle color={theme.colors.textSecondary}>
            Тема оформлення
          </SectionTitle>

          <ThemeRow>
            {themeOptions.map(({ text, value, icon }) => (
              <ThemeButton
                key={value}
                active={mode === value}
                activeBg={theme.colors.primary}
                inactiveBg={theme.colors.overlay}
                border={theme.colors.border}
                onPress={() => setMode(value)}
              >
                <Ionicons
                  name={icon}
                  size={18}
                  color={mode === value ? "#FFFFFF" : theme.colors.text}
                />
                <ThemeButtonText
                  active={mode === value}
                  activeColor="#FFFFFF"
                  inactiveColor={theme.colors.text}
                >
                  {text}
                </ThemeButtonText>
              </ThemeButton>
            ))}
          </ThemeRow>
        </Card>

        <Card bg={theme.colors.card} border={theme.colors.border}>
          <SectionTitle color={theme.colors.textSecondary}>
            Прогрес
          </SectionTitle>

          <InfoRow>
            <Ionicons
              name="trophy-outline"
              size={20}
              color={theme.colors.primary}
            />
            <InfoText color={theme.colors.text}>
              Поточний рахунок: {score} очок
            </InfoText>
          </InfoRow>

          <ResetButton bg={theme.colors.danger} onPress={handleReset}>
            <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
            <ResetButtonText>Скинути прогрес</ResetButtonText>
          </ResetButton>
        </Card>

        <Card bg={theme.colors.card} border={theme.colors.border}>
          <SectionTitle color={theme.colors.textSecondary}>
            Про додаток
          </SectionTitle>

          {aboutRows.map(({ icon, text }, index) => (
            <InfoRow key={index}>
              <Ionicons
                name={icon}
                size={20}
                color={theme.colors.textSecondary}
              />
              <InfoText color={theme.colors.textSecondary}>{text}</InfoText>
            </InfoRow>
          ))}
        </Card>
      </ScreenContent>
    </ScreenContainer>
  );
}
