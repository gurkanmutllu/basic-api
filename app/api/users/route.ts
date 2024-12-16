import { NextRequest, NextResponse } from "next/server";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { sendResponse } from "../../../utils/responseHelper";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const users = getAllUsers();
  return NextResponse.json({ success: true, data: users });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const newUser = createUser(body);
  return NextResponse.json({ success: true, data: newUser, message: "User created successfully" });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const id = parseInt(req.nextUrl.searchParams.get("id") || "");
  const body = await req.json();
  const updatedUser = updateUser(id, body);

  if (!updatedUser) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updatedUser, message: "User updated successfully" });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id = parseInt(req.nextUrl.searchParams.get("id") || "");
  const deletedUser = deleteUser(id);

  if (!deletedUser) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: deletedUser, message: "User deleted successfully" });
}
