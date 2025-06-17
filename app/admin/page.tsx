"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Users,
  FileText,
  Eye,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

type StatKey = "posts" | "views" | "users" | "comments";

const iconMap: Record<StatKey, LucideIcon> = {
  posts: FileText,
  views: Eye,
  users: Users,
  comments: MessageSquare,
};

interface StatsResponse {
  totalPosts: number;
  totalViews: number;
  totalUsers: number;
  totalComments: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
  
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const dashboardStats = [
    { name: "Total Posts", value: stats.totalPosts, key: "posts" },
    { name: "Total Views", value: stats.totalViews, key: "views" },
    { name: "Active Users", value: stats.totalUsers, key: "users" },
    { name: "Comments", value: stats.totalComments, key: "comments" },
  ] as { name: string; value: number; key: StatKey }[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here’s what’s happening with your blog.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((item) => {
          const Icon = iconMap[item.key];
          return (
            <Card key={item.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+0%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
