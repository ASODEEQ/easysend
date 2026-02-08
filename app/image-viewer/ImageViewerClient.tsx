"use client";

import { useState } from "react";
import ImageViewer from "../components/ImageViewer";
import ImageUpload from "../components/ImageUpload";

interface Img {
  _id: string;
  url: string;
}

export default function ImageViewerClient({ initial }: { initial: Img[] }) {
  const [images, setImages] = useState(initial);

  const handleDelete = async (id: string) => {
    await fetch("/api/images", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setImages(images.filter((i) => i._id !== id));
  };

  return (
    <div>
      <ImageUpload onAdd={(img) => setImages([...images, img])} />
      <ImageViewer images={images} onDelete={handleDelete} />
    </div>
  );
}
