"use client";

interface Img {
  _id: string;
  url: string;
}

export default function ImageUpload({ onAdd }: { onAdd: (img: Img) => void }) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    const base64 = await toBase64(file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: JSON.stringify({ base64 }),
      headers: { "Content-Type": "application/json" },
    });

    const img = await res.json();
    onAdd(img);
  };

  return (
    <label style={btn}>
      + Add Image
      <input type="file" hidden accept="image/*" onChange={handleUpload} />
    </label>
  );
}

const toBase64 = (file: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

const btn = {
  padding: "10px 20px",
  background: "linear-gradient(135deg,#6366f1,#3b82f6)",
  color: "#fff",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 500,
  marginBottom: 20,
  display: "inline-block",
};
