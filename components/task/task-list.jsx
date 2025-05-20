import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Trash } from "lucide-react";
import { Button } from "../ui/button";
import ProductForm from "./task-form";

function ProductList({ tasks, handleDelete }) {
  console.log('tass: ',tasks)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-6">
      {tasks &&
        Array.isArray(tasks) &&
        tasks.map((task) => (
          <Card key={task.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{task?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={`
            ${
              task.completed
                ? "border-green-300 bg-green-200 text-green-800 "
                : "border-yellow-300 bg-yellow-200 text-yellow-800 "
            } 
            font-medium border capitalize  py-1 px-3 text-sm rounded inline-block
          `}
              >
                 {task.completed ? "Completed" : "Pending"}
              </p>

              <div className="flex gap-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-2" /> View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Task Details</DialogTitle>
                    </DialogHeader>
                    <p>
                      <strong>Title:</strong> {task.title}
                    </p>

                    <p
                      className={`
            ${
              task.completed
                ? "border-green-300 bg-green-200 text-green-800 "
                : "border-yellow-300 bg-yellow-200 text-yellow-800 "
            } 
            font-medium border capitalize  p-2 text-sm rounded
          `}
                    >
                      <strong>Status:</strong>{" "}
                      {task.completed ? "Completed" : "Pending"}
                    </p>
                  </DialogContent>
                </Dialog>

                <ProductForm taskValue={task} mode="edit" />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash size={16} className="mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default ProductList;
