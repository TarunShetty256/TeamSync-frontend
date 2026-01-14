import React, { useEffect, useState } from "react";

type NavigateFn = (path: string, options?: { replace?: boolean }) => void;

type LandingProps = {
  navigateFn?: NavigateFn;
};

export default function Landing({ navigateFn }: LandingProps) {
  const [isDark, setIsDark] = useState(true); // force dark (black theme)

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const safeSetShowAuth = () => {
    try {
      sessionStorage.setItem("showAuth", "true");
    } catch (e) {}
  };

  const navigateTo = (path: string, replace = false) => {
    if (typeof navigateFn === "function") {
      navigateFn(path, { replace });
      return;
    }
    replace ? window.location.replace(path) : (window.location.href = path);
  };

  const openAuth = () => {
    safeSetShowAuth();
    navigateTo("/", true);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-400">
            TeamSync
          </h1>

          <div className="flex gap-3">
            <button
              onClick={openAuth}
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </button>
            <button
              onClick={openAuth}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-28 flex items-center justify-center">
        <div className="max-w-7xl w-full px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 py-16">

            {/* LEFT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Plan. Track. Ship.
                <span className="block text-green-400">
                  Team projects at scale
                </span>
              </h1>

              <p className="mt-4 text-gray-400 max-w-xl mx-auto lg:mx-0">
                Coordinate work, manage sprints, schedule tasks and
                deliver projects faster — inspired by Jira, built simpler.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  onClick={openAuth}
                  className="px-6 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
                >
                  Get started free
                </button>
              </div>

              {/* STATS */}
              <div className="mt-8 flex gap-8 justify-center lg:justify-start text-sm text-gray-400">
                <div>
                  <p className="text-lg font-semibold text-white">30k+</p>
                  <p>Active users</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">99.9%</p>
                  <p>Uptime</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">200+</p>
                  <p>Integrations</p>
                </div>
              </div>
            </div>

            {/* RIGHT – DASHBOARD MOCK */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-black p-6 shadow-xl">
                <div className="h-40 rounded bg-white/10 mb-4"></div>
                <div className="h-10 bg-white/10 rounded mb-3"></div>
                <div className="h-10 bg-white/10 rounded"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
