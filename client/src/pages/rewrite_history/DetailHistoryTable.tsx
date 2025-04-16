
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Expand_History_Table() {
  const { id } = useParams()
  const [record, setRecord] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    fetch(`http://localhost:8000/api/writing_assistant/history/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setRecord(data))
      .catch(err => console.error(err))
  }, [id])
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
  
  if (!record) return <p>Đang tải...</p>

  return (
    <div className="flex flex-col w-full justify-center items-center h-full font-barlow-condensed">
      {/* ...giữ nguyên phần header... */}
      <div className="mt-8 w-[1000px] mx-auto relative">
        <div className="bg-green-1 rounded-t-xl flex items-center justify-between px-4 ">
          <span className="text-white font-regular text-xl max-w-[470px] m-3">{record.instructions}</span>
          <span className="text-white">{new Date(record.created_at).toLocaleDateString()}</span>
        </div>

        <div className="flex bg-white rounded-b-xl">
          <div className="w-1/2 p-4 border-r border-gray-300">
            <h2 className="font-bold text-xl mb-2">Bản gốc</h2>
            <p className="text-base">{record.original_content}</p>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="font-bold text-xl mb-2">Đã chỉnh sửa</h2>
            <p className="text-base">{record.rewritten_content}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
          onClick={handleDelete}
          className="text-white mt-3 font-medium text-lg w-1/4 bg-red text-center rounded-md py-2 hover:opacity-90">
            Xóa bài viết
          </button>
        </div>
      </div>
    </div>
  )
}
