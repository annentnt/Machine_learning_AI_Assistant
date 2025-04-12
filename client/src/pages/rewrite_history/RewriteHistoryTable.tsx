import binImage from '../../img/recycle bin.svg'
import rightArrow from '../../img/Right Arrow.svg'
import { Link } from 'react-router-dom'; 

export default function History_Table() {
  return (
    <div className="font-barlow-condensed">

      <div className="mt-10 w-[1000px] mx-auto relative">
        
        {/* Thanh tiêu đề */}
        <div className="bg-green-1 rounded-t-xl flex items-center justify-between px-4">
          <span className="text-white font-regular text-xl line-clamp-1 max-w-[400px] m-3">
            Hãy viết lại đoạn văn này theo phong cách cổ điển, hiện đại, thu hút người đọc và người nghe          </span>
          <span className="text-white ml-10">dd/mm/yyyy</span>
        </div>

        {/* Nội dung */}
        <div className="flex bg-white rounded-b-xl">
          {/* Bản gốc */}
          <div className="w-1/2 p-5 border-r border-green-1">
            <h2 className="font-bold text-xl mb-2">Bản gốc</h2>
            <p className="text-base line-clamp-3">
              Vẻ đẹp Việt Nam – Hồn quê, sắc phố <br />
              Việt Nam mang trong mình vẻ đẹp hài hòa giữa thiên nhiên và con người. 
              Từ những dãy núi trập trùng Tây Bắc, những cánh đồng lúa bát ngát miền Trung, 
              đến những bãi biển xanh trong miền Nam, mỗi vùng đất đều vẽ nên một bức tranh tuyệt mỹ. 
              Nhưng vẻ đẹp Việt Nam không chỉ dừng lại ở cảnh sắc. 
              Đó còn là sự ấm áp trong nụ cười hiền hậu của người dân, sự tinh tế trong tà áo dài bay nhẹ trong gió, 
              và cả sự bền bỉ, kiên cường trong từng nhịp sống. Một đất nước nhỏ bé nhưng chứa đựng bao điều kỳ diệu, 
              khiến ai đã đến một lần đều nhớ mãi không quên.
            </p>
          </div>

          {/* Đã chỉnh sửa */}
          <div className="w-1/2 p-5">
            <h2 className="font-bold text-xl mb-2">Đã chỉnh sửa</h2>
            <p className="text-base line-clamp-3">
              Vẻ đẹp Việt Nam – Hồn quê, sắc phố<br />
              Việt Nam – dải đất hình chữ S dịu dàng giữa biển trời Đông Nam Á – mang trong mình vẻ đẹp 
              giao hòa giữa thiên nhiên trác tuyệt và tâm hồn người Việt chân thành, đậm đà bản sắc. 
              Từ những triền núi sương giăng mờ ảo nơi Tây Bắc, đến cánh đồng lúa mênh mông gió hát miền Trung, 
              rồi xuôi về phương Nam với biển ngọc trời xanh, mỗi vùng đất là một khúc ca riêng, ngọt ngào và sâu lắng. <br />
              Song, điều làm nên nét quyến rũ vĩnh cửu của Việt Nam không chỉ nằm ở cảnh sắc hữu tình. 
              Đó còn là nụ cười mộc mạc của người mẹ nơi chợ quê, tà áo dài e ấp bay qua phố thị, 
              và cả tinh thần bền gan vững chí trong từng nhịp sống đời thường. 
              Một đất nước nhỏ bé nhưng vĩ đại trong tâm hồn – nơi ai đã ghé qua đều mang theo một nỗi nhớ, 
              một mối tình vương vấn khó nguôi.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Link
              to="/rewrite-history/details"
              className="flex items-center text-gray-200 gap-2 hover:underline"
          >
              <span>Xem thêm</span>
              <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-4 h-4 "
              style={{ transform: "scaleX(-1)" }}
              />
          </Link>
        </div>

        {/* Icon thùng rác đặt bên ngoài, ở phía bên phải của bảng */}
        <div className="absolute top-2 right-[-50px] group">
          <img
            src={binImage}
            alt="Thùng rác"
            className="cursor-pointer w-10 h-10"
          />
          {/* Tooltip "Xóa" */}
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
