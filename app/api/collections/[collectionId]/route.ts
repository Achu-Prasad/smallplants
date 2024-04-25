import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Un-Autherised", { status: 401 });
    }
    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection Deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("internal error", { status: 500 });
  }
};
