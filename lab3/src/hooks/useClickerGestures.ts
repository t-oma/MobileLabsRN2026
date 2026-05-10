import { Dimensions } from "react-native";
import { Gesture, Directions } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

interface GestureCallbacks {
  onTap: () => void;
  onDoubleTap: () => void;
  onLongPress: () => void;
  onDrag: () => void;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onPinch: () => void;
}

export function useClickerGestures(callbacks: GestureCallbacks) {
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

  const {
    onTap,
    onDoubleTap,
    onLongPress,
    onDrag,
    onSwipeRight,
    onSwipeLeft,
    onPinch,
  } = callbacks;

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

  const pinchGesture = Gesture.Pinch()
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
    pinchGesture,
  );

  return { gesture, animatedStyle };
}
