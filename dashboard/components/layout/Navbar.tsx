import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight text-blue-400">
          QueueFlow
        </Link>

        <nav className="flex items-center gap-8 text-zinc-300">
          <Link href="/" className="hover:text-white transition">
            Dashboard
          </Link>

          <Link href="/jobs" className="hover:text-white transition">
            Jobs
          </Link>

          <Link href="/workers" className="hover:text-white transition">
            Workers
          </Link>
          
          <a href="https://github.com/vilas-naik/QueueFlow" target="_blank" className="text-zinc-400 hover:text-white">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
