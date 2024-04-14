import { connect } from "@/dbConfig/dbconfig";
import Users from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password, name, email } = reqBody;
    const user = await Users.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newuser = new Users({
      name,
      username,
      password: hashedPassword,
      email,
    });
    const savedUser = await newuser.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: "user created successfully", success: true, data: savedUser },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
