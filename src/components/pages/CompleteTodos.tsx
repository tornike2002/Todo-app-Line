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
  complate: boolean;
}

const CompleteTodos = () => {
  const user = useUser();

  // Fetch completed todos
  const fetchCompletedTodos = async () => {
    if (!user.user?.id) {
      return [];
    }

    const { data, error } = await supabase
      .from("todos")
      .select("id, description, created_at, complate")
      .eq("user_id", user.user?.id)
      .eq("complate", true);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // query data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["completedTodos"],
    queryFn: fetchCompletedTodos,
    enabled: !!user.user?.id,
  });

  const deleteTodoMutation = useMutation<void, Error, TodoTypes>({
      mutationFn: async (todo: TodoTypes) => {
        const { error } = await supabase
          .from("todos")
          .delete()
          .eq("id", todo.id)
          .eq("user_id", user.user?.id);
    
        if (error) {
          throw new Error(error.message);
        }
        return; // Explicitly return void here
      },
      onSuccess: () => {
        // Refetch the todos list after deletion
        queryClient.invalidateQueries({ queryKey: ["completedTodos"] });
      },
    });
  

  if (isLoading) return <div>Loading completed todos...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <section className="xl:flex xl:w-full">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div
          className="font-inter flex flex-col sm:flex-row justify-center  items-center 
          xl:justify-start gap-4 mx-4 flex-wrap mt-6"
        >
          {data?.length ? (
            data.map((todo: TodoTypes) => {
              return (
                <div
                  key={todo.id}
                  className="bg-green-300 py-3 px-4  min-h-[242px] w-[341px] shadow-custom-shadow rounded-md"
                >
                  <button
                    className="font-inter font-medium text-red-500"
                    onClick={() => deleteTodoMutation.mutate(todo)}
                  >
                    X
                  </button>
                  <h2 className="h-[200px]">{todo.description}</h2>
                  <p>{new Date(todo.created_at).toLocaleDateString("en-GB")}</p>
                </div>
              );
            })
          ) : (
            <div>No completed todos found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompleteTodos;
