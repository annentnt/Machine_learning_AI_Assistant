import binImage from '../../img/recycle bin.svg'
import rightArrow from '../../img/Right Arrow.svg'
import { Link } from 'react-router-dom'; 


export default function RewriteHistoryTable({ data }) {
  const { id, instructions, original_content, rewritten_content, created_at } = data;
  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Bạn chưa đăng nhập.");
      return;
    }
  
    const confirmed = window.confirm("Bạn có chắc muốn xóa bài viết này?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:8000/api/writing_assistant/history/${id}/delete/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
  
      if (response.ok) {
        alert("Xóa thành công!");
        window.location.href = "/rewrite-history";
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      alert("Lỗi kết nối!");
      console.error(error);
    }
  };
  return (
    <div className="mt-10 w-[1000px] mx-auto relative font-barlow-condensed">
      <div className="bg-green-1 rounded-t-xl flex items-center justify-between px-4">
        <span className="text-white font-regular text-xl line-clamp-1 max-w-[400px] m-3">{instructions}</span>
        <span className="text-white ml-10">{new Date(created_at).toLocaleDateString()}</span>
      </div>

      <div className="flex bg-white rounded-b-xl">
        <div className="w-1/2 p-5 border-r border-green-1">
          <h2 className="font-bold text-xl mb-2">Bản gốc</h2>
          <p className="text-base line-clamp-3">{original_content}</p>
        </div>

        <div className="w-1/2 p-5">
          <h2 className="font-bold text-xl mb-2">Đã chỉnh sửa</h2>
          <p className="text-base line-clamp-3">{rewritten_content}</p>
        </div>
      </div>
      <div className="absolute top-2 right-[-50px] group">
           <img
            src={binImage}
            alt="Thùng rác"
            className="cursor-pointer w-10 h-10"
          />
          {/* Tooltip "Xóa" */}
          <span
            onClick={handleDelete}
            className="
              absolute top-8 left-12 -translate-x-1/2
              whitespace-nowrap px-2 py-1 text-black text-sm
              bg-gray-100 bg-opacity-80 rounded
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-200
            "
          >
            Xóa
          </span>
        </div>
      <div className="flex justify-end mt-2">
        <Link to={`/rewrite-history/details/${id}`} className="flex items-center text-gray-200 gap-2 hover:underline">
          <span>Xem thêm</span>
          <img src={rightArrow} alt="Right Arrow" className="w-4 h-4" style={{ transform: "scaleX(-1)" }} />
        </Link>
      </div>
    </div>
  )
}

