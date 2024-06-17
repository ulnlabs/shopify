import mongoose from "mongoose";
import sitelist from "@/app/mongoose/models/Sitelist"; // Assuming Sitelist is a Mongoose model
import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await connectDB();
    try {
        const data = await req.json();

        // Assuming `sitelist` is the Mongoose model and `data` is an object to be stored
        const newEntry = new sitelist(data);
        await newEntry.save(); // Save the new entry to the database

        console.log("Document is successfully created:", newEntry.toObject( ));

        // Return a JSON response indicating success
        return NextResponse.json({ message: "Document created successfully", data: newEntry }, { status: 200 });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error("Error occurred while creating document:", err);
        // Return an error response
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
