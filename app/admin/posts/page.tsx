/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Search, Plus, Calendar, Edit, Trash2, Edit3, Eye } from "lucide-react";
import Link from "next/link";

// Define the BlogPost type
type BlogPost = {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  category: string;
  tags: string[];
  img?: string;
  userEmail?: string;
  author?: string;
  createdAt: string | Date;
  views: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]); // ✅ initialize as an array
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchPosts = async () => {
    let data = [];
    try {
      setIsLoading(true);
      const res = await fetch("/api/posts");
      data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("Expected array, got:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts", err);
      setPosts([]);
    } finally {
      console.log("✅ Done fetching posts", data);
      setIsLoading(false);
    }
  };

  fetchPosts();
}, []);


  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status?.toLowerCase() === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      post.category?.toLowerCase() === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft" as "draft" | "published" | "archived",
    category: "",
    tags: "",
  });

  const handleEditPost = (post: BlogPost) => {
    console.log("Edit button clicked:", post);
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      status: (["draft", "published", "archived"].includes(post.status)
        ? post.status
        : "draft") as "draft" | "published" | "archived",
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    });
    setIsEditDialogOpen(true);
  };

const handleDeletePost = async (postId: string) => {
  console.log("Delete button clicked for post ID:", postId);
  if (
    confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    )
  ) {
    try {
      const res = await fetch(`/api/posts/by-id/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  }
};


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts, edit content, and track performance.
          </p>
        </div>
        {/* <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link> */}
      </div>

      <div className="relative w-full max-w-xl">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

{isLoading ? (
  <div className="text-center py-12 text-muted-foreground">
    <div className="animate-spin h-6 w-6 rounded-full border-2 border-t-transparent border-foreground mx-auto mb-4" />
    Loading posts...
  </div>
) :(

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post._id} className="relative">
            <img
              src={post.img || "/placeholder.png"}
              alt="Post thumbnail"
              className="w-full h-48 object-cover rounded-t-md"
            />
            <CardHeader>
              <CardTitle className="line-clamp-2 text-lg font-semibold">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {post.userEmail}
              </p>
              <div className="flex items-center text-xs text-muted-foreground mb-3">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  {post.views.toLocaleString()} views
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/posts/${post.slug}/edit`} passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPost(post);
                    }}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
)}
     
    </div>
  );
}


