import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, LogOut, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    user: typeof search["user"] === "string" ? search["user"] : "demo.user",
  }),
  head: () => ({
    meta: [
      { title: "Sign-in successful | SBI Demo Portal" },
      {
        name: "description",
        content: "A fictional SBI-inspired successful sign-in confirmation screen.",
      },
      { property: "og:title", content: "Sign-in successful | SBI Demo Portal" },
      {
        property: "og:description",
        content: "The sample SBI demo session has been opened successfully.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginSuccessPage,
});

function LoginSuccessPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login-success" });
  const user = search["user"];

  return (
    <main className="min-h-screen bg-bank-navy text-bank-on-navy">
      <header className="border-b border-bank-on-navy/10 bg-bank-navy/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Return to SBI Demo Portal sign in">
            <div className="grid size-9 place-items-center rounded-md border border-bank-on-navy/20 bg-bank-on-navy/10 font-display text-xs tracking-wide">SB</div>
            <div className="leading-none">
              <p className="text-sm font-semibold tracking-tight">SBI Demo Portal</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bank-on-navy/55">Sandbox · Fictional</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-xs text-bank-on-navy/70">
            <ShieldCheck className="size-4 text-bank-teal" aria-hidden="true" />
            <span className="hidden sm:inline">Session verified</span>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="bank-success-glow" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div className="bank-rise">
            <div className="grid size-16 place-items-center rounded-full border border-bank-teal/40 bg-bank-teal/15 text-bank-teal shadow-bank-teal">
              <Check className="size-8" strokeWidth={2.5} />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-bank-teal">Session confirmed</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-6xl uppercase leading-[0.88] tracking-tight sm:text-8xl">
              You&apos;re in
            </h1>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-bank-on-navy/70">
              The fictional teller window is open. Continue to the demo account overview or return to the sign-in screen.
            </p>
          </div>

          <div className="bank-rise bank-rise--delay-1 rounded-xl border border-bank-on-navy/15 bg-bank-on-navy/10 p-6 shadow-bank-sm backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl uppercase tracking-tight">Sign-in details</h2>
              <span className="inline-flex items-center gap-2 rounded-md border border-bank-teal/30 bg-bank-teal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bank-teal">
                <span className="size-1.5 rounded-full bg-bank-teal" /> Live
              </span>
            </div>

            <dl className="divide-y divide-bank-on-navy/10 rounded-lg border border-bank-on-navy/10 bg-bank-navy/30 px-4">
              <div className="flex flex-wrap justify-between gap-3 py-4 text-sm"><dt className="text-bank-on-navy/55">Signed in as</dt><dd className="font-medium">{user}</dd></div>
              <div className="flex flex-wrap justify-between gap-3 py-4 text-sm"><dt className="text-bank-on-navy/55">Session type</dt><dd className="font-medium">Fictional demo</dd></div>
              <div className="flex flex-wrap justify-between gap-3 py-4 text-sm"><dt className="text-bank-on-navy/55">Connection</dt><dd className="font-medium text-bank-teal">Verified · TLS demo</dd></div>
              <div className="flex flex-wrap justify-between gap-3 py-4 text-sm"><dt className="text-bank-on-navy/55">Device</dt><dd className="font-medium">Browser session</dd></div>
            </dl>

            <Button asChild className="mt-6 h-11 w-full rounded-lg bg-bank-teal text-bank-navy hover:bg-bank-teal/85">
              <Link to="/">
                Continue to account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <div className="mt-5 flex items-center justify-between gap-4 text-xs">
              <Button asChild variant="link" className="h-auto p-0 text-bank-on-navy/75 hover:text-bank-on-navy">
                <Link to="/">
                  <ArrowLeft className="size-3.5" /> Back to sign in
                </Link>
              </Button>
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-bank-teal hover:text-bank-teal/80"
                onClick={() => navigate({ to: "/" })}
              >
                <LogOut className="size-3.5" /> Sign out
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-bank-on-navy/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] text-bank-on-navy/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 SBI Demo Portal · Fictional interface</span>
          <span>No banking services are connected</span>
        </div>
      </footer>
    </main>
  );
}