import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No user exist" }, { status: 400 });
    }

    // check if password is correct
    const isCorrectPassword = await bcryptjs.compare(password, user?.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
          success: false,
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user?.email,
      username: user?.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log("TOken generated", token);
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      data: { user, token },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
