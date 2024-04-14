import { connect } from "@/dbConfig/dbconfig";
import Users from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { username, password } = reqBody;
  const user = await Users.findOne({ username });
  const payload = { username: username, password: password, id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_TOKEN!, {
    expiresIn: "1d",
  });
  if (user) {
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const response = NextResponse.json(
        {
          success: true,
          message: "Login Successfull",
        },
        { status: 200 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    } else {
      NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 400 }
      );
    }
  } else {
    NextResponse.json(
      {
        success: false,
        message: "Invalid Credentials",
      },
      {
        status: 404,
      }
    );
  }
}
