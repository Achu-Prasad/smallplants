"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";


const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

const CollectionForm = () => {
  const router = useRouter();

  const [loading,setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try{
      setLoading(true)
      const res = await fetch("/api/collections", {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(res)

      if(res.ok){
        setLoading(false);
        toast.success("Collection Created");
        router.push("/collections");
      }
    }
    catch(err){
      console.log("[Collections_POST_onSubmit]",err);
      toast.error("Creating Collection Failed")
    }


  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Collection</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-green-800 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() =>{router.push("/collections")}}
              className="bg-green-800 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
