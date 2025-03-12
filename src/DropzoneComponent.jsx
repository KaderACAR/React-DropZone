import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import './app.css'

const DropzoneComponent = () => {
  const [files, setFiles] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
        "text/html": [".html", ".htm"],
        "application/pdf": [".pdf"],
        "text/plain": [".txt"],
        "application/msword": [".doc", ".docx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "video/*": [".mp4", ".mov", ".avi"],
      },
      maxSize: 20 * 1024 * 1024,

      onDrop: (acceptedFiles) => {  // burası benim önizleme yapma kısmım
        setFiles([
          ...files,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              url: URL.createObjectURL(file),
            })
          ),
        ]);
      },
    });

  const removeFile = (fileName) => { // burası benim dosya silme kısmım
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex flex-col item-center min-h-screen w-full bg-[url('https://img.freepik.com/premium-photo/cloth-beautiful-background-hd-hd-8k-wallpaper-stock-photographic-image_890746-95984.jpg')] bg-cover bg-center bg-no-repeat " >
      <div className="flex flex-col items-center min-h-screen  ">
      <h1 className="text-center m-5 my-10 text-2xl font-semibold text-[#501717]">
        <em className="text-[#ff6d00] text-6xl font-semibold shimmer-effect ">React Dropzone</em>
      </h1>
      <div
        {...getRootProps()}
        className={`w-full max-w-xl border-2 border-dashed m-5 p-6 rounded-lg text-center cursor-pointer transition 
        ${
          isDragActive
            ? "border-white-500 bg-white-100"
            : "border-[#ff6d00] bg-white"
        } 
        hover:border-[#e5b6a3] hover:bg-[#e5b6a3] transition`}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p className="text-lg text-red-700">Dosyaları buraya bırakın... </p>
        ) : (
          <div className="flex flex-col items-center">
            <IoMdCloudUpload size="5rem" className="text-[#ff5400]" />
            <p className="text-lg text-gray-700">
              Sürükle bırak yapın veya dosya seçin
            </p>
          </div>
        )}

        <em className="block mt-2 text-sm text-gray-500">
          (Yalnızca JPEG, PNG, PDF, TXT, DOC, DOCX, MP4, MOV, AVI dosyaları
          yüklenebilir)
        </em>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-0  text-[#ff5400] ">
          <h4 className="text-lg font-semibold border-b-2">Yüklenen Dosyalar:</h4>
          <ul className="mt-2 space-y-1">
            {files.map((file) => (
              <li key={file.name} className="text-lg flex items-center gap-3">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-[#ff5400] ">
                  {file.preview ? <img src={file.preview} alt={file.name} className="w-12 h-12 " /> : file.name}
                </a>
                <button
                  onClick={() => removeFile(file.name)}
                  className="flex flex-col text-red-400 hover:text-red-700 transition"
                >
                  <MdDelete size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default DropzoneComponent;
