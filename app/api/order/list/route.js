import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { userId } = getAuth(request);
        await connectDB();

        Address.length;
        Product.length;

        const orders = await Order.find({ userId })
        const enrichedOrders = await Promise.all(
            orders.map(async (order) => {
                // Fetch address
                const address = await Address.findById(order.address);

                // Fetch all products in the order
                const enrichedItems = await Promise.all(
                    order.items.map(async (item) => {
                        const product = await Product.findById(item.product);
                        return {
                            ...item.toObject(),
                            product,
                        };
                    })
                )
                return {
                    ...order.toObject(),
                    address,
                    items: enrichedItems,
                };
            })
        );
        return NextResponse.json({
            success: true,
            enrichedOrders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
};
