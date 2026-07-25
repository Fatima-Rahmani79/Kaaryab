"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/auth/client";
import { Session } from "inspector";

interface Profile {
  id: string;
  email: string | null;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    async function loadProfile(currentUser: User | null) {
      if (!active) return;
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("id, email, is_admin")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (active) {
        setProfile(data as Profile | null);
        setLoading(false);
      }
    }

    supabase.auth.getUser().then(({ data }) => loadProfile(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, Session) => {
        loadProfile(Session?.user ?? null);
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin: profile?.is_admin ?? false,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
