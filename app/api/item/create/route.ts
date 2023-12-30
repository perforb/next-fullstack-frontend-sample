import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {ItemModel} from "@api/item/schema";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  try {
    await connectMongoDB();
    await ItemModel.create(requestBody);
    return NextResponse.json({
      message: "Created an item."
    });
  } catch (e) {
    return NextResponse.json({
      message: "Failed to create an item."
    });
  }
}
