import Site from '@/app/components/settings/sitelist/Site'
import Sales from '@/app/components/settings/sitelist/Sales'
import Prefixes from '@/app/components/settings/sitelist/Prefixes'
import Unitlist from '@/app/components/settings/currencylist/Currencylist'
import { useState } from 'react'
function Sitesettings() {
    const [page, setpage] = useState("Site");
    const navigateoption = ["Site", "Sales", "Prefixes"];
    const [activeIndex, setActiveIndex] = useState(0); // State to track active navigation item index
    var renderpage;
    if (page === "Sales") {
        renderpage = <Sales />;
    }
    else if (page === "Prefixes") {
        renderpage = <Prefixes />;
    }
    else {
        renderpage = <Site />;
    }
    return (
        <>
            <div className=" bg-[var(--settings)] h-screen ">

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
                        </div>
                        {renderpage}
                    </div>
                    <div className=" flex justify-center gap-7 h-[100px] ">

                        <input
                            type="submit"
                            className="mt-10 w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
                            value="Update"
                        />

                        <input

                            type="reset"
                            className="mt-10  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
                            value="Cancel"
                        />
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
