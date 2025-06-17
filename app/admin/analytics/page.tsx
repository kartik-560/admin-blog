// 'use client';

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
// } from 'recharts';
// import {
//   TrendingUp,
//   TrendingDown,
//   Users,
//   Eye,
//   MessageSquare,
//   Heart,
//   FileText,
//   Globe,
//   Clock,
//   Target,
// } from 'lucide-react';

// const stats = [
//   {
//     name: 'Page Views',
//     value: '284,291',
//     change: '+12.5%',
//     changeType: 'positive',
//     icon: Eye,
//   },
//   {
//     name: 'Unique Visitors',
//     value: '54,923',
//     change: '+8.2%',
//     changeType: 'positive',
//     icon: Users,
//   },
//   {
//     name: 'Avg. Session Duration',
//     value: '4m 32s',
//     change: '-2.1%',
//     changeType: 'negative',
//     icon: Clock,
//   },
//   {
//     name: 'Bounce Rate',
//     value: '32.4%',
//     change: '-5.3%',
//     changeType: 'positive',
//     icon: Target,
//   },
// ];

// const trafficData = [
//   { name: 'Jan', views: 4000, visitors: 2400, sessions: 2000 },
//   { name: 'Feb', views: 3000, visitors: 1398, sessions: 1500 },
//   { name: 'Mar', views: 2000, visitors: 9800, sessions: 3000 },
//   { name: 'Apr', views: 2780, visitors: 3908, sessions: 2500 },
//   { name: 'May', views: 1890, visitors: 4800, sessions: 1800 },
//   { name: 'Jun', views: 2390, visitors: 3800, sessions: 2200 },
//   { name: 'Jul', views: 3490, visitors: 4300, sessions: 2800 },
// ];

// const deviceData = [
//   { name: 'Desktop', value: 60, color: '#3B82F6' },
//   { name: 'Mobile', value: 35, color: '#10B981' },
//   { name: 'Tablet', value: 5, color: '#F59E0B' },
// ];

// const topPosts = [
//   {
//     title: 'Building Modern Web Applications with Next.js',
//     views: 12340,
//     engagement: 85,
//     comments: 23,
//     likes: 156,
//   },
//   {
//     title: 'The Future of AI in Content Creation',
//     views: 9876,
//     engagement: 78,
//     comments: 18,
//     likes: 134,
//   },
//   {
//     title: 'Responsive Design Best Practices',
//     views: 8560,
//     engagement: 72,
//     comments: 12,
//     likes: 89,
//   },
//   {
//     title: 'Healthy Lifestyle Tips for Developers',
//     views: 7230,
//     engagement: 68,
//     comments: 34,
//     likes: 67,
//   },
//   {
//     title: 'Investment Strategies for 2025',
//     views: 6540,
//     engagement: 65,
//     comments: 15,
//     likes: 45,
//   },
// ];

// const engagementData = [
//   { name: 'Mon', comments: 12, likes: 45, shares: 8 },
//   { name: 'Tue', comments: 19, likes: 52, shares: 12 },
//   { name: 'Wed', comments: 15, likes: 38, shares: 6 },
//   { name: 'Thu', comments: 25, likes: 67, shares: 15 },
//   { name: 'Fri', comments: 22, likes: 58, shares: 11 },
//   { name: 'Sat', comments: 18, likes: 43, shares: 9 },
//   { name: 'Sun', comments: 14, likes: 35, shares: 7 },
// ];

// export default function AnalyticsPage() {
//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
//         <p className="text-muted-foreground">
//           Track your blogs performance and user engagement metrics.
//         </p>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((item) => (
//           <Card key={item.name}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{item.name}</CardTitle>``
//               <item.icon className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{item.value}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 {item.changeType === 'positive' ? (
//                   <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
//                 ) : (
//                   <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
//                 )}
//                 <span className={item.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
//                   {item.change}
//                 </span>
//                 <span className="ml-1">from last month</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Traffic Overview */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Traffic Overview</CardTitle>
//             <CardDescription>Page views, visitors, and sessions over time</CardDescription>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={trafficData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Area type="monotone" dataKey="views" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
//                   <Area type="monotone" dataKey="visitors" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
//                   <Area type="monotone" dataKey="sessions" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Device Types</CardTitle>
//             <CardDescription>Traffic breakdown by device</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={deviceData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {deviceData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Engagement and Top Posts */}
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Weekly Engagement</CardTitle>
//             <CardDescription>Comments, likes, and shares this week</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={engagementData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="comments" fill="#3B82F6" />
//                   <Bar dataKey="likes" fill="#10B981" />
//                   <Bar dataKey="shares" fill="#F59E0B" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Top Performing Posts</CardTitle>
//             <CardDescription>Your most popular content this month</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {topPosts.map((post, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-start justify-between">
//                     <h4 className="text-sm font-medium leading-none">{post.title}</h4>
//                     <Badge variant="secondary" className="ml-2">
//                       #{index + 1}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center justify-between text-sm text-muted-foreground">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center">
//                         <Eye className="mr-1 h-3 w-3" />
//                         {post.views.toLocaleString()}
//                       </div>
//                       <div className="flex items-center">
//                         <MessageSquare className="mr-1 h-3 w-3" />
//                         {post.comments}
//                       </div>
//                       <div className="flex items-center">
//                         <Heart className="mr-1 h-3 w-3" />
//                         {post.likes}
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-xs mr-2">Engagement:</span>
//                       <div className="w-12 bg-gray-200 rounded-full h-2">
//                         <div
//                           className="bg-blue-600 h-2 rounded-full"
//                           style={{ width: `${post.engagement}%` }}
//                         />
//                       </div>
//                       <span className="text-xs ml-2">{post.engagement}%</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Additional Analytics Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">2,651</div>
//             <p className="text-xs text-muted-foreground">
//               +15 new posts this month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Countries</CardTitle>
//             <Globe className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">127</div>
//             <p className="text-xs text-muted-foreground">
//               Countries reached this month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//             <Target className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3.2%</div>
//             <p className="text-xs text-muted-foreground">
//               +0.5% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }