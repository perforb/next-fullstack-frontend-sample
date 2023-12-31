import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

export async function DELETE(request: NextRequest, context) {
  const id = context.params.id;
  try {
    await connectMongoDB();
    await ItemModel.deleteOne({
      _id: id
    });
    return NextResponse.json({
      message: "Deleted an item.",
    });
  } catch (e) {
    throw e;
  }
}