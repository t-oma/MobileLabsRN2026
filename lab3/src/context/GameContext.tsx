import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  completed: boolean;
};

export type ScoreSource = "tap" | "doubleTap" | "longPress" | "swipe" | "pinch";

type GameState = {
  score: number;
  tapCount: number;
  doubleTapCount: number;
  longPressCompleted: boolean;
  dragCompleted: boolean;
  swipeRightCount: number;
  swipeLeftCount: number;
  pinchCompleted: boolean;
  doubleTapPoints: number;
};

type GameContextType = GameState & {
  tasks: Task[];
  onTap: () => void;
  onDoubleTap: () => void;
  onLongPress: () => void;
  onDrag: () => void;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onPinch: () => void;
  reset: () => void;
};

const initialState: GameState = {
  score: 0,
  tapCount: 0,
  doubleTapCount: 0,
  longPressCompleted: false,
  dragCompleted: false,
  swipeRightCount: 0,
  swipeLeftCount: 0,
  pinchCompleted: false,
  doubleTapPoints: 0,
};

const GameContext = createContext<GameContextType>({
  ...initialState,
  tasks: [],
  onTap: () => {},
  onDoubleTap: () => {},
  onLongPress: () => {},
  onDrag: () => {},
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
  onPinch: () => {},
  reset: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const onTap = useCallback(() => {
    setState((prev) => ({
      ...prev,
      score: prev.score + 1,
      tapCount: prev.tapCount + 1,
    }));
  }, []);

  const onDoubleTap = useCallback(() => {
    setState((prev) => ({
      ...prev,
      score: prev.score + 2,
      doubleTapCount: prev.doubleTapCount + 1,
      doubleTapPoints: prev.doubleTapPoints + 2,
    }));
  }, []);

  const onLongPress = useCallback(() => {
    setState((prev) => ({
      ...prev,
      score: prev.score + 5,
      longPressCompleted: true,
    }));
  }, []);

  const onDrag = useCallback(() => {
    setState((prev) => ({
      ...prev,
      dragCompleted: true,
    }));
  }, []);

  const onSwipeRight = useCallback(() => {
    const points = Math.floor(Math.random() * 10) + 1;
    setState((prev) => ({
      ...prev,
      score: prev.score + points,
      swipeRightCount: prev.swipeRightCount + 1,
    }));
  }, []);

  const onSwipeLeft = useCallback(() => {
    const points = Math.floor(Math.random() * 10) + 1;
    setState((prev) => ({
      ...prev,
      score: prev.score + points,
      swipeLeftCount: prev.swipeLeftCount + 1,
    }));
  }, []);

  const onPinch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      score: prev.score + 3,
      pinchCompleted: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const tasks = useMemo<Task[]>(() => {
    const s = state;

    return [
      {
        id: "1",
        title: "Зробити 10 кліків",
        description: "Натиснути на об'єкт 10 разів",
        current: s.tapCount,
        target: 10,
        completed: s.tapCount >= 10,
      },
      {
        id: "2",
        title: "Зробити подвійний клік 5 разів",
        description: "Використати TapGestureHandler для 5 подвійних кліків",
        current: s.doubleTapCount,
        target: 5,
        completed: s.doubleTapCount >= 5,
      },
      {
        id: "3",
        title: "Утримувати об'єкт 3 секунди",
        description:
          "Використати LongPressGestureHandler для довгого натискання",
        current: s.longPressCompleted ? 1 : 0,
        target: 1,
        completed: s.longPressCompleted,
      },
      {
        id: "4",
        title: "Перетягнути об'єкт",
        description:
          "Використати PanGestureHandler, щоб перемістити об'єкт по екрану",
        current: s.dragCompleted ? 1 : 0,
        target: 1,
        completed: s.dragCompleted,
      },
      {
        id: "5",
        title: "Зробити свайп вправо",
        description:
          "Використати FlingGestureHandler для швидкого свайпу вправо",
        current: s.swipeRightCount,
        target: 1,
        completed: s.swipeRightCount >= 1,
      },
      {
        id: "6",
        title: "Зробити свайп вліво",
        description:
          "Використати FlingGestureHandler для швидкого свайпу вліво",
        current: s.swipeLeftCount,
        target: 1,
        completed: s.swipeLeftCount >= 1,
      },
      {
        id: "7",
        title: "Змінити розмір об'єкта",
        description:
          "Використати PinchGestureHandler для збільшення або зменшення об'єкта",
        current: s.pinchCompleted ? 1 : 0,
        target: 1,
        completed: s.pinchCompleted,
      },
      {
        id: "8",
        title: "Отримати 100 очок",
        description: "Набрати загалом 100 очок у лічильнику",
        current: s.score,
        target: 100,
        completed: s.score >= 100,
      },
      {
        id: "9",
        title: "Набрати 20 очок подвійними кліками",
        description: "Заробити 20 очок виключно за допомогою подвійних кліків",
        current: s.doubleTapPoints,
        target: 20,
        completed: s.doubleTapPoints >= 20,
      },
      {
        id: "10",
        title: "Зробити по 2 свайпи вліво та вправо",
        description: "Виконати швидкий свайп у кожному напрямку по 2 рази",
        current: Math.min(s.swipeLeftCount, s.swipeRightCount),
        target: 2,
        completed: s.swipeLeftCount >= 2 && s.swipeRightCount >= 2,
      },
    ];
  }, [state]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        tasks,
        onTap,
        onDoubleTap,
        onLongPress,
        onDrag,
        onSwipeRight,
        onSwipeLeft,
        onPinch,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
