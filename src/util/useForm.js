import { useState, useCallback } from "react";

const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  return [values, handleChange];
};

export default useForm;
