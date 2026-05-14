import { Link } from "react-router";

export default function Footer() {
  const quickLinks = [
    {
      text: "Home",
      path: "/",
    },
  ];
  return (
    <footer className="mt-auto w-full bg-neutral text-neutral-content border-t border-base-content/10">
      <div className="container mx-auto">
        <div className="footer p-10 grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center md:justify-items-start">
          <aside className="flex flex-col items-center md:items-start text-center md:text-left">
            <h6 className="footer-title text-neutral-content opacity-100 font-bold mb-4 text-lg">
              Campus Forum
            </h6>
            <p className="max-w-xs opacity-80 leading-relaxed text-sm">
              A place for students to connect, share knowledge, and collaborate on ideas. Built for
              our campus community with ❤️.
            </p>
          </aside>

          <nav className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
            <h6 className="footer-title text-neutral-content opacity-100 font-bold mb-4 text-lg">
              Quick Links
            </h6>
            <div className="flex flex-col gap-2">
              {quickLinks.map((data) => (
                <Link
                  key={data.text}
                  to={data.path}
                  className="link link-hover opacity-80 hover:opacity-100 transition-opacity"
                >
                  {data.text}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
            <h6 className="footer-title text-neutral-content opacity-100 font-bold mb-4 text-lg">
              Contact Us
            </h6>
            <div className="space-y-3">
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-xl">📍</span>
                <span className="text-sm">Navsari, GJ, India</span>
              </div>
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-xl">📧</span>
                <span className="text-sm">support@campusforum.edu</span>
              </div>
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-xl">📞</span>
                <span className="text-sm">+91 1234567894</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="footer footer-center p-6 bg-neutral/50 text-neutral-content border-t border-base-content/5">
        <aside>
          <p className="opacity-60 text-xs font-medium tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Campus Forum. All rights reserved.
          </p>
        </aside>
      </div>
    </footer>
  );
}
