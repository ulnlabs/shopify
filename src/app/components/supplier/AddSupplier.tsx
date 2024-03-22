"use client";
import React, { FormEvent, useContext } from "react";
import { ContextData } from "../../../../contextapi";
export default function AddSupplier() {
  const { supplierData, setSupplierData } = useContext(ContextData);

  const handleReset = (): void => {
    setSupplierData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      openingbalance: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setSupplierData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      openingbalance: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });
  };
  return (
    <>
    
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
                onChange={(e) =>
                  setSupplierData({ ...supplierData, name: e.target.value })
                }
                value={supplierData.name}
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
                onChange={(e) =>
                  setSupplierData({ ...supplierData, mobile: e.target.value })
                }
                value={supplierData.mobile}
                className="h-10  bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="mobile"
                id="mobile"
                type="text"
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
                  setSupplierData({ ...supplierData, email: e.target.value })
                }
                value={supplierData.email}
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
                  setSupplierData({ ...supplierData, gst: e.target.value })
                }
                value={supplierData.gst}
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
                  setSupplierData({ ...supplierData, tax: e.target.value })
                }
                value={supplierData.tax}
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
                htmlFor="openingbalance"
              >
                Opening balance
              </label>
              <input
                onChange={(e) =>
                  setSupplierData({ ...supplierData, openingbalance: e.target.value })
                }
                value={supplierData.openingbalance}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                type="text"
                name="openingbalance"
                id="openingbalance"
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
                  setSupplierData({ ...supplierData, state: e.target.value })
                }
                value={supplierData.state}
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
                  setSupplierData({ ...supplierData, city: e.target.value })
                }
                value={supplierData.city}
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
                  setSupplierData({ ...supplierData, pincode: e.target.value })
                }
                value={supplierData.pincode}
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
                  setSupplierData({ ...supplierData, address: e.target.value })
                }
                value={supplierData.address}
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

