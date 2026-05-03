import { useEffect, useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { getSession } from "@/lib/vault";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const nav = useNavigate();
  const router = useRouter();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const s = getSession();
    if (!s) {
      nav({ to: "/login" });
    } else {
      setOk(true);
    }
  }, [router.state.location.pathname]);
  if (!ok) return null;
  return <>{children}</>;
}
