import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to the Home Page</h1>
      <div className="flex justify-center gap-4">
        <Link href="/users">
          <div className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer">
            Manage Users
          </div>
        </Link>
        <Link href="/posts">
          <div className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer">
            Manage Posts
          </div>
        </Link>
      </div>
    </div>
  );
}
