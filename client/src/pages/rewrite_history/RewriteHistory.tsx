import RewriteHistoryTable from './RewriteHistoryTable'
import rightArrow from '../../img/Right Arrow.svg'
import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react'

function RewriteHistory() {
    const [historyList, setHistoryList] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token); // Log the token to check if it's being retrieved correctly
    
      
        fetch('http://localhost:8000/api/writing_assistant/history/all/', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            setHistoryList(data);
          })
          .catch(err => console.error('Fetch error:', err));
    }, []);
      
    return (
        <div className="flex flex-col w-full justify-center items-center h-full font-barlow-condensed">
            <div className="self-start flex justify-start mt-3 ml-10">
                <Link
                    to="/auto-write"
                    className="text-white bg-[#00DFA8] rounded-full p-2 w-12 h-12 flex items-center justify-center transition duration-300 hover:bg-[#00C29D]"
                >
                    <FaArrowLeft
                    className="w-6 h-6 text-white"
                    />
                </Link>
            </div>

            <h1 className="text-6xl font-bold text-center text-neon mt-3">
                LỊCH SỬ
            </h1>
            {Array.isArray(historyList) ? (
                historyList.map(item => (
                    <RewriteHistoryTable key={item.id} data={item} />
                ))
            ) : (
                <p className="text-red-500 mt-6">Không có lịch sử hoặc bạn chưa đăng nhập.</p>
            )}

            
        </div>
    )
  }
  
  export default RewriteHistory