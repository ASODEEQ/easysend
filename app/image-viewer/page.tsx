import Image from "@/models/Image";
import ImageViewerClient from "./ImageViewerClient";
import dbConnect from "../lib/dbConnect";

export default async function Page() {
  await dbConnect();
  const imgs = await Image.find().lean();

  return (
    <main style={{ maxWidth: 1100, margin: "50px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        Doubly Linked Image Viewer
      </h1>
      <ImageViewerClient
        initial={imgs.map((i) => ({ _id: i._id.toString(), url: i.url }))}
      />
    </main>
  );
}
