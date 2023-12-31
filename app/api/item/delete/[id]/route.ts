import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

export async function DELETE(request: NextRequest, context) {
  const requestBody = await request.json();
  const id = context.params.id;
  try {
    await connectMongoDB();
    const item = await ItemModel.findById(id);
    if (item.email === requestBody.email) {
      await ItemModel.deleteOne({_id: id});
      return NextResponse.json({message: "Deleted an item.",});
    } else {
      return NextResponse.json({message: "Cannot delete.",});
    }
  } catch (e) {
    throw e;
  }
}