import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WorkspceClient from "@/components/WorkspceClient"

interface WorkspacePageProps {
  searchParams: Promise<{ prompt?: string; id?: string }>;
}

const Workspacepage = async ({ searchParams }: WorkspacePageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const { prompt, id } = await searchParams;
  return <>
  < WorkspceClient/>
  </>;
};

export default Workspacepage;
