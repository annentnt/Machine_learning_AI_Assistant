import { Link, useParams, useNavigate } from 'react-router-dom';
import rightArrow from '../../img/Right Arrow.svg';
import { useState, useEffect } from 'react';

const BASE_URL = "http://localhost:8000";

const getFullImageUrl = (path: string | null | undefined) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

export default function TranslationHistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [translation, setTranslation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTranslationDetail();
  }, [id]);

  const fetchTranslationDetail = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Bạn chưa đăng nhập");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/translate/history/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể tải thông tin bản dịch");
      }

      const data = await response.json();
      setTranslation(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching translation details:", error);
      setError("Không thể tải thông tin bản dịch. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Bạn chưa đăng nhập.");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa bản dịch này?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_URL}/api/translate/history/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Xóa thành công!");
        navigate("/translation-history");
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      alert("Lỗi kết nối!");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Link to="/translation-history" className="bg-green-1 text-white px-4 py-2 rounded">
          Quay lại trang lịch sử
        </Link>
      </div>
    );
  }

  if (!translation) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-white text-xl mb-4">Không tìm thấy bản dịch</p>
        <Link to="/translation-history" className="bg-green-1 text-white px-4 py-2 rounded">
          Quay lại trang lịch sử
        </Link>
      </div>
    );
  }

  const { original_image, detected_image, title, uploaded_at } = translation;
  const formattedDate = new Date(uploaded_at).toLocaleDateString("vi-VN");

  return (
    <div className="flex flex-col w-full justify-center items-center h-full font-barlow-condensed">
      <div className="self-start flex justify-start mt-3 ml-10">
        <Link to="/translation-history" className="flex items-center text-gray-200 gap-2 hover:underline">
          <img src={rightArrow} alt="Right Arrow" className="w-4 h-4" />
          <span>Trở lại</span>
        </Link>
      </div>

      <h1 className="text-6xl font-bold text-center text-neon mt-4">CHI TIẾT LỊCH SỬ</h1>

      <div className="mt-8 w-[1000px] mx-auto relative">
        {/* Thanh tiêu đề */}
        <div className="bg-green-1 rounded-t-xl flex items-center justify-between px-4">
          <span className="text-white font-regular text-xl max-w-[470px] m-3">
            {title || "Bản dịch Hán-Nôm"}
          </span>
          <span className="text-white">{formattedDate}</span>
        </div>

        {/* Nội dung */}
        <div className="flex bg-white rounded-b-xl">
          {/* Hình ảnh gốc */}
          <div className="w-1/2 p-4 border-r border-gray-300">
            <h2 className="font-bold text-xl mb-2">Hình ảnh gốc</h2>
            {original_image ? (
              <img
                src={getFullImageUrl(original_image)}
                alt="Hình ảnh gốc"
                className="max-w-full h-auto mb-6 block mx-auto"
              />
            ) : (
              <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-500 mb-6">
                Không có hình ảnh
              </div>
            )}
          </div>

          {/* Kết quả phát hiện */}
          <div className="w-1/2 p-4">
            <h2 className="font-bold text-xl mb-2">Kết quả phát hiện</h2>
            {detected_image ? (
              <img
                src={getFullImageUrl(detected_image)}
                alt="Kết quả phát hiện"
                className="max-w-full h-auto mb-2 block mx-auto"
              />
            ) : (
              <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-500">
                Không có kết quả phát hiện
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="text-white mt-3 font-medium text-lg w-1/4 bg-red text-center rounded-md py-2 hover:opacity-90"
            onClick={handleDelete}
          >
            Xóa bản dịch
          </button>
        </div>
      </div>
    </div>
  );
}
