import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickit-next" });

// inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      cartItems: {},
    };
    await connectDB();
    await User.create(userData);
  }
);

// inngest function to update user data in the database
export const syncUserUpdate = inngest.createFunction(
  {
    id: "user-update-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData)
  }
);

// inngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "user-deletion-from-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5, // Maximum number of events to batch
      timeout: '5s', // Maximum time to wait for events before processing
    }
  },
  { event: "order/created" },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      }
    });
    await connectDB();
    await Order.insertMany(orders);
    return { success: true, processed: orders.length, message: "Orders created successfully" };

  }

)