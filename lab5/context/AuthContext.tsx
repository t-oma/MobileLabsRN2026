import { createContext, useState, ReactNode, use } from "react";

interface User {
  email: string;
  name: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    if (!email.includes("@")) return false;

    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (found) {
      setIsAuthenticated(true);
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    if (!email.includes("@")) return false;
    if (password.length < 6) return false;

    if (users.some((u) => u.email === email)) return false;

    const newUser: User = { email, name, password };
    setUsers((prev) => [...prev, newUser]);
    setIsAuthenticated(true);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
