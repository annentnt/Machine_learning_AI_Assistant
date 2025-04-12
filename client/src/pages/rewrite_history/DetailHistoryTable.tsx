import { Link } from 'react-router-dom'; 
import rightArrow from '../../img/Right Arrow.svg'

export default function Expand_History_Table(){
    return(
        <div className="flex flex-col w-full justify-center items-center h-full font-barlow-condensed">
            <div className="self-start flex justify-start mt-3 ml-10">
                <Link
                    to="/rewrite-history"
                    className="flex items-center text-gray-200 gap-2 hover:underline"
                >
                    <img
                    src={rightArrow}
                    alt="Right Arrow"
                    className="w-4 h-4 "
                    />
                    <span>Trở lại</span>
                </Link>
            </div>

            <h1 className="text-6xl font-bold text-center text-neon mt-4">
                LỊCH SỬ
            </h1>

            <div className="mt-8 w-[1000px] mx-auto relative">
        
                {/* Thanh tiêu đề */}
                <div className="bg-green-1 rounded-t-xl flex items-center justify-between px-4 ">
                    <span className="text-white font-regular text-xl max-w-[470px] m-3">
                        Hãy viết lại đoạn văn này theo phong cách cổ điển, hiện đại, thu hút người đọc và người nghe
                    </span>
                    
                    <span className="text-white">dd/mm/yyyy</span>
                </div>

                {/* Nội dung */}
                <div className="flex bg-white rounded-b-xl">
                    {/* Bản gốc */}
                    <div className="w-1/2 p-4 border-r border-gray-300">
                        <h2 className="font-bold text-xl mb-2">Bản gốc</h2>
                        <p className="text-base">
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
                    <div className="w-1/2 p-4">
                        <h2 className="font-bold text-xl mb-2">Đã chỉnh sửa</h2>
                        <p className="text-base">
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

                <div className="flex justify-end">
                    <button className="text-white mt-3 font-medium text-lg w-1/4 bg-red text-center rounded-md py-2 hover:opacity-90">
                        Xóa bài viết
                    </button>
                </div>




            </div>

        </div>
    )
}