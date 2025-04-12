import React from 'react';
import Write from '../../img/Write.png';
import Translate from '../../img/Translator.png';
import Tick from '../../img/Done.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

function MainPage() {
  const navigate = useNavigate(); 

  return (
    <div className="main-page min-h-screen bg-hero-gradient flex items-center justify-center">
      <main className="main-content">
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="intro text-center mb-8"
        >
          <h1 className="text-6xl text-yellow-500 font-bold mb-4">Sẵn sàng viết cùng Echo Mind</h1>
          <p className="text-white text-lg text-center max-w-md mx-auto">
            Bạn chỉ cần chọn một trong hai tiện ích bên dưới là có thể bắt đầu liền. Mọi thứ đã sẵn sàng để giúp bạn viết dễ hơn, nhanh hơn và thoải mái hơn rồi đó!
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="features grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card Viết lại nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="feature-card bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto max-h-[20rem] cursor-pointer"
            onClick={() => navigate('/auto-write')} // Chuyển hướng đến trang auto-write
          >
            {/* Phần tiêu đề */}
            <div className="bg-white p-6 text-center">
              <img
                src={Write}
                alt="Viết lại nội dung"
                className="feature-icon mb-4 mx-auto w-20 h-20"
              />
              <h2 className="text-2xl font-bold mb-2">Viết lại nội dung</h2>
            </div>
            {/* Phần danh sách */}
            <div className="bg-[#389893] p-6">
              <ul className="text-white pl-6">
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center mb-2"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Diễn đạt lại văn bản nhanh chóng.
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center mb-2"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Đa dạng hóa cách thể hiện nội dung.
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Tiết kiệm thời gian và công sức.
                </motion.li>
              </ul>
            </div>
          </motion.div>
          {/* Card Dịch Hán - Nôm - Việt */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="feature-card bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto max-h-[20rem]"
            onClick={() => navigate('/translate')} // Chuyển hướng đến trang translate
          >
            {/* Phần tiêu đề */}
            <div className="bg-white p-6 text-center">
              <img
                src={Translate}
                alt="Dịch Hán - Nôm - Việt"
                className="feature-icon mb-4 mx-auto w-20 h-20"
              />
              <h2 className="text-2xl font-bold mb-2">Dịch Hán - Nôm - Việt</h2>
            </div>
            {/* Phần danh sách */}
            <div className="bg-[#389893] p-6">
              <ul className="text-white pl-6">
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center mb-2"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Dịch nhanh Hán, Nôm sang Việt.
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center mb-2"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Giải nghĩa từ cổ.
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center"
                >
                  <img src={Tick} alt="Tick" className="w-5 h-5 mr-2" />
                  Hỗ trợ nhận diện, chuyển đổi văn bản.
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

export default MainPage;