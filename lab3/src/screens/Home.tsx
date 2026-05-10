import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import { scheduleOnRN } from "react-native-worklets";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const Container = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${(props) => props.bg};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const ScoreCard = styled.View<{ bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border-radius: 24px;
  padding: 16px;
  align-items: center;
  margin-bottom: 24px;
  border: 1px solid ${(props) => props.border};
`;

const ScoreLabel = styled.Text<{ color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScoreValue = styled.Text<{ color: string }>`
  font-size: 64px;
  font-weight: 900;
  color: ${(props) => props.color};
  margin-top: 8px;
`;

const CircleButton = styled(Animated.View)<{ bg: string }>`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-vertical: 64px;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 6;
`;

const CircleText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
`;

const ReadmeCard = styled.View<{ bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border-radius: 24px;
  padding: 20px;
  border: 1px solid ${(props) => props.border};
`;

const ReadmeItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;
`;

const ReadmeText = styled.Text<{ color: string }>`
  font-size: 15px;
  color: ${(props) => props.color};
  margin-left: 12px;
  flex: 1;
  flex-wrap: wrap;
`;

const ReadmeHint = styled.Text<{ color: string }>`
  font-size: 13px;
  color: ${(props) => props.color};
  margin-top: 4px;
  text-align: center;
`;

const hints = [
  {
    icon: "finger-print-outline" as const,
    color: "#007AFF",
    text: "Tap: +1 point",
  },
  {
    icon: "hand-left-outline" as const,
    color: "#34C759",
    text: "Double-tap: +2 points",
  },
  {
    icon: "timer-outline" as const,
    color: "#AF52DE",
    text: "Long-press (3s): +5 points",
  },
  {
    icon: "swap-horizontal-outline" as const,
    color: "#FF9500",
    text: "Swipe left/right: +1-10 random points",
  },
  {
    icon: "scan-outline" as const,
    color: "#FF2D55",
    text: "Pinch (resize): +3 points",
  },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const {
    score,
    onTap,
    onDoubleTap,
    onLongPress,
    onDrag,
    onSwipeRight,
    onSwipeLeft,
    onPinch,
  } = useGame();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const resetPosition = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const tap = Gesture.Tap().onEnd(() => {
    scheduleOnRN(onTap);
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scheduleOnRN(onDoubleTap);
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      scheduleOnRN(onLongPress);
    });

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      scheduleOnRN(onDrag);
      const maxX = SCREEN_W / 2 - 80;
      const maxY = SCREEN_H / 2 - 120;
      if (translateX.value < -maxX) translateX.value = withSpring(-maxX);
      if (translateX.value > maxX) translateX.value = withSpring(maxX);
      if (translateY.value < -maxY) translateY.value = withSpring(-maxY);
      if (translateY.value > maxY) translateY.value = withSpring(maxY);
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      scheduleOnRN(onSwipeRight);
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      scheduleOnRN(onSwipeLeft);
    });

  const pinch = Gesture.Pinch()
    .onChange((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      scheduleOnRN(onPinch);

      if (scale.value < 0.6) {
        scale.value = withSpring(0.6);
        savedScale.value = 0.6;
      } else if (scale.value > 2.5) {
        scale.value = withSpring(2.5);
        savedScale.value = 2.5;
      }
    });

  const gesture = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, tap),
    longPress,
    pan,
    flingRight,
    flingLeft,
    pinch,
  );

  return (
    <Container bg={theme.colors.background}>
      <Content showsVerticalScrollIndicator={false}>
        <ScoreCard bg={theme.colors.card} border={theme.colors.border}>
          <ScoreLabel color={theme.colors.textSecondary}>Score</ScoreLabel>
          <ScoreValue color={theme.colors.primary}>{score}</ScoreValue>
        </ScoreCard>

        <GestureDetector gesture={gesture}>
          <CircleButton bg={theme.colors.primary} style={animatedStyle}>
            <Ionicons name="finger-print" size={48} color="#FFFFFF" />
            <CircleText>TAP ME</CircleText>
          </CircleButton>
        </GestureDetector>

        <ReadmeCard bg={theme.colors.card} border={theme.colors.border}>
          {hints.map((hint, index) => (
            <ReadmeItem key={index}>
              <Ionicons name={hint.icon} size={22} color={hint.color} />
              <ReadmeText color={theme.colors.text}>{hint.text}</ReadmeText>
            </ReadmeItem>
          ))}
          <ReadmeHint color={theme.colors.textSecondary}>
            Перетягуй, масштабуй та свайпай об’єкт для бонусів!
          </ReadmeHint>
        </ReadmeCard>
      </Content>
    </Container>
  );
}
