import Link from "next/link";

export default function Home() {
  

  return (
    <main className="min-h-screen bg-[#f7f4fb] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-gray-900">
          Inventory Management
        </h1>

        <p className="mt-6 text-gray-500 leading-7">
          Streamline your inventory tracking with our powerful, easy-to-use
          management system. Track products, monitor stock levels, and gain
          valuable insights.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href={"/sign-in"}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Sign In
          </Link>

          <Link href={"#"} className="border border-violet-600 text-violet-600 px-8 py-3 rounded-md font-medium">
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}