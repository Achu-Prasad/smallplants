import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthersized user", { status: 401 });
    }
    await connectToDB();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough Data to create Product", {
        status: 401,
      });
    }
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    // console.log(newProduct)
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[ProductsmainRoute_POST]", err);
    return new NextResponse("internal Error", { status: 500 });
  }
};
