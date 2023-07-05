import { useEffect } from "react";

const CssStruct = ({ children }) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--testcolor", "#9BFF3D");
  }, []);

  return children;
};
export default CssStruct;
