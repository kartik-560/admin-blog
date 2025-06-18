import { notFound } from "next/navigation";
import Image from "next/image";

// Types for Post and User
type Post = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
};

type User = {
  id: string;
  name?: string;
  email: string;
  image?: string;
  Post?: Post[];
};

interface Params {
  params: {
    id: string;
  };
}

async function getUserById(id: string): Promise<User | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);
  if (!user) return notFound();

  return (
    // <div className="max-w-2xl mx-auto mt-10 space-y-6 p-4">
    //   <div className="flex items-center gap-4">
    //     <div className="w-16 h-16 rounded-full overflow-hidden">
    //       <Image
    //         src={user.image || "/default-avatar.png"}
    //         alt={user.name || "User Avatar"}
    //         width={64}
    //         height={64}
    //         className="object-cover"
    //         unoptimized
    //       />
    //     </div>
    //     <div className="flex flex-col">
    //       <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
    //       <p className="text-gray-600">{user.email}</p>
    //     </div>
    //   </div>

    //   <div className="border-t pt-4">
    //     <h2 className="text-lg font-semibold">Stats</h2>
    //     <p>📦 Posts uploaded: {user.Post?.length ?? 0}</p>
    //   </div>

    //   <div className="border-t pt-4">
    //     <h2 className="text-lg font-semibold">Posts</h2>
    //     {user.Post && user.Post.length > 0 ? (
    //       <ul className="list-disc list-inside space-y-1">
    //         {user.Post.map((post) => (
    //           <li key={post.id}>
    //             <span className="font-medium">{post.title}</span>{" "}
    //             <span className="text-sm text-gray-500">
    //               ({new Date(post.createdAt).toLocaleDateString()})
    //             </span>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p className="text-sm text-muted-foreground">No posts available</p>
    //     )}
    //   </div>
    // </div>
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl space-y-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">

      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src={user.image || "/avatars/01.png"}
            alt={user.name || "User Avatar"}
            width={80}
            height={80}
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-t pt-5">
        <h2 className="text-xl font-semibold text-white-smoke mb-2">📊 Stats</h2>
        <p className="dark:text-[#F2F2F2] text-base text-black">
          Posts uploaded:{" "}
          <span className="font-medium">{user.Post?.length ?? 0}</span>
        </p>
      </div>

      {/* Posts List */}
      <div className="border-t pt-5">
        <h2 className="text-xl font-semibold text-white mb-3">📝 Posts</h2>
        {user.Post && user.Post.length > 0 ? (
          <ul className="space-y-3">
            {user.Post.map((post) => (
              <li
                key={post.id}
                className="p-3 dark:bg-gray-50 rounded-lg transition-all transition-transform duration-300 hover:scale-105 bg-[#F7EFE5] dark:hover:bg-gray-200 cursor-pointer"
              >
                <span className="block text-lg font-medium text-gray-900">
                  {post.title}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">No posts available</p>
        )}
      </div>
    </div>
  );
}
