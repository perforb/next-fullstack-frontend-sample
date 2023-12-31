import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

export async function GET(request: NextRequest, context) {
  const id = context.params.id;
  try {
    await connectMongoDB();
    const item = await ItemModel.findById(id);
    return NextResponse.json({
      message: "Read an item.",
      item: item,
    });
  } catch (e) {
    throw e;
  }
}