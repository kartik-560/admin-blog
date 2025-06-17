"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived";
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const EditPage = () => {
  const { id: slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    desc: "",
    img: "",
    catSlug: "",
    userEmail: "",
  });

  // Fetch post by ID
  useEffect(() => {
    console.log("Fetched ID:", slug);

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();
        setPost(data);
        console.log("Fetched Post Data:", data);
        setEditForm({
          title: data.title,
          slug: data.slug,
          desc: data.desc,
          img: data.img || "",
          catSlug: data.catSlug,
          userEmail: data.userEmail,
        });
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleSavePost = async () => {
    setIsSaving(true);
    try {
      const updatedPost = {
        ...editForm,
      };

      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Backend error:", errorData);
        alert("Error saving post: " + (errorData?.error || "Unknown"));
        return;
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Error saving post");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!post) return <div className="p-6">Post not found</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>

      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Post updated successfully!</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Edit Post: {editForm.title}</CardTitle>
          <CardDescription>Update your blog post below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Slug</Label>
            <Input
              value={editForm.slug}
              onChange={(e) =>
                setEditForm({ ...editForm, slug: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Description</Label>

            <ReactQuill
              value={editForm.desc}
              onChange={(value) => setEditForm({ ...editForm, desc: value })}
              theme="snow"
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              value={editForm.img || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, img: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Category Slug</Label>
            <Input
              value={editForm.catSlug}
              onChange={(e) =>
                setEditForm({ ...editForm, catSlug: e.target.value })
              }
            />
          </div>

          <div>
            <Label>User Email</Label>
            <Input
              value={editForm.userEmail}
              onChange={(e) =>
                setEditForm({ ...editForm, userEmail: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSavePost} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/admin/posts")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
