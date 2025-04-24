import { useState } from "react";
import { ClientCreate } from "../types";
import { createClient } from "../services/clientService";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function RegisterClient() {
  const [formData, setFormData] = useState<ClientCreate>({
    full_name: "",
    age: 0,
    gender: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.age || formData.age <= 0) {
      newErrors.age = "Valid age is required";
    } else if (formData.age > 120) {
      newErrors.age = "Age must be below 120";
    }
    
    if (!formData.gender) {
      newErrors.gender = "Gender selection is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Handle number type conversion
    const processedValue = type === "number" ? (value ? parseInt(value) : 0) : value;
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      await createClient(formData);
      setSuccess(true);
      // Reset form data
      setFormData({
        full_name: "",
        age: 0,
        gender: "",
        email: "",
      });
    } catch (error) {
      setErrors({ form: "Failed to register client. Please try again." });
      console.error("Client creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    // Validate this specific field on blur
    const fieldErrors: Record<string, string> = {};
    
    if (name === "full_name" && !formData.full_name.trim()) {
      fieldErrors.full_name = "Full name is required";
    }
    
    if (name === "email") {
      if (!formData.email.trim()) {
        fieldErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        fieldErrors.email = "Invalid email format";
      }
    }
    
    if (name === "age") {
      if (!formData.age || formData.age <= 0) {
        fieldErrors.age = "Valid age is required";
      } else if (formData.age > 120) {
        fieldErrors.age = "Age must be below 120";
      }
    }
    
    if (name === "gender" && !formData.gender) {
      fieldErrors.gender = "Gender selection is required";
    }
    
    setErrors(prev => ({...prev, ...fieldErrors}));
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-mono text-black">
      <h1 className="text-2xl font-bold mb-4">Register New Client</h1>
      
      {errors.form && (
        <div className="border border-black p-2 mb-4 bg-black text-white">
          {errors.form}
        </div>
      )}
      
      {success && (
        <div className="border border-black p-2 mb-4">
          ✓ Client registered successfully.
        </div>  
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormInput
            label="Full Name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.full_name && (
            <p className="text-sm mt-1">{errors.full_name}</p>
          )}
        </div>
        
        <div>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && (
            <p className="text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <FormInput
            label="Age"
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            onBlur={handleBlur}
           
          />
          {errors.age && (
            <p className="text-sm mt-1">{errors.age}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-black px-2 py-1"
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <Button 
          type="submit" 
          text={isSubmitting ? "Registering..." : "Register Client"} 
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}