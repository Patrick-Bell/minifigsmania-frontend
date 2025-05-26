import React, { useState, useEffect } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrPrint } from "react-icons/gr";
import { FaCloudUploadAlt, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import axios from 'axios';
import {toast} from 'sonner'

const AdminImageSection = ({ handleImageBack, product }) => {
  const [images, setImages] = useState(product?.images || []); // Dynamically load images from the product prop
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product?.images) {
      setImages(product.images); // Set initial images from the product prop
    }
  }, [product]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
  
    // Create preview URLs
    const newPreviewImages = files.map(file => ({
      id: Math.random().toString(36).substring(2, 15),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      file: file,
      featured: false
    }));
  
    setPreviewImages([...previewImages, ...newPreviewImages]);
  
    // Now send files to your server (Cloudinary upload)
    const formData = new FormData();
    files.forEach(file => formData.append("images[files][]", file));  // Correct the key here
    formData.append("images[product_id]", product.id);  // associate the image with the product
  
    try {
      const response = await fetch("/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
  
      if (response.ok) {
        // After successful upload, update the images with the Cloudinary URL
        const uploadedImages = data.map((img) => ({
          ...img,
          url: img.secure_url, // Assuming Cloudinary returns secure_url
        }));
  
        // Save images to state
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
        setPreviewImages([]); // Clear preview images after successful upload
      } else {
        console.error("Image upload failed:", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setUploading(true);
  
    // Prepare form data to send to the backend
    const formData = new FormData();
  
    // Append each image file to formData (sending multiple files)
    previewImages.forEach((image) => {
      formData.append("images[files][]", image.file);  // Correct the key here
      formData.append("images[product_id]", product.id);  // Assuming product.id is passed in as a prop
    });
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/images`, formData); // No need to wrap in `{ images: formData }`
  
      console.log(response.data);
  
        // Assuming the response contains URLs of the uploaded images
        setImages([...images, ...response.data]); // Save uploaded images URLs to state
        setPreviewImages([]); // Clear preview images
        toast.success('Image(s) uploaded successfully!')
    
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (id) => {
    try {
      // Send a DELETE request to the backend to remove the image
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/images/${id}`);
  
        // Now, remove the image from the preview images (if it was a preview image)
        setPreviewImages(previewImages.filter(img => img.id !== id));

        toast.success('Image removed successfully!')
  
        // If the image was not a preview (it already exists on the server), update the images state
        setImages(images.filter(img => img.id !== id));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  

  const toggleFeatured = (id) => {
    setPreviewImages(previewImages.map(img => 
      img.id === id ? { ...img, featured: !img.featured } : img
    ));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-middle">
        <span className="text-indigo-600 font-bold text-2xl"></span>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
          <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
          <button onClick={() => handleImageBack()} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
        </div>
      </div>    

      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Image Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">View and edit image data for {product?.name}.</p>
      </div>

      <div className="p-6">
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => removeImage(image?.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors mx-1"
                    >
                      <FaTrash />
                    </button>
                    {image.featured ? (
                      <button className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors mx-1">
                        <FaStar />
                      </button>
                    ) : (
                      <button className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors mx-1">
                        <FaRegStar />
                      </button>
                    )}
                  </div>
                  <div className="p-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700 truncate">{image.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload New Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              accept="image/*"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <FaCloudUploadAlt className="text-5xl text-indigo-500 mb-4" />
              <p className="text-lg font-medium text-gray-700">Drag and drop or click to upload</p>
              <p className="text-sm text-gray-500 mt-1">Supports: JPG, PNG, WebP (Max: 5MB each)</p>
            </label>
          </div>

          {/* Displaying Preview Images */}
          {previewImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">New Images to Upload ({previewImages.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {previewImages.map((image) => (
                  <div key={image.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => removeImage(image?.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors mx-1"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => toggleFeatured(image.id)}
                        className={`p-2 ${image.featured ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-full transition-colors mx-1`}
                      >
                        {image.featured ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>
                    <div className="p-2 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-700 truncate">{image.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 border-t border-gray-200 flex justify-end gap-4">
        <button
          onClick={handleImageBack}
          className="border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm p-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={previewImages.length === 0}
          className={`p-2 text-sm rounded-md text-white font-medium transition-colors ${
            previewImages.length === 0
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminImageSection;
