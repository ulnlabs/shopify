"use client";
import React, { FormEvent, useContext, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";


type category = {
  category_name: string
  description: string
}
function Category() {
  const { toast } = useToast();

  const [Category, setCategory] = useState<category>({
    category_name: "",
    description: "",
  });
  const handleReset = (): void => {

    setCategory({
      category_name: "",
      description: "",
    });
  };
  const handleSubmit = () => {

   
      const postData = axios.post("/api/expenses", Category, {
        headers: {
          data: "category-addon"
        }
      }).then((res) => {
        if (res.status == 200) {
          toast({
            title: "New PopUp !",
            description: "New category is added",
          }); handleReset()
        }

  }).catch((err) => {
    if(err.request.status==409){
      toast({
        title: "New PopUp !",
        description: "category already exists",
      }); handleReset()
    }
    else if(err.request.status==500){
      toast({
        title: "New PopUp !",
        description: "something went wrong",
      })
    }
  })
  
    


  };
  return (
    <div className="h-fit">
      <div className="mt-8 ml-4">
        <DashboardHeader
          title="Expenses Category"
          subtitle="Add/Update Expense Category"
          breadcrumb={[
            { title: "dashboard", path: "/dashboard" },
            { title: "Expenses", path: "/Expenses" },
          ]}
        />
      </div>
      <main className="flex justify-center">
        <section className="w-[95%] border rounded-xl mt-36 shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="border-b-2 flex items-center">
            <h2 className=" p-4 text-[20px]">Please Enter Valid Data</h2>
          </div>
          <div className="">
            <form
              action=""
              className="min-h-[200px] grid  grid-row-2 grid-cols-12   p-3"
            >
              <div className="row-start-1 md:gap-x-3 md:items-center md:grid md:grid-cols-12 col-start-2 grid col-span-10">
                <label htmlFor="name" className=" md:col-span-4 md:text-end ">
                  Category Name<span className="text-red-400">*</span>:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={Category.category_name}

                  onChange={(e) =>
                    setCategory({ ...Category, category_name: e.target.value })
                  }
                  className="border h-8 rounded-md md:col-span-6 bg-gray-200"
                />
              </div>
              <div className="row-start-2 md:gap-x-3 md:items-center md:grid md:grid-cols-12 col-start-2 grid col-span-10">
                <label
                  className=" md:col-span-4 md:text-end"
                  htmlFor="description"
                >
                  Description :
                </label>
                <input
                  type="textarea"
                  name="description"
                  id="description"
                  value={Category.description}

                  onChange={(e) =>
                    setCategory({ ...Category, description: e.target.value })
                  }
                  className="border h-8 rounded-md md:col-span-6 bg-gray-200"
                />
              </div>
            </form>
            <div className="flex gap-5 justify-center mt-5 p-3 ">
              <button
                disabled={Category.category_name.length > 0 ? false : true}

                onClick={handleSubmit}
                className="border p-2 w-[120px] bg-green-500 text-white  rounded-md cursor-pointer"
              >save</button>
              <button

                onClick={handleReset}
                className="border  p-2 w-[120px] bg-orange-500 text-white rounded-md cursor-pointer"
              >cancel</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Category;
