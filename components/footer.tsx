import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-700">
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-400">FreePublicTV</h2>
          <p className="mt-2 text-sm max-w-sm">
            Discover and stream Free public TV channels from around the world.
            FreePublicTV aggregates open-source, public domain media.
          </p>
        </div>

        {/* Browse Links */}
        <div>
          <h3 className="font-semibold mb-2">Browse</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/channels" className="hover:text-blue-400">
                Channels
              </Link>
            </li>
            <li>
              <Link href="/country" className="hover:text-blue-400">
                Countries
              </Link>
            </li>
          </ul>
        </div>

        {/* Info Pages */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/disclaimer" className="hover:text-blue-400">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/dmca" className="hover:text-blue-400">
                DMCA Policy
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-slate-700">
        &copy; {new Date().getFullYear()} FreePublicTV. All rights reserved.
        This site does not host or stream any content directly.
      </div>
    </footer>
  );
}
