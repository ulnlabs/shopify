"use client";
import React, { FormEvent, useContext } from "react";
import { ContextData } from "../../../../../contextapi";

function Companyprofile() {
  const {formData,setFormData}=useContext(ContextData)

  const handleReset=():void => {
    setFormData({
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


  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);

    setFormData({
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
  const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

  return (
    <>
      
      <main className=" flex items-center justify-center">
        <section className="    mt-3 w-[95%] bg-white border-t-2 border-violet-700 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
          <form
            onSubmit={handleSubmit}
            action=""
            className="grid grid-cols-10 grid-rows-14   gap-2 min-h-[700px] p-[15px]  "
          >
            <div className="md:col-span-5  md:col-end-5 row-span-2   grid grid-cols-10 col-span-10 ">
              <label
                htmlFor="companyname"
                className="mt-2  pr-4  cursor-pointer col-start-2 md:col-start-1 col-span-7 "
              >
                CompanyName <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                required
                type="text"
                id="companynameme"
                name="companyname"
                className="h-10 bg-gray-200 col-start-2  md:col-start-1   px-2 outline-none rounded-md md:col-end-12 col-end-10"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-10 col-span-10 ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="mobile"
              >
                Mobile <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                value={formData.mobile}
                className="h-10  bg-gray-200 col-start-2 md:col-start-1 md:col-end-12 col-end-10 px-2 outline-none rounded-md"
                name="mobile"
                id="mobile"
                type="text"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-10 col-span-10   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="email"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                               className="h-10 bg-gray-200 col-start-2  md:col-start-1    px-2 outline-none rounded-md md:col-end-12 col-end-10"

                name="mail"
                id="email"
                type="email"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-10 col-span-10   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="gst"
              >
                GST Number <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
                }
                value={formData.gst}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1  md:col-end-12 col-end-10 px-2 outline-none rounded-md "
                name="gst"
                id="gst"
                type="text"
              />
            </div>
            <div className="md:col-span-5   md:col-end-5 row-span-2 grid grid-cols-10 col-span-10   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="gst"
              >
                VAT Number <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
                }
                value={formData.gst}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1  md:col-end-12 col-end-10 px-2 outline-none rounded-md "
                name="gst"
                id="gst"
                type="text"
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-10 col-span-10   ">
              <label
                className="mt-3 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="gst"
              >
                PAN Number <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
                }
                value={formData.gst}
                className="h-10 bg-gray-200 md:-mt-6 col-start-2 md:col-start-1 md:col-end-12 col-end-10 px-2 outline-none rounded-md "
                name="gst"
                id="gst"
                type="text"
              />
            </div>
           
            
            {/* second column */}
            <div className="md:col-span-5 md:col-start-7  md:col-end-14 row-span-2 grid grid-cols-10 col-span-10    md:row-start-1">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="bank_deatils"
              >
               Bank Details  <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, due: e.target.value })
                }
                value={formData.due}
                               className="h-10 bg-gray-200 col-start-2  md:col-start-1  px-2 outline-none rounded-md md:col-end-11  col-end-10"

                type="text"
                name="bank_deatils"
                id="bank_deatils"
              />
            </div>
            
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-3">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="state"
              >
                Country  <span className="text-red-400">*</span>
              </label>
              <select name="country" id="country"   className="h-10 bg-gray-200 col-start-2  md:col-start-1    px-2 outline-none rounded-md md:col-end-11  col-end-10"
>
                {countries.map((country,index) =>(
                    <option key={index} value={country}>{country}</option>
                ))}
               
              </select>
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-5">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="city"
              >
                City <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                value={formData.city}
                               className="h-10 bg-gray-200 col-start-2  md:col-start-1    px-2 outline-none rounded-md md:col-end-11  col-end-10"

                name="city"
                type="text"
                id="city"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-7">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="pincode"
              >
                Postal Code <span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                value={formData.pincode}
                               className="h-10 bg-gray-200 col-start-2  md:col-start-1    px-2 outline-none rounded-md md:col-end-11  col-end-10"

                name="pincode"
                type="text"
                id="pincode"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-9">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="state"
              >
                Country  <span className="text-red-400">*</span>
              </label>
              <select name="country" id="country"   className="h-10 bg-gray-200 col-start-2  md:col-start-1    px-2 outline-none rounded-md md:col-end-11  col-end-10"
>
                {countries.map((country,index) =>(
                    <option key={index} value={country}>{country}</option>
                ))}
               
              </select>
            </div>
      
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-11">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="address"
              >
                Address <span className="text-red-400">*</span>
              </label>
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                value={formData.address}
                className="h-20 resize-none bg-gray-200 col-start-2 md:col-start-1 md:col-end-11  col-end-10  px-2 outline-none rounded-md"
                id="address"
                name="address"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7   md:col-end-12 row-span-2 grid grid-cols-10 col-span-10    md:row-start-13">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="logo"
              >
                Company Logo 
              </label>
              <div  className="h-[110px] resize-none border col-start-2 md:col-start-1 col-end-8  px-2 outline-none rounded-md"></div>
              
            </div>
            

          </form>
          <div className=" flex justify-center gap-7 h-[100px] ">

            <input
              type="submit"
              className="mt-10 w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
              value="Update"
            />

            <input
             onClick={handleReset}
             type="reset"
              className="mt-10  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
              value="Cancel"
            />
          </div>

        </section>
      </main>
    </>
  );
}

export default Companyprofile;
