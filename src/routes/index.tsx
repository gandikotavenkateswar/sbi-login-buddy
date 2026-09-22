import { z } from "zod";
import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your demo username."),
  password: z.string().min(1, "Enter your demo password."),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secure sign in | SBI Demo Portal" },
      {
        name: "description",
        content: "A clearly labeled fictional SBI-inspired secure sign-in demo.",
      },
      { property: "og:title", content: "Secure sign in | SBI Demo Portal" },
      {
        property: "og:description",
        content: "Enter the fictional demo credentials to view the successful sign-in screen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("demo.user");
  const [password, setPassword] = useState("demo-password");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setError("");
    navigate({ to: "/login-success", search: { user: result.data.username } });
  }

  return (
    <main className="min-h-screen bg-bank-background text-bank-ink">
      <header className="border-b border-bank-line/80 bg-bank-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="SBI Demo Portal home">
            <div className="grid size-9 place-items-center rounded-md bg-bank-navy text-bank-on-navy shadow-bank-sm">
              <span className="font-display text-xs tracking-wide">SB</span>
            </div>
            <div className="leading-none">
              <p className="text-sm font-semibold tracking-tight">SBI Demo Portal</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bank-muted">
                Fictional · Sandbox
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-xs text-bank-muted">
            <ShieldCheck className="size-4 text-bank-teal" aria-hidden="true" />
            <span className="hidden sm:inline">Secure demo session</span>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-bank-line">
        <div className="bank-diagonal-panel bank-diagonal-panel--navy" aria-hidden="true" />
        <div className="bank-diagonal-panel bank-diagonal-panel--blue" aria-hidden="true" />
        <div className="bank-diagonal-panel bank-diagonal-panel--teal" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 lg:pb-16 lg:pt-20">
          <div className="max-w-[27rem] bank-rise">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bank-teal">
              Secure access · Demo
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-[0.88] tracking-tight text-bank-navy sm:text-8xl">
              Teller
              <br />
              Window
            </h1>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-bank-muted">
              A fictional SBI-inspired sign-in experience. Use the sample details to open a safe sandbox session.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-14">
        <form
          onSubmit={handleSubmit}
          className="bank-rise bank-rise--delay-1 relative overflow-hidden rounded-xl bg-bank-panel p-6 shadow-bank-sm ring-1 ring-bank-navy/10 sm:p-8"
          noValidate
        >
          <div className="absolute inset-0 -z-10 bank-panel-sheen" aria-hidden="true" />
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-bank-navy">Sign in</h2>
              <p className="mt-1 text-xs text-bank-muted">Demo credentials only</p>
            </div>
            <LockKeyhole className="size-5 text-bank-teal" aria-hidden="true" />
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="text-xs font-semibold text-bank-ink/80">Username</span>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 h-11 rounded-lg border-bank-navy/20 bg-bank-paper text-bank-ink focus-visible:border-bank-teal focus-visible:ring-bank-teal"
                autoComplete="username"
                aria-invalid={Boolean(error)}
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-bank-ink/80">Password</span>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-lg border-bank-navy/20 bg-bank-paper pr-11 text-bank-ink focus-visible:border-bank-teal focus-visible:ring-bank-teal"
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 text-bank-muted hover:bg-bank-blue/10 hover:text-bank-navy"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-bank-muted">
              <Checkbox checked={rememberDevice} onCheckedChange={(checked) => setRememberDevice(checked === true)} />
              Remember this device
            </label>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-xs text-bank-navy"
              onClick={() => setError("Password recovery is not available in this demo.")}
            >
              Forgot password?
            </Button>
          </div>

          {error ? (
            <p className="mt-4 rounded-md border border-bank-danger/30 bg-bank-danger-soft px-3 py-2 text-xs text-bank-danger" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="mt-6 h-11 w-full rounded-lg bg-bank-navy text-bank-on-navy hover:bg-bank-blue">
            Sign in securely
            <ArrowRight className="size-4" />
          </Button>
          <p className="mt-4 text-center font-mono text-[10px] text-bank-muted">
            Sandbox mode · No real credentials are collected
          </p>
        </form>

        <aside className="bank-rise bank-rise--delay-2 relative overflow-hidden rounded-xl bg-bank-navy p-6 text-bank-on-navy shadow-bank-sm sm:p-8">
          <div className="absolute inset-0 bank-navy-pattern" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-bank-teal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bank-teal">Protected entry</span>
            </div>
            <h2 className="max-w-[10ch] font-display text-5xl uppercase leading-[0.92] tracking-tight">
              Quietly secure
            </h2>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-bank-on-navy/70">
              The demo keeps the experience clear and orderly while showing exactly when a session has been opened.
            </p>
            <div className="mt-8 space-y-3 border-t border-bank-on-navy/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-bank-on-navy/65">
              <div className="flex items-center justify-between gap-4"><span>Connection</span><span className="text-bank-teal">Encrypted</span></div>
              <div className="flex items-center justify-between gap-4"><span>Portal</span><span>Fictional sandbox</span></div>
              <div className="flex items-center justify-between gap-4"><span>Access</span><span>Sample user</span></div>
            </div>
          </div>
        </aside>
      </section>

      <footer className="border-t border-bank-line bg-bank-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] text-bank-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 SBI Demo Portal · Fictional interface</span>
          <span>For demonstration only · No banking services are connected</span>
        </div>
      </footer>
    </main>
  );
}
