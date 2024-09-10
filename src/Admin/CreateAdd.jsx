import React, { useState } from "react";

const CreateAdd = () => {
  const [addImage, setAddImage] = useState(null); // To store the selected image
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the image file is selected
    if (!addImage) {
      alert("Please select an image.");
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append("AddImage", addImage); // Image file
    formData.append("startTime", starttime); // Start time
    formData.append("endTime", endtime); // End time

    try {
      setLoading(true);
      const response = await fetch("/v1/adds/create", {
        method: "GET",
        body: formData, // Send FormData object
      });

      const result = await response.json();
      if (response.ok) {
        alert("Ad created successfully!");
      } else {
        alert("Error creating ad: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create the ad.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleImageChange = (e) => {
    setAddImage(e.target.files[0]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Advertisement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Add Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

        {/* Start Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* End Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdd;
