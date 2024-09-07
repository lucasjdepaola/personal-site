import OSAppsOpened from "@/components/os/appsopened";
import OSBackground from "@/components/os/osbackground";
import OSBar from "@/components/os/osbar";

export default function OS() {
  // use dark mode now
  return (
    <div className="h-full"
    >
      <OSBar />
      <OSBackground />
      <OSAppsOpened />
    </div>
  );
}
