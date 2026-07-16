"use client";

// ─── Placeholder ──────────────────────────────────────────────────────────────

import { FileData, statusStep } from "@/types/workspace";
import { useEffect, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Code2, Eye } from "lucide-react";
const PLACEHOLDER_FILES = {
  "/App.js": {
    code: `export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
        <p style={{ fontSize: 14 }}>Your app will appear here</p>
      </div>
    </div>
  );
}`,
  },
};

// ─── Base dependencies ────────────────────────────────────────────────────────

const BASE_DEPENDENCIES: Record<string, string> = {
  "react-is": "latest",
  "react-router-dom": "latest",
  "lucide-react": "latest",
  recharts: "latest",
  "date-fns": "latest",
  "framer-motion": "latest",
  "react-hook-form": "latest",
  "@hookform/resolvers": "latest",
  zod: "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-tabs": "latest",
  "@radix-ui/react-tooltip": "latest",
  "@radix-ui/react-accordion": "latest",
  "@radix-ui/react-select": "latest",
  axios: "latest",
  clsx: "latest",
  "class-variance-authority": "latest",
  "tailwind-merge": "latest",
};

type ActiveTab = "preview" | "code";

interface CodePanelProps {
  fileData: FileData | null;
  isGenerating: boolean;
  statusLog: statusStep[];
  onFilePatch: (patches: FileData) => void;
}

function SandpackInner({
  fileData,
  isGenerating,
  activeTab,
  setActiveTab,
}: {
  fileData: FileData | null;
  isGenerating: boolean;
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  // TODO: statusLog,onImprove,onFixError,appTitle,isImproving,isProUser
}) {
  const { sandpack, listen } = useSandpack();
  //TODO :listen - improved from usesandpack for error detection

  //---push file updates into sandpack without---------
  // we key sandpackProvider on the file PATH SET only.
  // when file CONTENTS change (after generation), we push them via updatedFile()
  // so sandpack stays mounted and the preview refreshes in place.
  const prevFileRef = useRef<Record<string, { code: string }>>({});
  useEffect(() => {
    if (!fileData?.files) return;
    const prev = prevFileRef.current;
    for (const [path, { code }] of Object.entries(fileData.files)) {
      if (prev[path]?.code !== code) {
        sandpack.updateFile(path, code);
      }
    }
    prevFileRef.current = fileData.files;
  }, [fileData?.files]);

  // useEffect listen() for Sandpack preview error
  // msg.type === "action" && msg.action=== "show-error" ->setPreviewError
  // msg.type ==="compile" && "error" in msg -> serPreviewError
  // msg.type === "success" -> setPreviewError(null)

  // TODO: auto-switch to preview tab when fileData first arrives
  // useEffect(()=>{if (fileData)setActiveTab("preview")},[fileData])
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as ActiveTab)}
      className="flex h-full flex-col gap-0"
    >
      <div className="flex items-center justify-between border-b border-white/6 px-2">
        <TabsList
          variant="line"
          className="h-auto gap-0 rounded-none bg-transparent p-0"
        >
          <TabsTrigger className="border-b-2 pt-2" value="Code">
            <Code2 className="h-3.5 w-3.5 " />
            Code
          </TabsTrigger>
          <TabsTrigger className="border-b-2 pt-2" value="Preview">
            <Eye className="h-3.5 w-3.5" />
            Preview
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

export function CodePanel({
  fileData,
  isGenerating,
  statusLog,
  onFilePatch: _onfilePatch,
}: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const files = fileData?.files ?? PLACEHOLDER_FILES;
  const dependencies = {
    ...BASE_DEPENDENCIES,
    ...(fileData?.dependencies ?? {}),
  };
  const filepathKey = Object.keys(files).sort().join("|");
  return (
    <div>
      <SandpackProvider
        key={filepathKey}
        template="react"
        theme={dracula}
        files={files}
        customSetup={{ dependencies }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <SandpackInner
          fileData={fileData}
          isGenerating={isGenerating}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </SandpackProvider>
    </div>
  );
}
