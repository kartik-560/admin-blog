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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search, MoreHorizontal, Reply, Trash2, Calendar } from "lucide-react";

import { useRouter } from "next/navigation";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  interface Comment {
    id: string;
    desc?: string;
    user?: { name?: string };
    post?: { title?: string };
    createdAt?: string;
    // Add other properties as needed
  }
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  // State to hold the list of comments
  const [commentList, setCommentList] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store", // Prevents stale data
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setCommentList(data);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    fetchComments();
  }, []);
  const router = useRouter();
  const handleDeleteComment = async (commentId: string) => {
    console.log("Delete button clicked for comment ID:", commentId);

    if (
      confirm(
        "Are you sure you want to delete this comment? This action cannot be undone."
      )
    ) {
      try {
        const res = await fetch(`/api/comments/${commentId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete comment");
        }

        // ✅ Update comment list in UI
        router.refresh();
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment. Please try again.");
      }
    }
  };

  const filteredComments = commentList.filter((comment) => {
    const matchesSearch =
      comment.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });
  console.log("commentList", commentList);
  console.log("filteredComments", filteredComments);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
          <p className="text-muted-foreground">
            Manage and moderate comments across all your blog posts.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Comments</CardTitle>
          <CardDescription>Review and manage comments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comments, authors, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment: any) => (
                  <TableRow key={comment.id}>
                    <TableCell>{comment.desc}</TableCell>
                    <TableCell>{comment.user?.name ?? "Unknown"}</TableCell>
                    <TableCell>{comment.post?.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-5 w-5 text-black" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedComment(comment);
                              setReplyDialogOpen(true);
                            }}
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {deleteDialogOpen && (
        <div>
          <p>Are you sure?</p>
          <button
            onClick={() =>
              commentToDelete && handleDeleteComment(commentToDelete.id)
            }
          >
            Confirm Delete
          </button>
          <button onClick={() => setDeleteDialogOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
