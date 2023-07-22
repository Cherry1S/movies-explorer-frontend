import { useState, useEffect, useCallback } from 'react';
import validator from "validator";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (values.email) {
      if (validator.isEmail(values.email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }
  }, [values.email, isEmailValid])


  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, isEmailValid, resetForm, setValues, setIsValid, setErrors };
}
