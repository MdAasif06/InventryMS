import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative flex flex-col items-center overflow-hidden 
      px-4 pb-24 pt-40 text-center">
        <HoleBackground 
          strokeColor="rgba(255,255,255,0.05)" 
          className="absolute inset-0 h-full w-full"
          style={{maskImage:
            "liner-gradient(to bottom, rgba(0,0,0,0,0.6) 0%,rgba(0,0,0,0,0.5) 50%, transparent 100%)",
            WebkitMaskImage:
            "liner-gradient(to bottom, rgba(0,0,0,0,0.6) 0%,rgba(0,0,0,0,0.5)50%, transparent 100%)"
          }}
          />
        <Badge className="gap-2 p-4 backdrop-blur-sm" variant={"outline"}>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powerd by Gemini 3.5 flash
        </Badge>
        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl
        leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10"></h1>
      </section>
    </main>
  );
}
