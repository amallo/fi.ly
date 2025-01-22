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
    console.info("Accepted files", acceptedFiles)
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
            <p className="font-medium">{file.name}</p>
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

