"use client";
import { BsFiletypeCsv } from "react-icons/bs";
import React, { ChangeEvent, useState, useRef } from "react";
import papa from "papaparse";

function ImportCustomer() {
  const fileRef: React.RefObject<HTMLInputElement> = useRef(null)
  const [csvData, setCsvData] = useState<any>([]);
  const [fileName, SetFileName] = useState<string>('Choose File');

  const clearFile = (): void => {
    if (fileRef.current) {
      fileRef.current.value = ""
      SetFileName("choose File")
    }
  }
  const uploadData = (): void => {

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
  const dataValue = [
    {
      id: 1,
      coloum: "Customer Name",
      value: "Required"
    },
    {
      id: 2,
      coloum: "Mobile",
      value: "Required"
    },
    {
      id: 3,
      coloum: "Email",
      value: "Required"
    },
    {
      id: 4,
      coloum: "GST Number",
      value: "Required"
    },
    {
      id: 5,
      coloum: "TAX Number",
      value: "Required"
    },
    {
      id: 6,
      coloum: "State Name",
      value: "Optional"
    },
    {
      id: 7,
      coloum: "City",
      value: "Optional"
    },
    {
      id: 8,
      coloum: "Pincode",
      value: "Required"
    },
    {
      id: 9,
      coloum: "Address",
      value: "Optional"
    },
    {
      id: 10,
      coloum: "Balance",
      value: "Required"
    }
  ]
  const value = dataValue.map((item, index) => (
    <tr className="border-b hover:bg-slate-100">
      <td key="index" className="p-2">{item.id}</td>
      <td key="index" className="p-2">{item.coloum}</td>
      <td key="index" className="p-2">{item.value}</td>
    </tr>
  ))
  return (<>
    <div className="grid grid-flow-col grid-cols-6 mt-5 ">
      <section className="col-span-3 flex items-center mx-6 px-2 col-start-1 border-2 rounded-md border-gray-300">
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
        <label htmlFor="csvFile" className="active:scale-95 hover:bg-gray-100 grid grid-flow-col grid-cols-4  h-12  w-[200px] border-gray-300 gap-x-2 border-2 rounded-xl cursor-pointer">
          <span className="col-span-1 flex justify-center  col-start-1  items-center">
            <BsFiletypeCsv className="text-blue-600 text-2xl" />

          </span>
          <span className="text-sm col-start-2 flex items-center col-span-3 font-semibold text-gray-700 ">Import Customer</span>
        </label>
      </form>
    </div>
    <div className=" w-full  ">
      <section className=" grid grid-cols-12 grid-rows-4  ">

        <button className="col-span-2 p-2 active:scale-95 border bg-green-300 row-start-2 col-start-2 rounded-full hover:bg-green-400" onClick={uploadData}>Import</button>
        <button className="col-span-2 p-2 active:scale-95 border bg-red-300 row-start-2 col-start-5 rounded-full hover:bg-red-400" onClick={clearFile}>Cancel</button>
      </section>
    </div >
    <div className="grid grid-col-3 border rounded-lg mt-16 border-b-0 w-[95%] shadow-lg shadow-gray-300">
      <div className="flex justify-center">
        <h2 className="p-2 pl-3 text-md text-[25px] text-gray-600">Import File Format</h2>
      </div>
      <div className="grid text-center">
        <table className="">
          <thead className=" bg-slate-300">
            <tr className="">
              <th className="p-3 border-r-2 border-white">S.No</th>
              <th className="p-3 border-r-2 border-white">Coloum Name</th>
              <th className="p-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {value}
          </tbody>
        </table>
      </div>
    </div>


  </>
  );
}

export default ImportCustomer;
