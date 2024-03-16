
import { useState } from 'react'
import PasswordChange from './PasswordChange';
function Changepassword() {
   
    return (
        <>
            <div className="  h-screen ">

                <div className=" flex justify-center flex-col items-center ">

                    <div className=" border w-[95%] bg-white rounded-xl ">
                        
                        <PasswordChange />
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
              
            </div>
        </>
    )
}
export default Changepassword;
