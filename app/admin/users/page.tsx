"use client";

import { useEffect, useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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


import { Search, Trash2, Shield, Calendar, Ellipsis } from "lucide-react";
// import { MoreHorizontal } from "lucide-react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [roleFilter, setRoleFilter] = useState("all");
  // const [statusFilter, setStatusFilter] = useState("all");
  // const [newUserOpen, setNewUserOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  type User = {
    createdAt: any;
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified?: string | null;
    Post?: { id: string }[];
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("Fetched users:", data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("❌ Data is not an array:", data);
          setUsers([]);
        }
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setUsers([]);
      } finally {
        setIsLoading(false);
        console.log("✅ isLoading set to false");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to delete user");
        }

        alert("User has been successfully deleted ✅");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        // Optionally update UI or refetch user list here
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user ❌");
      }
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const matchesSearch =
          (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
    : [];

  // const getRoleColor = (role: string) => {
  //   switch (role.toLowerCase()) {
  //     case "admin":
  //       return "bg-red-100 text-red-800";
  //     case "editor":
  //       return "bg-blue-100 text-blue-800";
  //     case "author":
  //       return "bg-green-100 text-green-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  // const getStatusColor = (status: string) => {
  //   return status === "Active"
  //     ? "bg-green-100 text-green-800"
  //     : "bg-gray-100 text-gray-800";
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all user accounts, their roles, and access
            permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            {/* <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="animate-spin h-6 w-6 rounded-full border-2 border-t-transparent border-foreground mx-auto mb-4" />
              Loading users...
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    {/* <TableHead>Role</TableHead> */}
                    {/* <TableHead>Status</TableHead> */}
                    <TableHead>Posts</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Link href={`/admin/users/${user.id}`}>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={user.image || "/avatars/01.png"}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {(user.name || "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      {/* <TableCell>
                      <Badge className={getRoleColor("author")}>
                        <Shield className="mr-1 h-3 w-3" />
                        Author
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(
                          user.emailVerified ? "Active" : "Inactive"
                        )}
                      >
                        {user.emailVerified ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell> */}
                      <TableCell>
                        <span className="font-mono text-sm">
                          {user.Post?.length ?? 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {user.emailVerified
                            ? new Date(user.emailVerified).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right relative z-10 overflow-visible">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 flex items-center justify-center border"
                            >
                              <MoreHorizontalIcon className="h-4 w-4 text-black" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!isLoading && filteredUsers.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="text-gray-500 mt-1">
                All users have been removed or filtered out.
              </p>
              <Button onClick={() => window.location.reload()}>Reload</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
