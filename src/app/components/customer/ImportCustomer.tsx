"use client";
import { BsFiletypeCsv } from "react-icons/bs";
import React, { ChangeEvent, useState, useRef } from "react";
import papa from "papaparse";
import { useToast } from "@/components/ui/use-toast";
import { customerFileFormat } from "../../../../global";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { motion } from "framer-motion";

export default function ImportCustomer() {
  const fileRef: React.RefObject<HTMLInputElement> = useRef(null);
  const { toast } = useToast();

  const [csvData, setCsvData] = useState<any>([]);
  const [fileName, SetFileName] = useState<string>("Choose File");
  const [fileFormatAlert, setFileFormatAlert] = useState({
    show: false,
    disc: "",
  });
  const clearFile = (): void => {
    if (fileRef.current) {
      fileRef.current.value = "";
      SetFileName("choose File");
      setCsvData([]);
    }
  };

  //upload to db
  const uploadData = async (): Promise<void> => {
    if (csvData.length > 0) {
      if (
        (csvData[0].name || csvData[0].Name) &&
        (csvData[0].mobile || csvData[0].Mobile)
      ) {
        try {
          const response = await axios.post("/api/customers", csvData, {
            headers: {
              data: "importcustlist",
            },
          });
          if (response.status === 200) {
            toast({
              title: "New PopUp !",
              description: "New Customers are added",
            });
          }
          if (fileRef.current) {
            fileRef.current.value = "";
            SetFileName("choose File");
            setCsvData([]);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      } else {
        setFileFormatAlert({ show: true, disc: "Some feilds are missing" });
        if (fileRef.current) {
          fileRef.current.value = "";
          SetFileName("choose File");
          setCsvData([]);
        }

        setTimeout(() => {
          setFileFormatAlert({ show: false, disc: "" });
        }, 4000);
      }
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | null | undefined>
  ): void => {
    const file: any = e.target.files![0];
    if (file.type === "text/csv") {
      SetFileName(file.name);

      papa.parse(file, {
        header: true,
        complete: (res) => {
          setCsvData(res.data);
        },
      });
    } else {
      setFileFormatAlert({ show: true, disc: "Only CSV files are supported" });
      setTimeout(() => {
        setFileFormatAlert({
          show: false,
          disc: "Only CSV files are supported",
        });
      }, 4000);
    }
  };
  const value = dataValue.map((item, index) => (
    <tr key={index} className="border-b hover:bg-slate-100">
      <td key={index + 1} className="p-2">
        {item.id}
      </td>
      <td key={index + 2} className="p-2">
        {item.coloum}
      </td>
      <td key={index} className="p-2">
        {item.value}
      </td>
    </tr>
  ));
  return (
    <>
      {fileFormatAlert.show && (
        <motion.div
          className="w-[300px] absolute right-2"
          animate={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <Alert
            variant="destructive"
            className="w-[300px] absolute right-2 bg-white"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{fileFormatAlert.disc}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      <div className="flex justify-between w-full flex-wrap items-center h-36 ">
        <section className=" flex items-center mx-6 px-2 col-start-1 border-2 rounded-lg min-w-[200px] border-gray-300 h-12">
          <span className="">
            <span className="font-semibold text-gray-600">FilName:</span>
            {fileName}
          </span>
        </section>
        <form action="" className="col-start-5">
          <input
            onChange={handleChange}
            type="file"
            name="file"
            id="csvFile"
            className="hidden"
            ref={fileRef}
          />
          <label
            htmlFor="csvFile"
            className="active:scale-95 hover:bg-gray-100 grid grid-flow-col  grid-cols-4  h-12  w-[200px] border-gray-300 mx-6 px-2 border-2 rounded-xl cursor-pointer "
          >
            <span className="col-span-1 flex justify-center  col-start-1  items-center">
              <BsFiletypeCsv className="text-blue-600 text-2xl" />
            </span>
            <span className="text-sm col-start-2 flex items-center col-span-3 font-semibold text-gray-700 ">
              Import Customer
            </span>
          </label>
        </form>
      </div>
      <div className=" w-full  ">
        <section className=" flex justify-around lg:justify-center lg:gap-x-52  ">
          <button
            className=" p-2 active:scale-95 border bg-green-300 row-start-2 disabled:cursor-not-allowed md:w-[140px] col-start-2 rounded-md hover:bg-green-400"
            onClick={uploadData}
            disabled={csvData.length > 0 ? false : true}
          >
            Import
          </button>
          <button
            className="col-span-2 p-2 active:scale-95 border disabled:cursor-not-allowed  bg-red-300 md:w-[140px] row-start-2 col-start-5 rounded-md hover:bg-red-400"
            onClick={clearFile}
            disabled={csvData.length > 0 ? false : true}
          >
            Cancel
          </button>
        </section>
      </div>
      <div className="grid grid-col-3 border rounded-lg mt-16 border-b-0 w-[95%] shadow-lg shadow-gray-300">
        <div className="flex justify-center">
          <h2 className="p-2 pl-3 text-md text-[25px] text-gray-600">
            Import File Format
          </h2>
        </div>
        <div className="grid text-center">
          <table className="">
            <thead className=" bg-primary-gray">
              <tr className="">
                <th className="p-3 border-r-2 border-white">S.No</th>
                <th className="p-3 border-r-2 border-white">Coloum Name</th>
                <th className="p-3">Value</th>
              </tr>
            </thead>
            <tbody>{value}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const dataValue: customerFileFormat[] = [
  {
    id: 1,
    coloum: "name",
    value: "Required",
  },
  {
    id: 2,
    coloum: "mobile",
    value: "Required",
  },
  {
    id: 3,
    coloum: "email",
    value: "Optional",
  },
  {
    id: 4,
    coloum: "gst",
    value: "Optional",
  },
  {
    id: 5,
    coloum: "tax",
    value: "Optional",
  },
  {
    id: 6,
    coloum: "state",
    value: "Optional",
  },
  {
    id: 7,
    coloum: "city",
    value: "Optional",
  },
  {
    id: 8,
    coloum: "pincode",
    value: "Optional",
  },
  {
    id: 9,
    coloum: "address",
    value: "Optional",
  },
  {
    id: 10,
    coloum: "balance",
    value: "Optional",
  },
];
