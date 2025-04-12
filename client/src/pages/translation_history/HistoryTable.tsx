import binImage from '../../img/recycle bin.svg'
import rightArrow from '../../img/Right Arrow.svg'
import HanNom from '../../img/han-nom.svg'
import transferArrowImage from '../../img/Data Transfer.svg'
import { Link } from 'react-router-dom'; 


export default function Translation_History_Table() {
  return (
    <div className='font-barlow-condensed'>
        <div className='mt-10 w-[1000px] mx-auto relative'>
            {/* Ngày tháng */}
            <div className="flex items-center justify-end mb-2">
                <span className="mr-4 text-gray-300">dd/mm/yyyy</span>
            </div>

            {/* Tiêu đề */}
            <div className="bg-green-1 rounded-t-xl flex text-center px-4 text-xl text-white ">
                <div className="w-1/2 flex items-center justify-center mt-3 mb-3">
                    Hán-Nôm
                </div>

                <div className=" flex items-center justify-center m-4">
                    <img
                    src={transferArrowImage}
                    alt="Icon chuyển"
                    className="w-6 h-6"
                    />
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    Tiếng việt
                </div>
            </div>

            {/* Nội dung */}
            <div className='flex bg-white rounded-b-xl'>
                {/* Hình ảnh */}
                <div className='w-1/2 p-4 border-r border-green-1'>
                    <h2 className='font-bold text-xl mb-2'>Hình ảnh</h2>
                    <img
                        src={HanNom}
                        alt='Hình ảnh'
                        className='max-w-full h-auto mb-2 block mx-auto'
                    />
                </div>

                {/* Bản dịch */}
                <div className='w-1/2 p-5'>
                    <h2 className='font-bold text-xl mb-2'>Bản dịch</h2>
                    <p className="text-base h-max line-clamp-5">
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
            </div>

            <div className="flex justify-end mt-2">
                <Link
                    to="/translation-history/details"
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
            <div className="absolute top-10 right-[-50px] group">
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
