import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    navigate("/login");
  }

  return children;
};
