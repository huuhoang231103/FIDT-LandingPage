import { useState } from "react";
import { SendMail } from "../services/sendMail";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmitError("");

    const result = await SendMail(formData);

    setIsLoading(false);
    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSubmitError(result.message || "Gửi email thất bại");
    }
  };

  return {
    formData,
    isLoading,
    isSubmitted,
    errors,
    submitError,
    handleSubmit,
    handleChange
  };
};
