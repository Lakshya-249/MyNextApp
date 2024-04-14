"use client";
import { getToken } from "@/helpers/getDataToken";
import Users from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = await getToken(req);
    const user = await Users.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "user found", data: user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      }
    );
  }
}
