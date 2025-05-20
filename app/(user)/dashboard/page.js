"use client";
import { useEffect, useState } from "react";
import { getTasks } from "@/services/task-service";
import ProductForm from "@/components/task/task-form";
import ProductList from "@/components/task/task-list";
import toast from "react-hot-toast";
import ControlledSelect from "@/common/inputs/controlled-select";
import { useTask } from "@/context/task-context";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const { createTaskList, tasks, deleteTask } = useTask();

  const filteredData = tasks
    ? tasks.filter((task) =>
        filter === "all" ? true : task.completed === (filter === "true")
      )
    : [];

  const handleDelete = async (id) => {
    try {
      deleteTask(id);
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await getTasks();
      createTaskList(data);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <div className="w-60 flex gap-2 items-center">
          <strong className="text-sm">Status:</strong>
          <ControlledSelect
            value={filter}
            setValue={setFilter}
            options={[
              { status: "All", value: "all" },
              { status: "Pending", value: "false" },
              { status: "Completed", value: "true" },
            ]}
            matchField="value"
            renderField="status"
          />
        </div>
        <ProductForm />
      </div>

      <ProductList tasks={filteredData} handleDelete={handleDelete} />
    </>
  );
};

export default Dashboard;
