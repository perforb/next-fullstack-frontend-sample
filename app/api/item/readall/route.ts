import {NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

export async function GET() {
  try {
    await connectMongoDB();
    const items = await ItemModel.find();
    return NextResponse.json({
      message: "Read all items.",
      items: items,
    });
  } catch (e) {
    throw e;
  }
}