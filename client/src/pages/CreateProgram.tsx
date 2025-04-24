import { useState } from "react";
import { ProgramCreate } from "../types";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { createProgram } from "../services/proramService";

export default function CreateProgram() {
  const [formData, setFormData] = useState<ProgramCreate>({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError("Program name is required");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    setSuccess(false);
    
    try {
      await createProgram(formData);
      setSuccess(true);
      setFormData({ name: "", description: "" }); // Reset form on success
    } catch (error) {
      setError("Failed to create program. Please try again.");
      console.error("Program creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-mono text-black">
      <div className="border border-black p-4 mb-6 bg-white">
        <h1 className="text-2xl font-bold mb-2">Create New Health Program</h1>
        <p className="text-sm mb-4">Enter program details below</p>
        
        {error && (
          <div className="border border-black p-2 mb-4 bg-black text-white">
            Error: {error}
          </div>
        )}
        
        {success && (
          <div className="border border-black p-2 mb-4 bg-green-100">
            ✓ Program created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-black p-4 bg-gray-50">
            <FormInput
              label="Program Name *"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Diabetes Management"
            />
          </div>

          <div className="border border-black p-4 bg-gray-50">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-black px-3 py-2 bg-white font-mono"
              rows={5}
              placeholder="Enter program description (optional)"
            ></textarea>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button 
              type="submit" 
              text={isSubmitting ? "Creating..." : "Create Program"} 
              disabled={isSubmitting || !formData.name.trim()}
              
            />
            <span className="text-sm text-gray-600">* Required field</span>
          </div>
        </form>
      </div>
    </div>
  );
}