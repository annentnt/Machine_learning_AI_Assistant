import React, { useState } from 'react';
import { FaArrowsAltH, FaClipboard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaHistory } from 'react-icons/fa';

const TranslatePage: React.FC = () => {
  const navigate = useNavigate();
  const [sourceLanguage, setSourceLanguage] = useState('Tiếng Việt');
  const [targetLanguage, setTargetLanguage] = useState('Hán - Nôm');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText('');
  };

  const handleTranslateClick = async () => {
    if (!inputText.trim()) {
      toast.error('Vui lòng nhập văn bản trước khi dịch!', { autoClose: 2000 });
      return;
    }
    setIsTranslating(true);
    toast.info('Đang dịch...', { autoClose: false });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTranslatedText(`Đây là bản dịch từ "${inputText}" sang ${targetLanguage}`);
    setIsTranslating(false);
    toast.dismiss();
    toast.success('Dịch thành công!', { autoClose: 2000 });
  };

  const handleCopyClick = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      toast.success('Đã sao chép bản dịch!', { autoClose: 1000 });
    } else {
      toast.warn('Không có gì để sao chép!', { autoClose: 1000 });
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
        <h1 className="text-6xl font-bold text-yellow-500 mb-8">Dịch Hán - Nôm - Việt</h1>
        <p className="text-white mb-12 text-lg">Sử dụng AI để chuyển đổi, nhận diện chữ Hán, Nôm, Việt</p>

        <div className="flex w-full space-x-4 mb-8">
          <div className="w-1/2 relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded-md shadow leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option>Tiếng Việt</option>
              <option>Hán - Nôm</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center"
          >
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              onClick={handleSwapLanguages}
            >
              <FaArrowsAltH />
            </button>
          </motion.div>
          <div className="w-1/2 relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded-md shadow leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option>Hán - Nôm</option>
              <option>Tiếng Việt</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="flex w-full space-x-4 mb-8">
          <div className="w-1/2 flex flex-col">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-md p-4 mt-4 shadow-md flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer"
            >
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 20m32-12l-3.172 3.172a4 4 0 01-5.656 0L28 16M8 20l9.172 9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <label htmlFor="upload-photo" className="cursor-pointer mt-2 block text-sm text-gray-700">
                  <span className="font-semibold">Thêm hình ảnh</span> từ ngữ liệu của bạn vào đây
                </label>
                <input type="file" name="photo" id="upload-photo" className="sr-only" />
              </div>
            </motion.div>
            <textarea
              placeholder="Viết/Dán văn bản của bạn tại đây..."
              className="w-full bg-white rounded-lg p-4 resize-y h-64 shadow-inner text-gray-800 mt-4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <div className="relative">
              <textarea
                placeholder="Bản dịch sẽ hiển thị ở đây..."
                className="w-full bg-[#389893] rounded-md p-4 resize-y h-64 shadow-inner text-white focus:outline-none pr-10" // Thêm pr-10 để có chỗ cho icon
                value={translatedText}
                readOnly
              />
              {translatedText && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-2 right-2 bg-[#00DFA8] hover:bg-[#00C29D] text-white font-bold p-2 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
                  onClick={handleCopyClick}
                >
                  <FaClipboard />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <motion.div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#00DFA8] hover:bg-[#00C29D] text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ${isTranslating ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleTranslateClick}
            disabled={isTranslating}
          >
            {isTranslating ? (
              <Oval
                height={20}
                width={20}
                color="#fff"
                ariaLabel="loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              'Dịch'
            )}
          </motion.button>
        </motion.div>
      </div>
      {/* Nút chuyển hướng đến trang rewrite history */}
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