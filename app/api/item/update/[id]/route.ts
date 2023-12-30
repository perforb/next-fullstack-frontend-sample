import {NextRequest, NextResponse} from "next/server";
import {ItemModel} from "@api/item/schema";
import connectMongoDB from "@config/database";

export async function PUT(request: NextRequest, context) {
  const requestBody = await request.json();
  const id = context.params.id;
  try {
    await connectMongoDB();
    await ItemModel.updateOne({
      _id: id
    }, requestBody);
    return NextResponse.json({
      message: "Updated an item.",
    });
  } catch (e) {
    return NextResponse.json({
      message: "Failed to update an item."
    });
  }
}