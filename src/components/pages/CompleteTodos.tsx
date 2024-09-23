import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../navbar/Navbar";

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

  if (isLoading) return <div>Loading completed todos...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <section className="flex flex-col gap-6 mt-7">
      <Navbar />
      <div className="font-inter min-h-[242px] flex flex-col gap-4 shadow-custom-shadow mx-4">
        {data?.length ? (
          data.map((todo) => {
            return (
              <div key={todo.id} className="bg-green-300 py-3 px-4">
                <h2 className="h-[200px]">{todo.description}</h2>
                <p>{new Date(todo.created_at).toLocaleDateString("en-GB")}</p>
              </div>
            );
          })
        ) : (
          <div>No completed todos found</div>
        )}
      </div>
    </section>
  );
};

export default CompleteTodos;
