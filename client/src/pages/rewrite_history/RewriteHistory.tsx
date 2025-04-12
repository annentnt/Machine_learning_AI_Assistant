import RewriteHistoryTable from './RewriteHistoryTable'
import rightArrow from '../../img/Right Arrow.svg'
import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa';

function RewriteHistory() {
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
            <RewriteHistoryTable />
            <RewriteHistoryTable />
            <RewriteHistoryTable />
            
        </div>
    )
  }
  
  export default RewriteHistory