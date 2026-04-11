import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { privateRoute } from "@/lib/privateRoute";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = privateRoute(async (req) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = formData.get("folder") as string;
  const publicName = formData.get("publicName") as string;

  if (!file || !folder || !publicName) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicName,
        resource_type: "auto",
      },
      (err, res) => (err ? reject(err) : resolve(res)),
    );

    stream.end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
});
