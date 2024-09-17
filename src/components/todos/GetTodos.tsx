import { supabase } from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";

const GetTodos = () => {
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("id, description, created_at");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

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
    <div className="flex flex-col gap-6 mt-7">
      {data?.slice(0, 5)?.map((todo, index) => {
        const color = colors[index % colors.length];

        return (
          <div
            key={todo.id}
            className="w-full min-h-[242px] py-3 px-4 flex flex-col gap-4"
            style={{ backgroundColor: color }}
          >
            <div className="bg-white flex items-center gap-2 w-fit py-1 px-3 rounded-[30px]">
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
                  stroke-width="0.4"
                />
              </svg>
              <h2 className="font-inter text-sm text-main-blue">
                {formatDate(todo.created_at)}
              </h2>
            </div>
            <p className="font-inter text-sm text-main-blue">
              {todo.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GetTodos;