import { Webhook } from "svix";
import User from "../models/User.js";

// API CONTROLER FUNCTION TO MANAGE CLERK USER WIHT DATABASE
export const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with the Clerk secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the header
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    // Getting data from request body
    const { data, type } = req.body;

    // Switch case for the different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log("Error in the clerkWebhooks controller");
    console.log(error.message);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
