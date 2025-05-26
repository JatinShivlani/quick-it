import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { userId } = getAuth(request)

        await connectDB();
        const user = await User.findById(userId).select("cartItems");

        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        return NextResponse.json({ cartItems: user.cartItems });
    } catch (error) {
        return NextResponse.json({ error: error.message});
    }
}