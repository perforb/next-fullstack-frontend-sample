import {NextRequest, NextResponse} from "next/server";
import {ItemModel} from "@api/item/schema";
import connectMongoDB from "@config/database";

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
    return NextResponse.json({
      message: "Failed to read an item."
    });
  }
}