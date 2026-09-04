import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";

const navLinks = [
  { label: "المميزات", href: "#features" },
  { label: "كيف تعمل", href: "#how-it-works" },
  { label: "ابدأ", href: "#cta" },
];

const LandingHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F9FF]/90 backdrop-blur-md border-b border-[#8ac1e2]/30">
      <div className="container">
        <div className="flex items-center justify-between py-3 gap-4">
          <a href="#top" className="shrink-0" aria-label="وصل — الصفحة الرئيسية">
            <img
              src={logo}
              alt="وصل"
              className="h-14 sm:h-16 max-w-full object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="روابط الصفحة">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-base font-normal text-[#3E4946] hover:bg-[#8ac1e2]/25 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost font-medium text-14px text-primary hover:bg-[#8ac1e2]/20"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              className="btn btn-primary font-medium text-14px landing-cta-hover"
            >
              إنشاء حساب
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden btn btn-ghost btn-square"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-[#8ac1e2]/20 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-base text-[#3E4946] hover:bg-[#8ac1e2]/25"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-2 px-1">
              <Link to="/login" className="btn btn-ghost btn-block text-primary" onClick={() => setOpen(false)}>
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                إنشاء حساب
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
