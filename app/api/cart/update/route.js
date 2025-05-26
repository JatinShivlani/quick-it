// for adding the product data to cart
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    // Update the cart with the new data
    user.cartItems = cartData;
    await user.save();
    return NextResponse.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
