import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-100">
          QueueFlow
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="text-zinc-100 hover:text-zinc-100 transition-colors">
            Dashboard
          </Link>
          <Link href="/jobs" className="hover:text-zinc-100 transition-colors">
            Jobs
          </Link>
          <Link href="/workers" className="hover:text-zinc-100 transition-colors">
            Workers
          </Link>
          <a href="https://github.com/vilas-naik/QueueFlow" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
