"use client"
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCases } from "@/context/usecase.provider";
import { useRouter } from "next/navigation";

export default function NewVideoScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useCases();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;
    const filePath = URL.createObjectURL(file);
    console.info("Ready to upload", filePath);
    
    try {
      setIsUploading(true);
      await uploadFile({
        sourcePath: filePath,
        type: "video",
        title: file.name,
        targetFolderId: "1"
      });
      router.push("/");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter une nouvelle vidéo</h1>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div>
            <p className="text-gray-700">Fichier sélectionné:</p>
            <div className="flex  justify-between">
            <input
                type="text" 
                defaultValue={file.name}
                className="text-blue-500 bg-blue-50 font-medium border rounded px-2 py-1 w-full mr-2"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700">
              {isDragActive ? 
                'Déposez la vidéo ici...' : 
                'Glissez et déposez une vidéo ici, ou cliquez pour sélectionner'
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Formats acceptés: MP4, MOV, AVI
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`mt-6 w-full rounded-md px-4 py-2 text-white font-medium
          ${!file || isUploading ? 
            'bg-gray-400 cursor-not-allowed' : 
            'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isUploading ? 'Upload en cours...' : 'Lancer l\'upload'}
      </button>
    </div>
  );
}

