import React, { useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Update from "@/app/components/settings/popup/Update";

function PasswordChange() {
  const [formdata, setFormdata] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updateButtonVisible, setUpdateButtonVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);

  function handleSubmit(event:any) {
    event.preventDefault();

    const handler = async () => {
      console.log("start processing");
      try {
        const { data } = await axios.post("/api/password", { data: formdata });
        setAlert(data.alert);

        setFormdata({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setUpdateButtonVisible(false);
        setEdit(false);
      } catch (error) {
        console.error("Error updating password:", error);
      }
    };
    handler();
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  function handleData(event:any) {
    const { name, value } = event.target;
    setFormdata(previous => {
      const updatedFormdata = { ...previous, [name]: value };
      if (updatedFormdata.newPassword == updatedFormdata.confirmPassword) {
        setUpdateButtonVisible(true);
      } else {
        setUpdateButtonVisible(false);
      }
      return updatedFormdata;
    });
  }


  return (
    <div className="flex justify-center mt-9">
      <div className="border rounded-md relative">
        <AnimatePresence>
          {alert && <Update close={setAlert} />}
        </AnimatePresence>

        <div className="flex justify-between px-5 py-1">
          <div></div>
          <button onClick={() => { setEdit(!edit); }} className='border px-2 mt-2 rounded-md'>Edit</button>
        </div>
        <div>
          <form onSubmit={handleSubmit}  className='relative grid grid-rows-3 p-10'>
            <div className="md:grid md:grid-cols-12 grid p-2 md:text-end md:gap-x-1">
              <label htmlFor="currentPassword" className='mr-2 md:col-span-5 col-span-12'>
                Current Password <span className='text-red-600'> *</span>
              </label>
              <input disabled={!edit} type="password" id='currentPassword' required name='currentPassword' value={formdata.currentPassword} onChange={handleData} className='border rounded-md h-8 md:col-span-5 col-span-12 p-2' />
            </div>
            <div className="md:grid md:grid-cols-12 grid p-2 md:text-end md:gap-x-1">
              <label htmlFor="newPassword" className='mr-2 md:col-span-5 col-span-12'>
                New Password <span className='text-red-600'> *</span>
              </label>
              <input disabled={!edit} type="password" id='newPassword' required name='newPassword' value={formdata.newPassword} onChange={handleData} className='border rounded-md h-8 md:col-span-5 col-span-12 p-2' />
            </div>
            <div className="md:grid md:grid-cols-12 grid p-2 md:text-end md:gap-x-1">
              <label htmlFor="confirmPassword" className='mr-2 md:col-span-5 col-span-12'>
                Confirm Password <span className='text-red-600'> *</span>
              </label>
              <input disabled={!edit} type="password" id='confirmPassword' required name='confirmPassword' value={formdata.confirmPassword} onChange={handleData} className='border rounded-md h-8 md:col-span-5 col-span-12 p-2' />
            </div>
            {
              edit && (
                <div className="flex justify-center gap-4 absolute -bottom-14 right-[50%] translate-x-[50%]">
                  {
                    updateButtonVisible && (
                      <input
                        type="submit"
                        className="w-[140px] h-[40px] bg-green-400 font-bold text-white rounded-md cursor-pointer"
                        value="Update"
                      />
                    )
                  }
                  <input
                    type="reset"
                    className="bg-red-400 w-[140px] h-[40px] rounded-md font-bold text-white cursor-pointer"
                    value="Cancel"
                  />
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
