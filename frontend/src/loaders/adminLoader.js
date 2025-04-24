import { defer } from "react-router-dom";

export async function loader({ request }) {
  const adminLayout = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Data loaded successfully!" });
    }, 100);
  });

  return defer ({
    adminLayout
  });
};
