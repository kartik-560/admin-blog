// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Search,
//   Upload,
//   MoreHorizontal,
//   Download,
//   Trash2,
//   Eye,
//   Copy,
//   Image as ImageIcon,
//   File,
//   Video,
//   Music,
//   FileText,
// } from 'lucide-react';

// const mediaFiles = [
//   {
//     id: 1,
//     name: 'hero-image.jpg',
//     type: 'image',
//     size: '2.4 MB',
//     dimensions: '1920x1080',
//     uploadedAt: '2025-01-02',
//     url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
//   },
//   {
//     id: 2,
//     name: 'team-photo.png',
//     type: 'image',
//     size: '1.8 MB',
//     dimensions: '1600x900',
//     uploadedAt: '2025-01-01',
//     url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300',
//   },
//   {
//     id: 3,
//     name: 'product-demo.mp4',
//     type: 'video',
//     size: '15.2 MB',
//     dimensions: '1280x720',
//     uploadedAt: '2024-12-30',
//     url: '/videos/product-demo.mp4',
//     thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
//   },
//   {
//     id: 4,
//     name: 'logo-design.svg',
//     type: 'image',
//     size: '24 KB',
//     dimensions: 'Vector',
//     uploadedAt: '2024-12-28',
//     url: '/images/logo-design.svg',
//     thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
//   },
//   {
//     id: 5,
//     name: 'presentation.pdf',
//     type: 'document',
//     size: '3.7 MB',
//     dimensions: 'A4',
//     uploadedAt: '2024-12-25',
//     url: '/documents/presentation.pdf',
//     thumbnail: null,
//   },
//   {
//     id: 6,
//     name: 'background-music.mp3',
//     type: 'audio',
//     size: '5.1 MB',
//     dimensions: '3:45',
//     uploadedAt: '2024-12-20',
//     url: '/audio/background-music.mp3',
//     thumbnail: null,
//   },
// ];

// export default function MediaPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('grid');

//   const filteredFiles = mediaFiles.filter((file) => {
//     const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = typeFilter === 'all' || file.type === typeFilter;
    
//     return matchesSearch && matchesType;
//   });

//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case 'image':
//         return ImageIcon;
//       case 'video':
//         return Video;
//       case 'audio':
//         return Music;
//       case 'document':
//         return FileText;
//       default:
//         return File;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'image':
//         return 'bg-blue-100 text-blue-800';
//       case 'video':
//         return 'bg-purple-100 text-purple-800';
//       case 'audio':
//         return 'bg-green-100 text-green-800';
//       case 'document':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
//           <p className="text-muted-foreground">
//             Manage your images, videos, documents, and other media files.
//           </p>
//         </div>
//         <Button>
//           <Upload className="mr-2 h-4 w-4" />
//           Upload Files
//         </Button>
//       </div>

//       {/* Upload Zone */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
//             <Upload className="mx-auto h-12 w-12 text-gray-400" />
//             <div className="mt-4">
//               <p className="text-lg font-medium text-gray-900">Drop files here to upload</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 or <Button variant="link" className="p-0 h-auto">browse from your computer</Button>
//               </p>
//             </div>
//             <p className="text-xs text-gray-400 mt-2">
//               Supports: JPG, PNG, GIF, SVG, MP4, MP3, PDF (Max 10MB each)
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Filters and Search */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Media Files</CardTitle>
//           <CardDescription>
//             Browse and manage all your uploaded media files.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search files..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8"
//               />
//             </div>
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="image">Images</SelectItem>
//                 <SelectItem value="video">Videos</SelectItem>
//                 <SelectItem value="audio">Audio</SelectItem>
//                 <SelectItem value="document">Documents</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Media Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {filteredFiles.map((file) => {
//               const FileIcon = getFileIcon(file.type);
//               return (
//                 <Card key={file.id} className="group hover:shadow-lg transition-shadow">
//                   <CardContent className="p-4">
//                     <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 relative">
//                       {file.thumbnail ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={file.thumbnail}
//                           alt={file.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <FileIcon className="h-12 w-12 text-gray-400" />
//                         </div>
//                       )}
//                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuItem>
//                               <Eye className="mr-2 h-4 w-4" />
//                               View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Copy className="mr-2 h-4 w-4" />
//                               Copy URL
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Download className="mr-2 h-4 w-4" />
//                               Download
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-red-600">
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium text-sm truncate" title={file.name}>
//                           {file.name}
//                         </h3>
//                         <Badge className={getTypeColor(file.type)} variant="secondary">
//                           {file.type}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center justify-between text-xs text-muted-foreground">
//                         <span>{file.size}</span>
//                         <span>{file.dimensions}</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground">{file.uploadedAt}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {filteredFiles.length === 0 && (
//             <div className="text-center py-12">
//               <h3 className="text-lg font-medium text-gray-900">No files found</h3>
//               <p className="text-gray-500 mt-1">
//                 {searchTerm || typeFilter !== 'all'
//                   ? 'Try adjusting your search or filter criteria.'
//                   : 'Upload your first media file to get started.'}
//               </p>
//               {!searchTerm && typeFilter === 'all' && (
//                 <Button className="mt-4">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Upload Files
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }