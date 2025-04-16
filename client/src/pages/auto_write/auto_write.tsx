import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHistory } from 'react-icons/fa';

const AutoWrite: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem('accessToken');  // Assuming the token is stored in localStorage
  }

  const handleButtonClick = async () => {
    if (showTryAgain) {
      setResult(null);
      setShowResult(false);
      setShowTryAgain(false);
    }

    

    if (!originalText.trim()) {
      toast.error('Vui lòng nhập văn bản gốc trước khi viết lại!', { autoClose: 2000 });
      return;
    }
  
    setIsLoading(true);
    toast.info('Đang xử lý yêu cầu...', { autoClose: 2000 });
  
    try {
      const token = getToken();
      if (!token) {
        toast.error('Vui lòng đăng nhập trước!', { autoClose: 2000 });
        return;
      }
      const response = await fetch('http://localhost:8000/api/writing_assistant/rewrite/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          original_content: originalText,
          instructions: descriptionText,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setResult(data.rewritten_content);  // dữ liệu trả về từ backend
        setShowResult(true);
        setShowTryAgain(true);
        toast.success('Đã viết lại thành công!', { autoClose: 1000 });
      } else {
        toast.error(data.error || 'Lỗi xử lý!', { autoClose: 2000 });
      }
    } catch (error) {
      toast.error('Lỗi kết nối máy chủ!', { autoClose: 2000 });
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const handleCopyClick = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success('Đã sao chép kết quả!', { autoClose: 1000 });
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
      <div className="max-w-6xl mx-auto flex">
        <div className="w-1/2 p-0.5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <h1 className="text-4xl font-bold text-yellow-500 mr-4">Viết lại nội dung</h1>
            </div>
            <p className="text-white mb-4">Sử dụng AI có thể giúp bạn viết bất kỳ nội dung nào bạn muốn</p>

            <div className="mb-4">
              <label className="text-yellow-500 block mb-2 text-xl font-bold">Văn bản gốc</label>
              <textarea
                placeholder="Viết/Dán văn bản của bạn tại đây..."
                className="w-full bg-white rounded-lg p-2 resize-y"
                rows={4}
                onChange={(e) => setOriginalText(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-yellow-500 block mb-2 text-xl font-bold">Mô tả yêu cầu (tùy chọn)</label>
              <textarea
                placeholder="Viết ngắn gọn hơn..."
                className="w-full bg-white rounded-lg p-2 resize-y"
                rows={4}
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="text-white bg-[#00DFA8] rounded-lg p-2 w-40 transition duration-300 border-[#00DFA8] hover:border-transparent hover:text-black"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : showTryAgain ? 'Thử lại' : 'Viết lại'}
              </button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="w-1/2 p-4 relative mt-20"
            >
              <div className="flex items-start justify-between mb-2"> 
                <p className="text-yellow-500 text-xl font-bold ">Kết quả:</p>
                <button
                  className="text-white hover:text-gray-700"
                  onClick={handleCopyClick}
                >
                  <FaClipboard />
                </button>
              </div>
              <div className="bg-[#10AEA6] rounded-lg p-4 max-h-[200px] overflow-y-auto relative">
                <p className="text-white">{result}</p>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-gray-300 rounded-lg p-2 w-40"
                onClick={() => navigate('/rewrite-history')}
                >Lịch sử</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Nút chuyển hướng đến trang rewrite history */}
      <button
        className="fixed bottom-8 right-8 text-white bg-[#00DFA8] rounded-full p-4 shadow-lg transition duration-300 hover:bg-[#00C29D] cursor-pointer" 
        onClick={() => navigate('/rewrite-history')}
      >
        <FaHistory className="w-6 h-6" />
      </button>

      <ToastContainer />
    </div>
  );
};

export default AutoWrite;