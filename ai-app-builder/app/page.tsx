"use client";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { Badge } from "@/components/ui/badge";
import { BlueTitle, SectionHeading, SectionLabel } from "@/components/reuseable";
import { GrayTitle } from "@/components/reuseable";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FEATURES, PLACEHOLDERS, SUGGESTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [placeHolderIndex, setPlaceHolderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceHolderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  // submit on enter allow shift+enter for new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section
        className="relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center"
      >
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)"
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />
        <Badge className="gap-2 p-4 backdrop-blur-sm" variant={"outline"}>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powerd by Gemini 3.5 flash
        </Badge>
        <h1
          className="mx-auto max-w-3xl text-balance font-serif text-5xl
        leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10"
        >
          <GrayTitle>Forge your dream</GrayTitle>
          <br />
          <BlueTitle>from a single prompt.</BlueTitle>
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed
        text-white/40 z-10"
        >
          Describe what you want to build. Ai writes the code ,picks the
          package,and renders a live preview all inside your browser
        </p>

        {/* prompt box */}
        <div className="relative z-10 mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/8"
                : "border-white/8",
            )}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm
              placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
              placeholder={PLACEHOLDERS[placeHolderIndex]}
            />
            <div
              className="flex items-center justify-between border-t border-white/6
            px-4 py-2.5"
            >
              <span className="text-xs text-white/20">
                Press to generate . Shift for new line
              </span>
              {isSignedIn ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-8 rounded-full px-5 font-semibold"
                  variant={prompt.trim() ? "default" : "secondary"}
                >
                  Generate
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-8 rounded-full text-black bg-white px-5 font-semibold">
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-4 py-1.5
              text-sx text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-10 text-xs text-white/70">No credit card required . 10 free generations on sign up</p>
      </section>
      {/* ///browser section mockup */}
      <section className="px-4 pb-28">
        <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#0e0e0e] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.6)] sm:p-6">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-[#151515] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 rounded-full border border-white/8 bg-black/40 px-4 py-2 text-left text-xs text-white/35">
              https://ai-app-builder.workspaces.local/build
            </div>
            <div className="hidden rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/40 sm:block">
              Workspace Preview
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[1.75rem] border border-white/8 bg-[#111111] p-4">
              <div className="flex h-full min-h-[440px] flex-col overflow-hidden rounded-[1.5rem] border border-white/6 bg-[#0c0c0c]">
                <div className="border-b border-white/6 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/28">
                        Chat Workspace
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-white/90">
                        Build the dashboard layout
                      </h2>
                    </div>
                    <div className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] text-white/40">
                      Live session
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 px-4 py-5">
                  <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/80">
                    Make the app feel like a sleek workspace with a browser mockup, dark theme, and a split chat/code layout.
                  </div>

                  <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/72">
                    I’ll anchor the composition with a fake browser chrome, then divide the body into a conversational panel and a preview panel.
                  </div>

                  <div className="max-w-[72%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/28">
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                      Typing
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/55 [animation-delay:0ms]" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/55 [animation-delay:150ms]" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/55 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/6 px-4 py-4">
                  <div className="rounded-2xl border border-white/8 bg-[#131313] px-4 py-3 text-sm text-white/28">
                    Type a prompt to generate your next workspace
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/8 bg-[#111111] p-4">
              <div className="flex h-full min-h-[440px] flex-col overflow-hidden rounded-[1.5rem] border border-white/6 bg-[#0c0c0c]">
                <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
                  <button className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
                    Code
                  </button>
                  <button className="rounded-full px-3 py-1.5 text-xs font-medium text-white/35">
                    Preview
                  </button>
                  <button className="rounded-full px-3 py-1.5 text-xs font-medium text-white/35">
                    Console
                  </button>
                </div>

                <div className="flex-1 p-4">
                  <div className="rounded-[1.5rem] border border-white/8 bg-[#101010] p-4">
                    <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/28">
                      <span>Kanban Preview</span>
                      <span>Static mockup</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                          Todo
                        </div>
                        <div className="space-y-3">
                          <div className="h-16 rounded-xl border border-white/8 bg-white/[0.06]" />
                          <div className="h-12 rounded-xl border border-white/8 bg-white/[0.04]" />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                          In progress
                        </div>
                        <div className="space-y-3">
                          <div className="h-20 rounded-xl border border-white/8 bg-white/[0.06]" />
                          <div className="h-12 rounded-xl border border-white/8 bg-white/[0.04]" />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                          Done
                        </div>
                        <div className="space-y-3">
                          <div className="h-14 rounded-xl border border-white/8 bg-white/[0.06]" />
                          <div className="h-10 rounded-xl border border-white/8 bg-white/[0.04]" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/8 bg-black/30 p-4">
                      <div className="flex items-center justify-between text-xs text-white/35">
                        <span>Rendering workspace cards</span>
                        <span>72% complete</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/6">
                        <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-white/35 to-white/70" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* //service section  */}
      <section className="px-4 py-24">
        <div className="mx-auto mb-14 max-w-5xl text-center">
      <SectionLabel> Everything you need</SectionLabel>
      <SectionHeading gray="From prompt" blue="to production."/> 
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden
      rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({icon:Icon,label,desc})=>{
          return (
            <div key={label} className="bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]">
              <div className="mb-4 flex h-9 items-center justify-center rounded-lg
              border border-white/8 bg-white/4 group-hover:border-white/15
              group-hover:bg-white/8">
                <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70"/>
              </div>
              <p className="mb-2 text-sm font-semibold">{label}</p>
              <p className="text-sm leading-relaxed text-white/40">{desc}</p>
            </div>
          );
        })}
      </div>
        </div>

      </section>
    </main>
  );
}
