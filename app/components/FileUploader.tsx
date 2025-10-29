import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    selectedFile?: File | null;
}

const FileUploader = ({ onFileSelect, selectedFile }: FileUploaderProps) => {
    const maxFileSize = 10 * 1024 * 1024; // 10 MB

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        // Pass the selected file to the parent component (upload.tsx)
        onFileSelect?.(file);
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, maxSize: maxFileSize, accept: { 'application/pdf': ['.pdf'] } });

    // Use selectedFile prop instead of acceptedFiles to display the file
    const file = selectedFile;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className='uploader-selected-file' onClick={e => e.stopPropagation()}> {/* Prevent triggering onDrop again */}
                            <img src="/images/pdf.png" alt="pdf" className='size-10' />
                            {/* Selected File Info */}
                            <div className='flex flex-col items-baseline ml-5 grow'>
                                <p className="text-sm text-gray-700 font-medium truncate max-w-xs">{file.name}</p>
                                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                            </div>

                            {/* Remove button */}
                            <button type="button" className='p-2 cursor-pointer' onClick={() => onFileSelect?.(null)}>
                                <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className='size-20' />
                            </div>
                            <p className="text-lg text-gray-500"><span className='font-semibold'>Click to upload</span> or drag and drop a file</p>
                            <p className="text-lg text-gray-500">PDF (max. {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader