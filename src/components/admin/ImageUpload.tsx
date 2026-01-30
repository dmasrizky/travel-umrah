'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  disabled
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB
        alert("File size too large (max 2MB)");
        return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.url) {
            onChange(data.url);
        } else {
            alert("Upload failed");
        }
    } catch (error) {
        console.error("Upload error", error);
        alert("Upload error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition">
      
      {value ? (
        <div className="relative w-full h-48 aspect-video rounded-md overflow-hidden">
             <div className="absolute top-2 right-2 z-10">
                <button 
                  type="button" 
                  onClick={() => onChange('')}
                  className="bg-red-500 text-white p-1 rounded-full text-xs px-2 hover:bg-red-600"
                >
                    Remove
                </button>
             </div>
             <Image 
                fill 
                className="object-cover" 
                alt="Image" 
                src={value} 
             />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
            {loading ? (
                <p className="text-sm text-gray-500">Uploading...</p>
            ) : (
                <>
                    <label className="cursor-pointer">
                        <span className="bg-brand-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-green/90">
                            Upload Image
                        </span>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={onUpload}
                            disabled={disabled || loading}
                        />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Max file size: 2MB</p>
                </>
            )}
        </div>
      )}
      {/* Hidden input to store the URL for form submission if needed, 
          though usually we manipulate the parent form state */}
      <input type="hidden" name="imageUrl" value={value} /> 
    </div>
  );
}
