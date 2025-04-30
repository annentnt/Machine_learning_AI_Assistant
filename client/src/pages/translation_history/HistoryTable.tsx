import binImage from '../../img/recycle bin.svg';
import rightArrow from '../../img/Right Arrow.svg';
import transferArrowImage from '../../img/Data Transfer.svg';
import { Link } from 'react-router-dom';

const BASE_URL = "http://localhost:8000";

const getFullImageUrl = (path: string | null | undefined) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

export default function TranslationHistoryTable({ item, onDelete }) {
  if (!item) return null;

  const { id, original_image, detected_image, formatted_date } = item;

  return (
    <div className="font-barlow-condensed">
      <div className="mt-10 w-[1000px] mx-auto relative">
        {/* Ngày tháng */}
        <div className="flex items-center justify-end mb-2">
          <span className="mr-4 text-gray-300">{formatted_date || 'dd/mm/yyyy'}</span>
        </div>

        {/* Tiêu đề */}
        <div className="bg-green-1 rounded-t-xl flex text-center px-4 text-xl text-white">
          <div className="w-1/2 flex items-center justify-center mt-3 mb-3">Hán-Nôm</div>
          <div className="flex items-center justify-center m-4">
            <img src={transferArrowImage} alt="Icon chuyển" className="w-6 h-6" />
          </div>
          <div className="w-1/2 flex items-center justify-center">Tiếng Việt</div>
        </div>

        {/* Nội dung */}
        <div className="flex bg-white rounded-b-xl">
          {/* Hình ảnh */}
          <div className="w-1/2 p-4 border-r border-green-1">
            <h2 className="font-bold text-xl mb-2">Hình ảnh</h2>
            {original_image ? (
              <img
                src={getFullImageUrl(original_image)}
                alt="Hán Nôm"
                className="max-w-full h-auto mb-2 block mx-auto"
              />
            ) : (
              <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-500">
                Không có hình ảnh
              </div>
            )}
          </div>

          {/* Bản dịch */}
          <div className="w-1/2 p-5">
            <h2 className="font-bold text-xl mb-2">Bản dịch</h2>
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

        {/* Link xem thêm */}
        <div className="flex justify-end mt-2">
          <Link
            to={`/translation-history/details/${id}`}
            className="flex items-center text-gray-200 gap-2 hover:underline"
          >
            <span>Xem thêm</span>
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-4 h-4"
              style={{ transform: 'scaleX(-1)' }}
            />
          </Link>
        </div>

        {/* Icon thùng rác */}
        <div className="absolute top-10 right-[-50px] group">
          <img
            src={binImage}
            alt="Thùng rác"
            className="cursor-pointer w-10 h-10"
            onClick={() => onDelete && onDelete(id)}
          />

          <span
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
      </div>
    </div>
  );
}
