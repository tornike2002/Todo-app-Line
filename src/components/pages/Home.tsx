import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { supabase } from "../../config/supabase";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../config/queryClient";
import GetTodos from "../todos/GetTodos";

type TodoTypes = {
  description: string;
};
const Home = () => {
  const [board, setBoard] = useState(false);
  const [todoData, setTodoData] = useState<TodoTypes[]>([]);
  const [taskInfo, setTaskInfo] = useState("");
  const currentDateTime = new Date().toISOString();
  const boardToggle = () => {
    setBoard((val) => !val);
  };
  // text area value
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInfo(e.target.value);
  };
  // adding task
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskInfo.trim()) {
      const newTask = { description: taskInfo };
      setTodoData((prev) => [
        ...prev,
        { ...newTask, created_at: currentDateTime },
      ]);
      mutation.mutate();
      setTaskInfo("");
    }
  };

  const addTodoToSupabase = async () => {
    const { data, error } = await supabase.from("todos").insert(todoData);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };
  // mutation
  const mutation = useMutation({
    mutationFn: addTodoToSupabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      console.error("Error adding todo:", error.message);
    },
  });

  return (
    <div>
      <Navbar />
      {/* add task button */}
      <section className="px-4 mt-[32px]">
        <button
          type="button"
          className="font-inter text-base leading-6 text-main-blue rounded-lg
         shadow-custom-shadow py-[10px] px-[14px] w-full text-left"
          onClick={boardToggle}
        >
          <span className="text-2xl">{board === false ? "+" : "-"}</span> Add a
          task
        </button>
        {/* board */}

        {board && (
          <form
            className="w-full rounded-lg flex flex-col gap-3 shadow-custom-shadow p-3 mt-11"
            onSubmit={addTask}
          >
            <h1 className="font-inter leading-6 text-light-grey">Task</h1>
            <textarea
              className="h-32 p-1 text-main-blue font-inter text-sm leading-5"
              placeholder="Write a task..."
              value={taskInfo}
              onChange={handleChange}
            ></textarea>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-inter text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M5 11.885C4.79333 11.885 4.61333 11.8083 4.46 11.655C4.30667 11.5017 4.23 11.3217 4.23 11.115C4.23 10.9083 4.30667 10.7287 4.46 10.576C4.61333 10.4233 4.79333 10.3467 5 10.346C5.20667 10.3453 5.38667 10.422 5.54 10.576C5.69333 10.73 5.77 10.91 5.77 11.116C5.77 11.322 5.69333 11.5017 5.54 11.655C5.38667 11.8083 5.20667 11.885 5 11.885ZM9 11.885C8.79333 11.885 8.61333 11.8083 8.46 11.655C8.30667 11.5017 8.23 11.3217 8.23 11.115C8.23 10.9083 8.30667 10.7287 8.46 10.576C8.61333 10.4233 8.79333 10.3467 9 10.346C9.20667 10.3453 9.38667 10.422 9.54 10.576C9.69333 10.73 9.77 10.91 9.77 11.116C9.77 11.322 9.69333 11.5017 9.54 11.655C9.38667 11.8083 9.20667 11.885 9 11.885ZM13 11.885C12.7933 11.885 12.6133 11.8083 12.46 11.655C12.3067 11.5017 12.23 11.3217 12.23 11.115C12.23 10.9083 12.3067 10.7287 12.46 10.576C12.6133 10.4233 12.7933 10.3467 13 10.346C13.2067 10.3453 13.3867 10.422 13.54 10.576C13.6933 10.73 13.77 10.91 13.77 11.116C13.77 11.322 13.6933 11.5017 13.54 11.655C13.3867 11.8083 13.2067 11.885 13 11.885ZM2.616 19C2.15533 19 1.771 18.846 1.463 18.538C1.155 18.23 1.00067 17.8457 1 17.385V4.61499C1 4.15499 1.15433 3.77099 1.463 3.46299C1.77167 3.15499 2.156 3.00066 2.616 2.99999H4.385V0.769989H5.462V2.99999H12.616V0.769989H13.616V2.99999H15.385C15.845 2.99999 16.2293 3.15432 16.538 3.46299C16.8467 3.77166 17.0007 4.15599 17 4.61599V17.385C17 17.845 16.846 18.2293 16.538 18.538C16.23 18.8467 15.8453 19.0007 15.384 19H2.616ZM2.616 18H15.385C15.5383 18 15.6793 17.936 15.808 17.808C15.9367 17.68 16.0007 17.5387 16 17.384V8.61599H2V17.385C2 17.5383 2.064 17.6793 2.192 17.808C2.32 17.9367 2.461 18.0007 2.615 18M2 7.61499H16V4.61499C16 4.46166 15.936 4.32066 15.808 4.19199C15.68 4.06332 15.5387 3.99932 15.384 3.99999H2.616C2.462 3.99999 2.32067 4.06399 2.192 4.19199C2.06333 4.31999 1.99933 4.46132 2 4.61599V7.61499Z"
                    fill="#252931"
                  />
                  <path
                    d="M2.616 18H15.385C15.5383 18 15.6793 17.936 15.808 17.808C15.9367 17.68 16.0007 17.5387 16 17.384V8.61599H2V17.385C2 17.5383 2.064 17.6793 2.192 17.808C2.32 17.9367 2.461 18.0007 2.615 18M2 7.61499H16V4.61499C16 4.46166 15.936 4.32066 15.808 4.19199C15.68 4.06332 15.5387 3.99932 15.384 3.99999H2.616C2.462 3.99999 2.32067 4.06399 2.192 4.19199C2.06333 4.31999 1.99933 4.46132 2 4.61599V7.61499ZM2 7.61499V3.99999M5 11.885C4.79333 11.885 4.61333 11.8083 4.46 11.655C4.30667 11.5017 4.23 11.3217 4.23 11.115C4.23 10.9083 4.30667 10.7287 4.46 10.576C4.61333 10.4233 4.79333 10.3467 5 10.346C5.20667 10.3453 5.38667 10.422 5.54 10.576C5.69333 10.73 5.77 10.91 5.77 11.116C5.77 11.322 5.69333 11.5017 5.54 11.655C5.38667 11.8083 5.20667 11.885 5 11.885ZM9 11.885C8.79333 11.885 8.61333 11.8083 8.46 11.655C8.30667 11.5017 8.23 11.3217 8.23 11.115C8.23 10.9083 8.30667 10.7287 8.46 10.576C8.61333 10.4233 8.79333 10.3467 9 10.346C9.20667 10.3453 9.38667 10.422 9.54 10.576C9.69333 10.73 9.77 10.91 9.77 11.116C9.77 11.322 9.69333 11.5017 9.54 11.655C9.38667 11.8083 9.20667 11.885 9 11.885ZM13 11.885C12.7933 11.885 12.6133 11.8083 12.46 11.655C12.3067 11.5017 12.23 11.3217 12.23 11.115C12.23 10.9083 12.3067 10.7287 12.46 10.576C12.6133 10.4233 12.7933 10.3467 13 10.346C13.2067 10.3453 13.3867 10.422 13.54 10.576C13.6933 10.73 13.77 10.91 13.77 11.116C13.77 11.322 13.6933 11.5017 13.54 11.655C13.3867 11.8083 13.2067 11.885 13 11.885ZM2.616 19C2.15533 19 1.771 18.846 1.463 18.538C1.155 18.23 1.00067 17.8457 1 17.385V4.61499C1 4.15499 1.15433 3.77099 1.463 3.46299C1.77167 3.15499 2.156 3.00066 2.616 2.99999H4.385V0.769989H5.462V2.99999H12.616V0.769989H13.616V2.99999H15.385C15.845 2.99999 16.2293 3.15432 16.538 3.46299C16.8467 3.77166 17.0007 4.15599 17 4.61599V17.385C17 17.845 16.846 18.2293 16.538 18.538C16.23 18.8467 15.8453 19.0007 15.384 19H2.616Z"
                    stroke="#252931"
                    strokeWidth="0.4"
                  />
                </svg>
                <h2>{currentDateTime}</h2>
              </div>

              <button
                type="submit"
                className="font-inter text-main-blue font-medium leading-6"
              >
                Add
              </button>
            </div>
          </form>
        )}
        <GetTodos />
      </section>
    </div>
  );
};

export default Home;
