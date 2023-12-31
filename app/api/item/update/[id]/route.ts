import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

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
    throw e;
  }
}