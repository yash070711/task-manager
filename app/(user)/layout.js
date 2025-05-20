import Navbar from "@/components/navigation-bar/navbar";
import { TaskProvider } from "@/context/task-context";

function layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <TaskProvider>{children}</TaskProvider>
      </div>
    </div>
  );
}

export default layout;
