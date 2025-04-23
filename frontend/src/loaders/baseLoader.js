import { defer } from "react-router-dom";

export async function loader({ request }) {
  const baseLayout = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Data loaded successfully!" });
    }, 2000);
  });

  return defer ({
    baseLayout
  });
};
