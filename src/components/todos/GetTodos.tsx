import { supabase } from "../../config/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useInputStore } from "../../stores/inputStore";
import importantIcon from "../../assets/icons/star.svg";
import completedIcon from "../../assets/icons/circle.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteicon from "../../assets/icons/delete.svg";
import queryClient from "../../config/queryClient";

type TodoTypes = {
  id: string;
  description: string;
  created_at: string;
};

const GetTodos = () => {
  const user = useUser();
  const [editMenu, setEditMenu] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [showEdit, setShowEdit] = useState<string | null>(null);

  // zustand store
  const { inputValue } = useInputStore();

  // opens by id
  const editMenuHandler = (todoId: string) => {
    setEditMenu(editMenu === todoId ? null : todoId);
  };
  const showEditHandler = (todoId: string) => {
    setShowEdit(showEdit === todoId ? null : todoId);
  };

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("id, description, created_at")
      .eq("user_id", user.user?.id)
      .not("important", "is", true)
      .not("complate", "is", true);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };
  const filterTodosByInput = (todos: TodoTypes[]) => {
    return todos.filter((todo) =>
      todo.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // delete to function
  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase.from("todos").delete().eq("id", todoId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });
  // edit todo function

  const editTodo = useMutation({
    mutationFn: async (todo: {
      id: string;
      newData: { description?: string; completed?: boolean };
    }) => {
      const { error } = await supabase
        .from("todos")
        .update(todo.newData)
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setShowEdit(null);
      setNewTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });

  const completeTodo = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase
        .from("todos")
        .update({ complate: true })
        .eq("id", todoId);
      if (error) throw new Error(error.message);
      console.log(`Todo ${todoId} marked as completed`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error completing todo:", error);
    },
  });

  const markTodoAsImportant = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase
        .from("todos")
        .update({ important: true })
        .eq("id", todoId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error marking todo as important:", error);
    },
  });

  const editHandleClick = (todoId: string, description: string) => {
    if (
      newTitle.trim().toLocaleLowerCase() ===
      description.trim().toLocaleLowerCase()
    ) {
      alert("No changes detected");
      return;
    }

    if (newTitle.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    editTodo.mutate({
      id: todoId,
      newData: { description: newTitle },
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: !!user,
  });


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const filteredTodos = filterTodosByInput(data || []);
  // Format the created_at date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Colors array to alternate between
  const colors = ["#E3EBFC", "#FBF0E4", "#E4F6FC", "#FCE4E4"];

  return (
    <div className="flex flex-col gap-6 mt-7 justify-center items-center xl:justify-start sm:flex-row flex-wrap">
      {filteredTodos?.map((todo, index) => {
        const color = colors[index % colors.length];

        return (
          <div
            key={todo.id}
            className=" min-h-[242px] py-3 px-4 flex flex-col gap-4 shadow-custom-shadow w-[351px] max-w-full"
            style={{ backgroundColor: color }}
          >
            <div className="flex justify-between items-center">
              <div className="bg-white flex items-center gap-2 w-fit py-1 px-3 rounded-[30px]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M7.33332 12.7279C7.14388 12.7279 6.97888 12.6577 6.83832 12.5171C6.69777 12.3765 6.62749 12.2115 6.62749 12.0221C6.62749 11.8327 6.69777 11.668 6.83832 11.528C6.97888 11.3881 7.14388 11.3178 7.33332 11.3172C7.52277 11.3166 7.68777 11.3869 7.82832 11.528C7.96888 11.6692 8.03916 11.8342 8.03916 12.023C8.03916 12.2119 7.96888 12.3765 7.82832 12.5171C7.68777 12.6577 7.52277 12.7279 7.33332 12.7279ZM11 12.7279C10.8105 12.7279 10.6455 12.6577 10.505 12.5171C10.3644 12.3765 10.2942 12.2115 10.2942 12.0221C10.2942 11.8327 10.3644 11.668 10.505 11.528C10.6455 11.3881 10.8105 11.3178 11 11.3172C11.1894 11.3166 11.3544 11.3869 11.495 11.528C11.6355 11.6692 11.7058 11.8342 11.7058 12.023C11.7058 12.2119 11.6355 12.3765 11.495 12.5171C11.3544 12.6577 11.1894 12.7279 11 12.7279ZM14.6667 12.7279C14.4772 12.7279 14.3122 12.6577 14.1717 12.5171C14.0311 12.3765 13.9608 12.2115 13.9608 12.0221C13.9608 11.8327 14.0311 11.668 14.1717 11.528C14.3122 11.3881 14.4772 11.3178 14.6667 11.3172C14.8561 11.3166 15.0211 11.3869 15.1617 11.528C15.3022 11.6692 15.3725 11.8342 15.3725 12.023C15.3725 12.2119 15.3022 12.3765 15.1617 12.5171C15.0211 12.6577 14.8561 12.7279 14.6667 12.7279ZM5.14799 19.25C4.72571 19.25 4.37341 19.1089 4.09107 18.8265C3.80874 18.5442 3.66727 18.1919 3.66666 17.7696V6.06377C3.66666 5.6421 3.80813 5.2901 4.09107 5.00777C4.37402 4.72543 4.72632 4.58396 5.14799 4.58335H6.76957V2.53918H7.75682V4.58335H14.3147V2.53918H15.2313V4.58335H16.8529C17.2746 4.58335 17.6269 4.72482 17.9098 5.00777C18.1928 5.29071 18.3339 5.64302 18.3333 6.06468V17.7696C18.3333 18.1913 18.1922 18.5436 17.9098 18.8265C17.6275 19.1095 17.2749 19.2506 16.852 19.25H5.14799ZM5.14799 18.3334H16.8529C16.9935 18.3334 17.1227 18.2747 17.2407 18.1574C17.3586 18.04 17.4173 17.9105 17.4167 17.7687V9.73135H4.58332V17.7696C4.58332 17.9102 4.64199 18.0394 4.75932 18.1574C4.87666 18.2753 5.00591 18.334 5.14707 18.3334M4.58332 8.81377H17.4167V6.06377C17.4167 5.92321 17.358 5.79396 17.2407 5.67602C17.1233 5.55807 16.9938 5.49941 16.852 5.50002H5.14799C5.00682 5.50002 4.87727 5.55868 4.75932 5.67602C4.64138 5.79335 4.58271 5.92291 4.58332 6.06468V8.81377Z"
                      fill="#252931"
                    />
                    <path
                      d="M5.14799 18.3334H16.8529C16.9935 18.3334 17.1227 18.2747 17.2407 18.1574C17.3586 18.04 17.4173 17.9105 17.4167 17.7687V9.73135H4.58332V17.7696C4.58332 17.9102 4.64199 18.0394 4.75932 18.1574C4.87666 18.2753 5.00591 18.334 5.14707 18.3334M4.58332 8.81377H17.4167V6.06377C17.4167 5.92321 17.358 5.79396 17.2407 5.67602C17.1233 5.55807 16.9938 5.49941 16.852 5.50002H5.14799C5.00682 5.50002 4.87727 5.55868 4.75932 5.67602C4.64138 5.79335 4.58271 5.92291 4.58332 6.06468V8.81377ZM4.58332 8.81377V5.50002M7.33332 12.7279C7.14388 12.7279 6.97888 12.6577 6.83832 12.5171C6.69777 12.3765 6.62749 12.2115 6.62749 12.0221C6.62749 11.8327 6.69777 11.668 6.83832 11.528C6.97888 11.3881 7.14388 11.3178 7.33332 11.3172C7.52277 11.3166 7.68777 11.3869 7.82832 11.528C7.96888 11.6692 8.03916 11.8342 8.03916 12.023C8.03916 12.2119 7.96888 12.3765 7.82832 12.5171C7.68777 12.6577 7.52277 12.7279 7.33332 12.7279ZM11 12.7279C10.8105 12.7279 10.6455 12.6577 10.505 12.5171C10.3644 12.3765 10.2942 12.2115 10.2942 12.0221C10.2942 11.8327 10.3644 11.668 10.505 11.528C10.6455 11.3881 10.8105 11.3178 11 11.3172C11.1894 11.3166 11.3544 11.3869 11.495 11.528C11.6355 11.6692 11.7058 11.8342 11.7058 12.023C11.7058 12.2119 11.6355 12.3765 11.495 12.5171C11.3544 12.6577 11.1894 12.7279 11 12.7279ZM14.6667 12.7279C14.4772 12.7279 14.3122 12.6577 14.1717 12.5171C14.0311 12.3765 13.9608 12.2115 13.9608 12.0221C13.9608 11.8327 14.0311 11.668 14.1717 11.528C14.3122 11.3881 14.4772 11.3178 14.6667 11.3172C14.8561 11.3166 15.0211 11.3869 15.1617 11.528C15.3022 11.6692 15.3725 11.8342 15.3725 12.023C15.3725 12.2119 15.3022 12.3765 15.1617 12.5171C15.0211 12.6577 14.8561 12.7279 14.6667 12.7279ZM5.14799 19.25C4.72571 19.25 4.37341 19.1089 4.09107 18.8265C3.80874 18.5442 3.66727 18.1919 3.66666 17.7696V6.06377C3.66666 5.6421 3.80813 5.2901 4.09107 5.00777C4.37402 4.72543 4.72632 4.58396 5.14799 4.58335H6.76957V2.53918H7.75682V4.58335H14.3147V2.53918H15.2313V4.58335H16.8529C17.2746 4.58335 17.6269 4.72482 17.9098 5.00777C18.1928 5.29071 18.3339 5.64302 18.3333 6.06468V17.7696C18.3333 18.1913 18.1922 18.5436 17.9098 18.8265C17.6275 19.1095 17.2749 19.2506 16.852 19.25H5.14799Z"
                      stroke="#252931"
                      strokeWidth="0.4"
                    />
                  </svg>
                </div>
                <h2 className="font-inter text-sm text-main-blue">
                  {formatDate(todo.created_at)}
                </h2>
              </div>
              {/* three dot */}
              <div className="relative">
                <button onClick={() => editMenuHandler(todo.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="16"
                    viewBox="0 0 4 16"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M3.20208 12.7979C2.88327 12.4791 2.45087 12.3 2 12.3C1.54913 12.3 1.11673 12.4791 0.797918 12.7979C0.479106 13.1167 0.3 13.5491 0.3 14C0.3 14.4509 0.479106 14.8833 0.797918 15.2021C1.11673 15.5209 1.54913 15.7 2 15.7C2.45087 15.7 2.88327 15.5209 3.20208 15.2021C3.52089 14.8833 3.7 14.4509 3.7 14C3.7 13.5491 3.52089 13.1167 3.20208 12.7979ZM3.20208 6.79792C2.88327 6.47911 2.45087 6.3 2 6.3C1.54913 6.3 1.11673 6.47911 0.797918 6.79792C0.479106 7.11673 0.3 7.54913 0.3 8C0.3 8.45087 0.479106 8.88327 0.797918 9.20208C1.11673 9.52089 1.54913 9.7 2 9.7C2.45087 9.7 2.88327 9.52089 3.20208 9.20208C3.52089 8.88327 3.7 8.45087 3.7 8C3.7 7.54913 3.52089 7.11673 3.20208 6.79792ZM3.20208 0.797918C2.88327 0.479106 2.45087 0.3 2 0.3C1.54913 0.3 1.11673 0.479106 0.797918 0.797918C0.479106 1.11673 0.3 1.54913 0.3 2C0.3 2.45087 0.479106 2.88327 0.797918 3.20208C1.11673 3.52089 1.54913 3.7 2 3.7C2.45087 3.7 2.88327 3.52089 3.20208 3.20208C3.52089 2.88327 3.7 2.45087 3.7 2C3.7 1.54913 3.52089 1.11673 3.20208 0.797918Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="0.4"
                    />
                  </svg>
                </button>

                {editMenu === todo.id && (
                  <div className="bg-[#F6F6F7] absolute top-6 right-0 rounded-lg w-[155px] shadow-custom-shadow">
                    <ul className="px-4 py-2 font-inter text-main-blue text-sm flex flex-col gap-2">
                      <li
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => markTodoAsImportant.mutate(todo.id)}
                      >
                        <img src={importantIcon} alt={"icons"} /> Importance
                      </li>
                      <li
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => completeTodo.mutate(todo.id)}
                      >
                        <img src={completedIcon} alt={"icons"} /> Complete
                      </li>
                      <li
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          showEditHandler(todo.id);
                          editMenuHandler(todo.id);
                        }}
                      >
                        <img src={editIcon} alt={"icons"} /> Edit
                      </li>
                      <li
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => deleteTodo.mutate(todo.id)}
                      >
                        <img src={deleteicon} alt={"icons"} /> Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* edit input */}
            {showEdit === todo.id && (
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Edit todo ..."
                  className="font-inter text-sm text-main-blue px-2"
                />
                <button
                  className="bg-white rounded-md px-2 font-inter text-sm text-main-blue"
                  onClick={() => editHandleClick(todo.id, todo.description)}
                >
                  Edit
                </button>
              </div>
            )}

            <p className="font-inter text-sm text-main-blue">
              {editTodo.isError && <div>Error: {editTodo.error.message}</div>}
              {todo.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GetTodos;
