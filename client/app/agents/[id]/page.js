import TopBar from "@/components/layout/agents/Topbar";
import Sidebar from "@/components/layout/agents/Sidebar";
import DetailBar from "@/components/layout/agents/DetailBar";
import VisibilityBar from "@/components/layout/agents/VisibilityBar";

export default function AgentsPage() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col relative">
      <VisibilityBar />
      <TopBar />
      <div className="flex-1 flex p-6 gap-5">
        <Sidebar />
        <div className="flex-1 h-full">
          <DetailBar />
        </div>
      </div>
    </div>
  );
}
