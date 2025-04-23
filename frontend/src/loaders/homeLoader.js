import { defer, redirect } from "react-router-dom";

export async function loader({ request }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const home = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Home data loaded successfully!" });
    }, 2000);
  });

  return defer ({
    home
  });
}