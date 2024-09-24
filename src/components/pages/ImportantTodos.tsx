import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../navbar/Navbar";
import SideBar from "../navbar/SideBar";
import queryClient from "../../config/queryClient";

interface TodoTypes {
  id: string;
  description: string;
  created_at: string;
  important: boolean;
}

const ImportantTodos = () => {
  const user = useUser();

  const fetchImportantTodos = async () => {
    if (!user.user?.id) {
      return [];
    }

    const { data, error } = await supabase
      .from("todos")
      .select("id, description, created_at, important")
      .eq("user_id", user.user?.id)
      .eq("important", true);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // React Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["importantTodos"],
    queryFn: fetchImportantTodos,
    enabled: !!user.user?.id,
  });

  // Mutation to delete an important todo
  const deleteImportantTodoMutation = useMutation<void, Error, TodoTypes>({
    mutationFn: async (todo: TodoTypes) => {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", todo.id)
        .eq("user_id", user.user?.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
 
      queryClient.invalidateQueries({ queryKey: ["importantTodos"] });
    },
  });

  if (isLoading) return <div>Loading important todos...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <section className="xl:flex">
      <SideBar />
      <div className="flex flex-col gap-6 w-full">
        <Navbar />
        <div
          className="font-inter flex flex-col sm:flex-row justify-center items-center 
          xl:justify-start gap-4 mx-4 flex-wrap mt-6"
        >
          {data?.length ? (
            data.map((todo: TodoTypes) => (
              <div
                key={todo.id}
                className="bg-yellow-300 py-3 px-4 min-h-[242px] w-[333px] shadow-custom-shadow rounded-md"
              >
                <button
                  className="font-inter font-medium text-red-500"
                  onClick={() => deleteImportantTodoMutation.mutate(todo)}
                >
                  X
                </button>
                <h2 className="h-[200px]">{todo.description}</h2>
                <p>{new Date(todo.created_at).toLocaleDateString("en-GB")}</p>
              </div>
            ))
          ) : (
            <div>No important todos found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImportantTodos;
