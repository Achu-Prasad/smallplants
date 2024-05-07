import Collections from "@/app/(dashbord)/collections/page";
import products from "@/app/(dashbord)/products/page";
import Collection from "@/lib/models/Collection";
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

    await newProduct.save();

    if (collections){
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if(collection){
          collection.products.push(newProduct._id);
          await collection.save()
        }
      }
    }


    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[ProductsmainRoute_POST]", err);
    return new NextResponse("internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[ProuductMainRoute_GET]", err);
    return new NextResponse("Internal Server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
