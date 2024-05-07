import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[productIdOnRoute_GET]", err);
    return new NextResponse("internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Un-Autherised", { status: 401 });
    }
    await connectToDB();

    await Product.findByIdAndDelete(params.productId);
    return new NextResponse("product Deleted", { status: 200 });
  } catch (err) {
    console.log("[productIdOnRoute_DELETE]", err);
    return new NextResponse("internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    let product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse("product not found!", { status: 404 });
    }

    const { title, description, media,collections,category,price,expence,tags,sizes,colors } = await req.json();
    

    if (!title || !media) {
      return new NextResponse("Title and Image needed", { status: 400 });
    }
    product = await Product.findByIdAndUpdate(
      params.productId,
      { title, description, media,collections,category,price,expence,tags,sizes,colors },
      { new: true }
    );
    await product.save();
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[productIdOnRoute_POST]", err);
    return new NextResponse("internal server error", { status: 500 });
  }
};
