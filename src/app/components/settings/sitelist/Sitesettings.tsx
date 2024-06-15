import Site from '@/app/components/settings/sitelist/Site'
import Sales from '@/app/components/settings/sitelist/Sales'
import Prefixes from '@/app/components/settings/sitelist/Prefixes'
import { useState } from 'react'
function Sitesettings() {
    const [edit,setEdit]=useState<Boolean>(false)
    const [page, setpage] = useState("Site");
    const navigateoption = ["Site", "Sales", "Prefixes"];
    const [activeIndex, setActiveIndex] = useState(0); // State to track active navigation item index
    var renderpage;
    if (page === "Sales") {
        renderpage = <Sales edit={edit} />;
    }
    else if (page === "Prefixes") {
        renderpage = <Prefixes edit={edit} />;
    }
    else {
        renderpage = <Site edit={edit} />;
    }
    return (
        <>
            <div className="  h-screen ">

                <div className=" flex justify-center flex-col items-center ">

                    <div className=" border w-[95%] bg-white rounded-xl ">
                        <div className="">
                            <nav className=' flex  '>
                                <ul className=' flex  text-sm gap-4 p-2 '>
                                    {navigateoption.map((item, index) => (
                                        <li  className={`cursor-pointer ${activeIndex === index ? 'active' : ''}`} onClick={() => {setActiveIndex(index); setpage(item);}} key={index}>{item}</li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="flex justify-between p-5">
                                <div className=""></div>
                                <div className="">

                                <button onClick={()=>{setEdit(!edit)}} className='px-5 border rounded-md  font-medium '>Edit </button>
                                </div>
                            </div>
                        </div>
                        {renderpage}
                    </div>
                   
                </div>
                <style jsx>{
                `
                .active {
                    position: relative;
                    color: inherit;
                }
                .active::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 3px;
                    background-color: violet;
                    border-radius:20px
                }
            `}
                </style>
            </div>
        </>
    )
}
export default Sitesettings;
