"use client";
import React, { useState } from "react";
import TextInput from "@/common/form-inputs/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import { taskSchema } from "@/schemas/product-schema";
import { createTask, updateTask } from "@/services/task-service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import SelectInput from "@/common/form-inputs/select-input";
import { useTask } from "@/context/task-context";

function ProductForm({ taskValue = null, mode = "add" }) {
  const { createTaskList, tasks, toggleTask, deleteTask, editTask, addTask } =
    useTask();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(taskSchema),
    values: taskValue
      ? { ...taskValue, completed: taskValue.completed.toString() }
      : {
          title: "",
          completed: "false",
        },
  });

  async function onSubmit(values) {
    try {
      if (mode === "add") {
        const { data } = await createTask({
          ...values,
          completed: values.completed === "true",
        });
        addTask(data);
      } else {
        editTask(taskValue?.id, values.title, values.completed === "true");
      }

      toast.success(
        taskValue ? "Task updated succesfully" : "Task added succesfully"
      );
      form.reset();
      setIsFormModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={16} className="mr-2" /> Add Task
          </Button>
        ) : (
          <Button variant="secondary" size="sm">
            <Pencil size={16} className="mr-2" /> Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-4"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="grid bg-white dark:bg-neutral-700 gap-2 ">
                <TextInput
                  name="title"
                  placeholder="Enter title."
                  label="Title"
                  control={form.control}
                />

                <SelectInput
                  name="completed"
                  placeholder="Select Status"
                  label="Status"
                  control={form.control}
                  options={[
                    { status: "Pending", value: "false" },
                    { status: "Completed", value: "true" },
                  ]}
                  matchField="value"
                  renderField="status"
                />

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                >
                  {mode === "add" ? "Add" : "Update"} Task
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductForm;
