"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { DoublyLinkedList, DNode } from "../lib/DoublyLinkedList";

interface Img {
  _id: string;
  url: string;
}

export default function ImageViewer({
  images,
  onDelete,
}: {
  images: Img[];
  onDelete: (id: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Build DLL from images array
  const dll = useMemo(() => new DoublyLinkedList(images), [images]);

  const currentNode: DNode<Img> | null = useMemo(() => {
    let node = dll.head;
    for (let i = 0; i < currentIndex && node; i++) node = node.next;
    return node;
  }, [dll, currentIndex]);

  if (!currentNode) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={frame}>
        <Image
          src={currentNode.value.url}
          alt="image"
          fill
          style={{ objectFit: "contain" }}
          priority
        />

        {hasPrev && (
          <button style={navBtnLeft} onClick={() => setCurrentIndex(currentIndex - 1)}>
            ‹
          </button>
        )}
        {hasNext && (
          <button style={navBtnRight} onClick={() => setCurrentIndex(currentIndex + 1)}>
            ›
          </button>
        )}
        <button style={deleteBtn} onClick={() => onDelete(currentNode.value._id)}>
          ✕
        </button>
      </div>

      {/* Thumbnails */}
      <div style={thumbStrip}>
        {images.map((img, idx) => (
          <div
            key={img._id}
            onClick={() => setCurrentIndex(idx)}
            style={{
              ...thumb,
              border: idx === currentIndex ? "3px solid #6366f1" : "2px solid #ccc",
            }}
          >
            <Image src={img.url} alt="" width={80} height={50} style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

const frame = {
  position: "relative" as const,
  width: "700px",
  height: "450px",
  margin: "auto",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  background: "#f7f7f7",
};

const navBtnLeft = {
  position: "absolute" as const,
  top: "50%",
  left: 10,
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: 50,
  width: 40,
  height: 40,
  cursor: "pointer",
};

const navBtnRight = { ...navBtnLeft, left: "auto", right: 10 };

const deleteBtn = {
  position: "absolute" as const,
  top: 10,
  right: 10,
  background: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "5px 10px",
  cursor: "pointer",
};

const thumbStrip = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
  marginTop: 20,
  overflowX: "auto" as const,
};

const thumb = {
  width: 80,
  height: 50,
  borderRadius: 8,
  overflow: "hidden",
  cursor: "pointer",
};
