"use client";
import { BsFiletypeCsv } from "react-icons/bs"; 
import React, { ChangeEvent, useState,useRef } from "react";
import papa from "papaparse";

function ImportCustomer() {
  const fileRef: React.RefObject<HTMLInputElement>=useRef(null)
  const [csvData, setCsvData] = useState<any>([]);
  const [fileName, SetFileName] = useState<string>('Choose File');

  const clearFile=():void=>{
    if(fileRef.current){
      fileRef.current.value=""
      SetFileName("choose File")
    }
  }
const uploadData=():void=>{

}
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | null | undefined>
  ): void => {
    const file: any = e.target.files![0];
    SetFileName(file.name)

    papa.parse(file, {
      header: true,
      complete: (res) => {
        setCsvData(res.data);
      },
    });
  };
  return (<>
    <div className="flex justify-between w-full flex-wrap items-center h-36 ">
      <section className=" flex items-center mx-6 px-2 col-start-1 border-2 rounded-lg w-[200px] border-gray-300 h-12">
<span className=""><span className="font-semibold text-gray-600">FilName:</span>{fileName}</span>

      </section>
      <form action="" className="col-start-5" >
        <input
          onChange={handleChange}
          type="file"
          name="file"
          id="csvFile"
          className="hidden"
          ref={fileRef}
        />
        <label htmlFor="csvFile" className= "active:scale-95 hover:bg-gray-100 grid grid-flow-col  grid-cols-4  h-12  w-[200px] border-gray-300 mx-6 px-2 border-2 rounded-xl cursor-pointer ">
          <span className="col-span-1 flex justify-center  col-start-1  items-center">
            <BsFiletypeCsv  className="text-blue-600 text-2xl"/>

          </span>
          <span className="text-sm col-start-2 flex items-center col-span-3 font-semibold text-gray-700 ">Import Customer</span>
        </label>
      </form>
    </div>
    <div className=" w-full  ">
<section className=" flex justify-around lg:justify-center lg:gap-x-52  ">

<button className=" p-2 active:scale-95 border bg-green-300 row-start-2 md:w-[140px] col-start-2 rounded-md hover:bg-green-400" onClick={uploadData}>Import</button>
<button className="col-span-2 p-2 active:scale-95 border bg-red-300 md:w-[140px] row-start-2 col-start-5 rounded-md hover:bg-red-400" onClick={clearFile}>Cancel</button>
</section>
    </div >

      <div className="container my-4 h-[300px] border border-black flex justify-center flex-col ">
            <p>Name :</p>
            <p>Customer name :</p>
            <p>email :</p>
      </div>


  </>
  );
}

export default ImportCustomer;
