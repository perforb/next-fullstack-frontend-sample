import {NextRequest, NextResponse} from "next/server";
import {ItemModel} from "@api/item/schema";
import connectMongoDB from "@config/database";

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
    return NextResponse.json({
      message: "Failed to delete an item."
    });
  }
}