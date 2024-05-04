"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/lib/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

const products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", { method: "GET" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]");
      return new NextResponse("internal Error", { status: 500 });
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 ">
      <div className="px-10 py-5">
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Products</p>
          <Button
            className="bg-green-700 text-white"
            onClick={() => router.push("/products/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
        <Separator className="bg-grey-1 my-4" />
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    </div>
  );
};

export default products;
