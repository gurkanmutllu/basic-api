import { NextRequest, NextResponse } from "next/server";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../../../services/postService";
import { sendResponse } from "../../../utils/responseHelper";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const post = getPostById(parseInt(id));
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  }

  const posts = getAllPosts();
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const newPost = createPost(body);
  return NextResponse.json({ success: true, data: newPost, message: "Post created successfully" });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const id = parseInt(req.nextUrl.searchParams.get("id") || "");
  const body = await req.json();
  const updatedPost = updatePost(id, body);

  if (!updatedPost) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updatedPost, message: "Post updated successfully" });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id = parseInt(req.nextUrl.searchParams.get("id") || "");
  const deletedPost = deletePost(id);

  if (!deletedPost) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: deletedPost, message: "Post deleted successfully" });
}
