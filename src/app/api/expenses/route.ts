import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import { addCategory, addExpense } from "@/app/mongoose/models/expense";


export async function POST(req: Request) {
    const header = req.headers.get("data")

    try {
        await connectDB();

        if (header == "category-addon") {
            const { category_name: name, description } = await req.json()

            const exist = await addCategory.findOne({ name })

            if (exist) {
                return NextResponse.json({ message: "category already exist" }, { status: 409 });
            }

            await addCategory.create({ name: name.toLowerCase(), description })

            return NextResponse.json({ message: "data added successfully" }, { status: 200 });




        }
        else if (header === 'add-expense') {
            const addData = await addExpense.create(await req.json())
            console.log(addData);
            return NextResponse.json({ message: "data added successfully" }, { status: 200 });


        }
        else {
            return NextResponse.json({ message: "Invalid Request" }, { status: 400 });

        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {

    const header = req.headers.get("data");
    if (header === "get-category") {
        try {
            await connectDB();
            const categories = await addCategory.find();
            return NextResponse.json(categories, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    } else if (header === 'get-onlyName') {
        try {
            await connectDB();
            const categories = await addCategory.find({}, { _id: 0, description: 0, __v: 0 });
            const categoryArray = categories.map((item) => {
                return item.name
            })


            return NextResponse.json(categoryArray, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

        }
    }
    else if (header === "get-expenses") {
        try {
            await connectDB();
            const expenses = await addExpense.find({});
            return NextResponse.json(expenses, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }


    }

    else {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }

}

export async function DELETE(req: Request) {
    const header = req.headers.get("data");
    if (header === "delete-category") {
        try {
            await connectDB();
            const { id } = await req.json();
            console.log(id);

            const category = await addCategory.findOneAndDelete({ _id: id });
            console.log(category);

            if (category) {
                return NextResponse.json({ message: "category deleted" }, { status: 200 });
            }
            return NextResponse.json({ message: "category not found" }, { status: 404 });
        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }

}