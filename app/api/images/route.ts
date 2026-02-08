import { NextResponse } from "next/server";
import Image from "@/models/Image";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/app/lib/dbConnect";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  await dbConnect();
  const { base64 } = await req.json();

  const upload = await cloudinary.uploader.upload(base64, {
    folder: "image-viewer",
  });

  const img = await Image.create({ url: upload.secure_url });
  return NextResponse.json({ _id: img._id.toString(), url: img.url });
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  await Image.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
