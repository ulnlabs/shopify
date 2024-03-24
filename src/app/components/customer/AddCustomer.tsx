"use client";
import React, { FormEvent, useContext } from "react";
import { ContextData } from "../../../../contextapi";
import DashboardHeader from "../dashboard/DashboardHeader";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
function AddCustomer() {
  const { customerData, setCustomerData } = useContext(ContextData);
  const { toast } = useToast();

  const handleReset = (): void => {
    setCustomerData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      due: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const lengthDoc = await axios.get(`/api/customers`, {
      headers: {
        data: "doc-count",
      },
    });
    let length = lengthDoc.data.id;
    console.log(length);

    const customerDbData = {
      name: customerData.name,
      mobile: customerData.mobile,
      email: customerData.email,
      gst: customerData.gst,
      tax: customerData.tax,
      due: customerData.due,
      state: customerData.state,
      city: customerData.city,
      pincode: customerData.pincode,
      address: customerData.address,
      id: length,
    };
    const response = await axios.post(`/api/customers`, customerDbData,{headers:{data:"addcust"}});
    console.log(response);

    setCustomerData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      due: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });
    toast({
      title: "New PopUp !",
      description: "New Customer is added",
    });
  };
  return (
    <>
      {/*     <header className="w-[90%] h-[80px] mt-4 text-xl font-semibold text-gray-400 flex px-10 rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ml-[5%] items-center  ">
        Add/Update Customers
      </header> */}
      <DashboardHeader title="Customers" subtitle={"new"} />
      <main>
        <section className=" min-h-[700px]  mt-10 w-[90%] ml-[5%] rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
          <form
            onSubmit={handleSubmit}
            action=""
            className="grid grid-cols-10 grid-rows-12  min-h-[700px] p-6 "
          >
            <div className="md:col-span-5  md:col-end-5 row-span-2   grid grid-cols-5 col-span-12 ">
              <label
                htmlFor="name"
                className="mt-2 text-start pr-4  cursor-pointer col-start-2 md:col-start-1 col-span-5 "
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) => {
                  setCustomerData({ ...customerData, name: e.target.value });
                }}
                value={customerData.name}
                required
                type="text"
                id="name"
                name="name"
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5   px-2 outline-none rounded-md col-span-3 "
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12 ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                onChange={(e) => {
                  setCustomerData({ ...customerData, mobile: e.target.value });
                }}
                value={customerData.mobile}
                className="h-10  bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="mobile"
                id="mobile"
                type="tel"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                value={customerData.email}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="mail"
                id="email"
                type="email"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="gst"
              >
                GST Number
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, gst: e.target.value })
                }
                value={customerData.gst}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md "
                name="gst"
                id="gst"
                type="text"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="tax"
              >
                TAX Number
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, tax: e.target.value })
                }
                value={customerData.tax}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                id="tax"
                name="tax"
                type="text"
              />
            </div>
            {/* second column */}
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-1">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="due"
              >
                PreviousDue
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, due: e.target.value })
                }
                value={customerData.due}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                type="text"
                name="due"
                id="due"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-3">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="state"
              >
                State
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, state: e.target.value })
                }
                value={customerData.state}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="state"
                type="text"
                id="state"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-5">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="city"
              >
                City
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, city: e.target.value })
                }
                value={customerData.city}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="city"
                type="text"
                id="city"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-7">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <input
                onChange={(e) =>
                  setCustomerData({ ...customerData, pincode: e.target.value })
                }
                value={customerData.pincode}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="pincode"
                type="text"
                id="pincode"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-9">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                onChange={(e) =>
                  setCustomerData({ ...customerData, address: e.target.value })
                }
                value={customerData.address}
                className="h-20 resize-none bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                id="address"
                name="address"
              />
            </div>
            <input
              type="submit"
              className="mt-10 md:mt-0 min-w-[100px] col-start-3 col-span-2 bg-green-400 font-bold text-white   cursor-pointer rounded-full md:row-start-12 cur"
              value="OK"
            />

            <input
              onClick={handleReset}
              type="reset"
              className="mt-10  md:mt-0 col-start-7 min-w-[100px] bg-red-400 col-span-2 h-12 rounded-full  font-bold text-white md:row-start-12 cursor-pointer"
              value="Cancel"
            />
          </form>
        </section>
      </main>
    </>
  );
}

export default AddCustomer;
