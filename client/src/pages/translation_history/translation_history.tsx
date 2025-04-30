import TranslationHistoryTable from './HistoryTable'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TranslationHistory() {
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchHistory();
    }, [currentPage]);

    const fetchHistory = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Bạn chưa đăng nhập.");
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/translate/history/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Lỗi khi tải dữ liệu');
            }
            
            const data = await response.json();
            setHistoryItems(data.results);
            
            // Calculate total pages
            const total = Math.ceil(data.count / 10); // 10 is the page_size from backend
            setTotalPages(total);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching history:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Bạn chưa đăng nhập.");
            return;
        }
        
        const confirmed = window.confirm("Bạn có chắc muốn xóa bản dịch này?");
        if (!confirmed) return;
        
        try {
            const response = await fetch(`http://localhost:8000/api/translate/history/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            
            if (response.ok) {
                alert("Xóa thành công!");
                fetchHistory(); // Refresh after deletion
            } else {
                alert("Xóa thất bại!");
            }
        } catch (error) {
            alert("Lỗi kết nối!");
            console.error(error);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="flex flex-col w-full justify-center items-center h-full font-barlow-condensed">
            <div className="self-start flex justify-start mt-3 ml-10">
                <Link
                    to="/translate"
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

            {loading ? (
                <div className="text-white text-xl mt-10">Đang tải...</div>
            ) : historyItems.length === 0 ? (
                <div className="text-white text-xl mt-10">Không có lịch sử dịch thuật nào</div>
            ) : (
                <>
                    {historyItems.map((item) => (
                        <TranslationHistoryTable 
                            key={item.id}
                            item={item}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 mb-8 gap-4">
                            <button 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-500' : 'bg-green-1 hover:bg-green-700'} text-white`}
                            >
                                Trang trước
                            </button>
                            <span className="text-white flex items-center">
                                Trang {currentPage} / {totalPages}
                            </span>
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-500' : 'bg-green-1 hover:bg-green-700'} text-white`}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
  
export default TranslationHistory