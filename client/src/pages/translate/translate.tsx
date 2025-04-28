import React, { useState } from 'react';
import { FaArrowLeft, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TranslatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [detectedImageUrl, setDetectedImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setDetectedImageUrl(null); // Reset previous result
    }
  };

  const handleTranslateClick = async () => {
    if (!selectedImage) {
      toast.error('Vui lòng chọn hình ảnh trước!', { autoClose: 2000 });
      return;
    }

    setIsTranslating(true);
    toast.info('Đang xử lý...', { autoClose: false });

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/api/translate/detect/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // If you need auth
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Không thể dịch ảnh.');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDetectedImageUrl(imageUrl);
      toast.dismiss();
      toast.success('Dịch thành công!', { autoClose: 2000 });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Đã xảy ra lỗi khi dịch ảnh.', { autoClose: 3000 });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-hero-gradient min-h-screen p-8">
      {/* Nút Quay lại */}
      <div className="mb-4">
        <button
          className="text-white bg-[#00DFA8] rounded-full p-2 w-12 h-12 flex items-center justify-center transition duration-300 hover:bg-[#00C29D]"
          onClick={() => navigate('/main')}
        >
          <FaArrowLeft className="text-white w-6 h-6" /> 
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col">
        <h1 className="text-6xl font-bold text-yellow-500 mb-8">Dịch Hán-Nôm - Việt</h1>
        <p className="text-white mb-12 text-lg">Sử dụng AI để chuyển đổi, nhận diện chữ Hán-Nôm, Việt</p>

        {/* Upload Section */}
        <div className="flex w-full space-x-8 mb-10 justify-center">
          <div className="flex w-full flex-col">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-md p-4 mt-4 shadow-md flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer"
            >
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 20m32-12l-3.172 3.172a4 4 0 01-5.656 0L28 16M8 20l9.172 9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <label htmlFor="upload-photo" className="cursor-pointer mt-2 block text-sm text-gray-700">
                  <span className="font-semibold">Thêm hình ảnh</span> ngữ liệu Hán-Nôm của bạn vào đây
                </label>
                <input type="file" name="photo" id="upload-photo" className="sr-only" accept="image/*" onChange={handleFileChange} />
              </div>
            </motion.div>
            <div className="flex justify-center space-x-8 mt-8">
              {/* Preview original uploaded image */}
              {selectedImage && (
                <div className="text-center">
                  <p className="text-white mb-2">Ảnh gốc:</p>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-w-xs mx-auto rounded-md"
                  />
                </div>
              )}
              {/* Hiển thị ảnh đã nhận diện */}
              {detectedImageUrl && (
                <div className="text-center">
                  <p className="text-white mb-2">Ảnh sau khi dịch:</p>
                  <img
                    src={detectedImageUrl}
                    alt="Detected"
                    className="max-w-2xl mx-auto rounded-md border-4 border-green-400"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dịch Button */}
        <motion.div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#00DFA8] hover:bg-[#00C29D] text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ${isTranslating ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleTranslateClick}
            disabled={isTranslating}
          >
            {isTranslating ? (
              <Oval height={20} width={20} color="#fff" ariaLabel="loading" visible={true} />
            ) : (
              'Dịch'
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Nút chuyển hướng đến trang history */}
      <button
        className="fixed bottom-8 right-8 text-white bg-[#00DFA8] rounded-full p-4 shadow-lg transition duration-300 hover:bg-[#00C29D] cursor-pointer" 
        onClick={() => navigate('/translation-history')}
      >
        <FaHistory className="w-6 h-6" />
      </button>

      <ToastContainer />
    </div>
  );
};

export default TranslatePage;