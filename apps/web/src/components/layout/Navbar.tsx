import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Auth } from "../../context/AuthContext";
import { ModalComp } from "../general/modal";
import { SignupForm } from "../auth/SignUpForm";
import { SigninWithEmailForm } from "../auth/SignInForm";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/matches", label: "Matches" },
  { to: "/team", label: "Team" },
  { to: "/community", label: "Community" },
  { to: "/history", label: "History" },
  { to: "/store", label: "Store" },
  { to: "/news", label: "News" },
  { to: "/offseason", label: "Off-Season" },
  { to: "/voice-agent", label: "Voice Agent" },
] as const;

interface NavbarProps {
  variant?: "default" | "overlay";
}

function Navbar({ variant = "default" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authView, setAuthView] = useState<"signup" | "signin">("signin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session } = Auth();
  const navigate = useNavigate();
  const location = useLocation();
  const isOverlay = variant === "overlay";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isOverlay
      ? [
          "whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white",
          isActive ? "font-bold text-white" : "",
        ].join(" ")
      : [
          "whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#0B2A55]",
          isActive ? "font-bold text-[#0B2A55]" : "",
        ].join(" ");

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block w-full rounded-xl px-4 py-3.5 text-left text-base font-medium text-gray-800 transition-colors hover:bg-gray-50",
      isActive ? "bg-[#0B2A55] font-bold text-white hover:bg-[#0B2A55]" : "",
    ].join(" ");

  return (
    <>
      <nav
        className={
          isOverlay
            ? "relative z-30 mb-0 border-0 bg-transparent px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
            : "relative z-30 mb-4 rounded-t-2xl border border-gray-200 bg-white px-4 py-3 sm:mb-6 sm:px-6 sm:py-4 lg:px-8"
        }
      >
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <img
              src="/team-logos/TitanCrew.svg"
              alt="Titans Crew"
              width={72}
              height={72}
              className="h-11 w-11 object-contain sm:h-14 sm:w-14 lg:h-[72px] lg:w-[72px]"
            />
            <h2
              className={
                isOverlay
                  ? "text-base font-bold tracking-tight text-white sm:text-xl lg:text-[28px]"
                  : "text-base font-bold tracking-tight text-[#0B2A55] sm:text-xl lg:text-[28px]"
              }
            >
              TITANS CREW
            </h2>
          </NavLink>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex xl:gap-3">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!session ? (
              <button
                type="button"
                className={
                  isOverlay
                    ? "hidden rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:block sm:px-5 sm:py-3 sm:text-[15px]"
                    : "hidden rounded-full bg-[#0B2A55] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d3468] sm:block sm:px-5 sm:py-3 sm:text-[15px]"
                }
                onClick={() => setIsOpen(true)}
              >
                Login / Sign Up
              </button>
            ) : (
              <button
                type="button"
                className={
                  isOverlay
                    ? "hidden rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:block sm:px-5 sm:py-3 sm:text-[15px]"
                    : "hidden rounded-full bg-[#0B2A55] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d3468] sm:block sm:px-5 sm:py-3 sm:text-[15px]"
                }
                onClick={() => navigate("/profile")}
              >
                My Profile
              </button>
            )}

            <button
              type="button"
              className={
                isOverlay
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 text-white transition-colors hover:bg-white/10 xl:hidden"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#0B2A55] transition-colors hover:bg-gray-50 xl:hidden"
              }
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {!session && (
        <ModalComp
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          children={
            authView === "signup" ? (
              <SignupForm
                onSuccess={() => setIsOpen(false)}
                onSwitchToSignIn={() => setAuthView("signin")}
              />
            ) : (
              <SigninWithEmailForm
                onSuccess={() => setIsOpen(false)}
                onSwitchToSignUp={() => setAuthView("signup")}
              />
            )
          }
        />
      )}

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-[min(320px,88vw)] flex-col bg-white shadow-2xl xl:hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <span className="text-sm font-bold uppercase tracking-wider text-[#0B2A55]">
                Menú
              </span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <FiX size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={mobileLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="border-t border-gray-100 p-4">
              {!session ? (
                <button
                  type="button"
                  className="w-full rounded-full bg-[#0B2A55] px-5 py-3.5 text-base font-semibold text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsOpen(true);
                  }}
                >
                  Login / Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full rounded-full bg-[#0B2A55] px-5 py-3.5 text-base font-semibold text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
