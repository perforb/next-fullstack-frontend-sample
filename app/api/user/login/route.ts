import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@config/database";
import {UserModel} from "@api/user/schema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    await connectMongoDB();
    const user = await UserModel.findOne({
      email: reqBody.email
    });
    if (user) {
      const rawPassword = reqBody.password;
      if (await bcrypt.compare(rawPassword, user.password)) {
        return NextResponse.json({message: "Logged in.",});
      } else {
        return NextResponse.json({message: "Failed login.",});
      }
    }

    return NextResponse.json({
      message: "Please register a user."
    });
  } catch (e) {
    throw e;
  }
}