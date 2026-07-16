"use client";
import React, { useCallback, useState } from "react";
import { CodePanel } from "./CodePanel";
import {statusStep,FileData}  from "@/types/workspace";

const workspceClient = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusLog, setStatusLog] = useState<statusStep[]>([]);

  const handleFilePatch = useCallback((patches: FileData) => {
    setFileData(patches);
  }, []);

  return (
    <div className="flex h-[calc(180vh-4rem)] overflow-hidden bg-[#0a0a0a]">
      {/* chat panal  */}
      <div
        className="w-[320px] shrink-0 border-r border-white/6 bg-[#0d0d0d] flex 
        items-center justify-center"
      >
        <p className="text-xs text-white/20">chat panel coming soon</p>
      </div>

      {/* code panel  */}
      <CodePanel
        fileData={fileData}
        isGenerating={isGenerating}
        statusLog={statusLog}
        onFilePatch={handleFilePatch}
      />
    </div>
  );
};

export default workspceClient;
