export type MessageRole = "user" | "assistent";

export interface Message {
  role: MessageRole;
  content: string;
  imageUrl?: string;
}

//files + dependencies always travel together as one unit
//this is what gets saved to prisma as a single Json column

export interface FileData {
  files: Record<string, { code: string }>;
  dependencies: Record<string, string>;
  title?: string;
}

export interface statusStep {
  label: string;
  status: "running" | "done";
}
export interface WorkspaceData {
  id: string;
  title: string | null;
  messages: unknown; // prisma return Json- we parse it at runtime
  fileData: unknown;
}

export interface WorkspaceUser{
    id:string,
    credits:number,
    plan:string
}
