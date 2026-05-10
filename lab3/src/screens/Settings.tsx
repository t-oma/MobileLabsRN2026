import { Alert } from "react-native";
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

const Section = styled.View<{ bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.border};
`;

const SectionTitle = styled.Text<{ color: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.color};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`;

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
  const { reset, score } = useGame();

  const handleReset = () => {
    Alert.alert(
      "Скинути прогрес?",
      "Це обнулить рахунок та всі виконані завдання.",
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Скинути", style: "destructive", onPress: reset },
      ],
    );
  };

  return (
    <Container bg={theme.colors.background}>
      <Content showsVerticalScrollIndicator={false}>
        <Section bg={theme.colors.card} border={theme.colors.border}>
          <SectionTitle color={theme.colors.textSecondary}>
            Тема оформлення
          </SectionTitle>
          <ThemeRow>
            <ThemeButton
              active={mode === "light"}
              activeBg={theme.colors.primary}
              inactiveBg={theme.colors.overlay}
              border={theme.colors.border}
              onPress={() => setMode("light")}
            >
              <Ionicons
                name="sunny-outline"
                size={18}
                color={mode === "light" ? "#FFFFFF" : theme.colors.text}
              />
              <ThemeButtonText
                active={mode === "light"}
                activeColor="#FFFFFF"
                inactiveColor={theme.colors.text}
              >
                Світла
              </ThemeButtonText>
            </ThemeButton>

            <ThemeButton
              active={mode === "dark"}
              activeBg={theme.colors.primary}
              inactiveBg={theme.colors.overlay}
              border={theme.colors.border}
              onPress={() => setMode("dark")}
            >
              <Ionicons
                name="moon-outline"
                size={18}
                color={mode === "dark" ? "#FFFFFF" : theme.colors.text}
              />
              <ThemeButtonText
                active={mode === "dark"}
                activeColor="#FFFFFF"
                inactiveColor={theme.colors.text}
              >
                Темна
              </ThemeButtonText>
            </ThemeButton>

            <ThemeButton
              active={mode === "system"}
              activeBg={theme.colors.primary}
              inactiveBg={theme.colors.overlay}
              border={theme.colors.border}
              onPress={() => setMode("system")}
            >
              <Ionicons
                name="phone-portrait-outline"
                size={18}
                color={mode === "system" ? "#FFFFFF" : theme.colors.text}
              />
              <ThemeButtonText
                active={mode === "system"}
                activeColor="#FFFFFF"
                inactiveColor={theme.colors.text}
              >
                Системна
              </ThemeButtonText>
            </ThemeButton>
          </ThemeRow>
        </Section>

        <Section bg={theme.colors.card} border={theme.colors.border}>
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
        </Section>

        <Section bg={theme.colors.card} border={theme.colors.border}>
          <SectionTitle color={theme.colors.textSecondary}>
            Про додаток
          </SectionTitle>
          <InfoRow>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
            <InfoText color={theme.colors.textSecondary}>
              Gesture Clicker v1.0
            </InfoText>
          </InfoRow>
          <InfoRow>
            <Ionicons
              name="code-slash-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
            <InfoText color={theme.colors.textSecondary}>
              Лабораторна робота з React Native
            </InfoText>
          </InfoRow>
          <InfoRow>
            <Ionicons
              name="code-slash-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
            <InfoText color={theme.colors.textSecondary}>
              Левченко Артем, ІПЗ-23-3
            </InfoText>
          </InfoRow>
        </Section>
      </Content>
    </Container>
  );
}
