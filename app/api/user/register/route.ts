import bcrypt from 'bcrypt';
import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {UserModel} from "@api/user/schema";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  try {
    await connectMongoDB();
    await UserModel.create({
      name: requestBody.name,
      email: requestBody.email,
      password: await bcrypt.hash(requestBody.password, 10),
    });
    return NextResponse.json({
      message: "Created a user."
    });
  } catch (e) {
    throw e;
  }
}
