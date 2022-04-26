import { useRef } from "react";
import useUpdateEffect from "./useUpdateEffect";

const useUpdated = (deps: React.DependencyList): boolean => {
  const isUpdated = useRef(false);

  useUpdateEffect(() => {
    isUpdated.current = true;
  }, deps);

  return isUpdated.current;
};

export default useUpdated;
