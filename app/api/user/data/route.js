//here we will create a route/api to get user data

import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//this function will handle the GET request to get user data
//it will return the user data if the user is logged in
export async function GET(request) {
  try {
    //getting the user id from getauth function of clerk
    //this will return the user id of the logged in user
    const { userId } = getAuth(request);

    // connecting to the database
    await connectDB();

    //finding the user by id in the database
    const user = await User.findById(userId);

    //if user is not found, return an error response
    if (!user) {
      return NextResponse.json({ success: false, message: "user not logged in" });
    }

    //if user is found, return the user data
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error", message: error.message });
  }
}
