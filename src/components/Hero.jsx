
import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";


const Hero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const reveal = (delay = 0) => ({
    variants: fadeUp,
    initial: "hidden",
    animate: "visible",
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#070709] text-white"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/[0.14] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-40 -z-10 h-[25rem] w-[25rem] rounded-full bg-indigo-600/[0.10] blur-[120px]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-8 pt-28 sm:px-10 lg:px-12">
        <div className="grid flex-1 items-center gap-14 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-16">

          {/* Left: Introduction */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div
              {...reveal(0.05)}
              className="mb-7 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
                Available for freelance projects
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...reveal(0.12)}
              className="max-w-3xl text-[clamp(3.4rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
            >
              Turning ideas
              <br />
              into{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-white bg-clip-text text-transparent">
                digital
              </span>
              <br />
              experiences<span className="text-violet-400">.</span>
            </motion.h1>

            {/* Introduction */}
            <motion.p
              {...reveal(0.22)}
              className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg"
            >
              A Full-Stack Developer focused on building modern, responsive
              websites and practical web applications using{" "}
              <span className="text-zinc-200">
                React, Node.js, MongoDB
              </span>{" "}
              and Tailwind CSS.
            </motion.p>

            {/* Actions */}
            <motion.div
              {...reveal(0.32)}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5"
            >
              <a
                href="#work"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-violet-200 hover:shadow-lg hover:shadow-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                View selected work
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                Let's work together
                <span className="h-px w-7 bg-zinc-600 transition-all duration-300 group-hover:w-11 group-hover:bg-violet-400" />
              </a>
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: 28, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              delay: reduceMotion ? 0 : 0.15,
              ease: "easeOut",
            }}
            className="relative order-1 mx-auto w-full max-w-[410px] lg:order-2 lg:ml-auto lg:max-w-[440px]"
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-violet-500/[0.12] blur-[70px]"
            />

            {/* Corner details */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 z-10 h-20 w-20 border-r border-t border-violet-400/50 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] sm:rounded-3xl">
              <img
                src="/assets/baskar-developer.png"
                alt="Developer portrait"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
              />

              {/* Image overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
              />

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Baskar A
                  </p>
                  <p className="mt-2 text-xs text-zinc-300 sm:text-sm">
                    Design · Develop · Create
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-violet-200 backdrop-blur-md">
                  <Code2 size={20} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Floating note */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-3 top-8 flex items-center gap-3 border border-white/10 bg-[#121216]/95 px-3 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:-left-9 sm:top-12 sm:px-4"
            >
              <span className="flex h-9 w-9 items-center justify-center bg-violet-400/10 text-violet-300">
                <Sparkles size={17} />
              </span>

              <div>
                <p className="text-xs font-medium text-white">
                  Ideas into reality
                </p>
                <p className="mt-1 text-[10px] text-zinc-500">
                  One project at a time
                </p>
              </div>
            </motion.div>

            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-12 w-12 border-b border-l border-violet-400/50 sm:-bottom-5 sm:-left-5 sm:h-16 sm:w-16"
            />
          </motion.div>
        </div>

        {/* Bottom information */}
        <motion.div
          {...reveal(0.5)}
          className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Based in
            </p>
            <p className="mt-1.5 text-sm text-zinc-300">
              Tamil Nadu, India
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Current focus
            </p>
            <p className="mt-1.5 text-sm text-zinc-300">
              Web Development · Continuous Learning
            </p>
          </div>

          <a
            href="#about"
            className="group flex w-fit items-center gap-3 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            Discover more
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

