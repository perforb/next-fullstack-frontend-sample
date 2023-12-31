import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

export async function middleware(request: NextRequest) {
  const token = await request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({message: "Missing token."});
  }
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const decodedJwt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch (e) {
    throw e;
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};