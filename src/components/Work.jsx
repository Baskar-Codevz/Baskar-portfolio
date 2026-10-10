
import React, { useMemo, useState } from "react";
import {
   ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Layers3,
  Code2,
  Sparkles,
  Server,
  Database,
  Wind,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const projects = [
  {
    number: "01",
    title: "YAMA FLYS",
    type: "Real Client Project",
    category: "E-Commerce",
    filter: "client",
    featured: true,
    description:
      "A modern bangle e-commerce experience designed around elegant product visuals, collections, and responsive shopping interfaces.",
    tech: [
      { name: "React", icon: Code2 },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Node.js", icon: Server },
      { name: "MongoDB", icon: Database },
    ],
    image: "/assets/lab2.png",
    alt: "YAMA FLYS bangle e-commerce website homepage preview",
    live: "https://yama-flays.vercel.app/",
    github: "https://github.com/Baskar-Codevz/Yama-Flays",
    role: "Client project",
    features: ["Product-focused UI", "Responsive layout", "E-commerce experience"],
    status: "Project showcase",
    accent: "rose",
  },
  {
    number: "02",
    title: "Restro",
    type: "Web Application",
    category: "Restaurant",
    filter: "web",
    featured: false,
    description:
      "A restaurant website with food-focused visuals, responsive design, and smooth animations for an engaging dining experience.",
    tech: [
      { name: "React", icon: Code2 },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Motion", icon: Sparkles },
    ],
    image: "/assets/lab1.png",
    alt: "Restro restaurant website homepage preview",
    live: "",
    github: "https://github.com/Baskar-Codevz/restro-project",
    role: "Web development project",
    features: ["Restaurant landing page", "Responsive UI", "Motion effects"],
    status: "Project showcase",
    accent: "amber",
  },
];

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Client Work", value: "client" },
  { label: "Web Applications", value: "web" },
];

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

function TechBadge({ tech }) {
  const Icon = tech.icon;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-zinc-300 transition-colors duration-300 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-white">
      <Icon size={13} aria-hidden="true" className="text-violet-300" />
      {tech.name}
    </span>
  );
}

function ProjectPreview({ project, reduceMotion }) {
  const [imageState, setImageState] = useState("loading");

  return (
    <div className="group/image relative isolate">
      {/* Ambient spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-violet-600/0 opacity-0 blur-2xl transition-all duration-500 group-hover/image:bg-violet-500/20 group-hover/image:opacity-100"
      />

      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-xl shadow-black/20 transition-colors duration-500 group-hover/image:border-violet-400/30 sm:rounded-3xl">
        {/* Loading placeholder */}
        {imageState === "loading" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-900 to-[#111116]"
          >
            <div className="absolute inset-x-6 top-6 h-3 w-1/3 rounded bg-white/10" />
            <div className="absolute inset-x-6 top-14 h-2 w-1/2 rounded bg-white/[0.06]" />
            <div className="absolute bottom-6 left-6 h-16 w-2/5 rounded-xl bg-white/[0.06]" />
          </div>
        )}

        {/* Fallback if image cannot load */}
        {imageState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-900 to-[#17131f] p-6 text-center">
            <Layers3 size={32} className="text-violet-300" aria-hidden="true" />
            <p className="text-sm font-medium text-zinc-200">
              {project.title}
            </p>
            <p className="text-xs text-zinc-500">Preview image unavailable</p>
          </div>
        )}

        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageState("loaded")}
          onError={() => setImageState("error")}
          className={`h-full w-full object-cover object-top transition-[transform,opacity,filter] duration-700 ease-out ${
            imageState === "loaded" ? "opacity-100" : "opacity-0"
          } ${reduceMotion ? "" : "group-hover/image:scale-[1.035] group-hover/image:saturate-110"}`}
        />

        {/* Subtle visual overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-black/20 opacity-60 transition-opacity duration-500 group-hover/image:opacity-100"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-xl sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {project.category}
          </span>

          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/25 bg-violet-400/15 px-3 py-1.5 text-[10px] font-medium text-violet-100 backdrop-blur-xl sm:text-xs">
              <Sparkles size={12} aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        {project.live && (
          <a
            href={project.live}
            {...externalLinkProps}
            aria-label={`Open ${project.title} live website in a new tab`}
            className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-xl transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:bottom-5 sm:right-5"
          >
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, reduceMotion }) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: "easeOut",
      }}
      className="group grid items-center gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <ProjectPreview project={project} reduceMotion={reduceMotion} />

        <div className="mt-4 flex items-center justify-between gap-3 px-1">
          <p className="text-xs text-zinc-500">
            Project / {project.number}
          </p>
          <p className="text-right text-xs text-zinc-600">{project.type}</p>
        </div>
      </div>

      <div className={reverse ? "lg:order-1 lg:pl-3" : "lg:pl-2"}>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-violet-400">
            {project.number}
          </span>
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">
            {project.type}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-3xl font-medium tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-violet-200 sm:text-4xl lg:text-5xl">
            {project.title}
            <span className="text-violet-400">.</span>
          </h3>

          {project.featured && (
            <span className="rounded-md border border-violet-400/20 bg-violet-400/[0.08] px-2 py-1 text-[10px] uppercase tracking-wider text-violet-200">
              Client work
            </span>
          )}
        </div>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
          {project.description}
        </p>

        {/* Project information without invented metrics */}
        <div className="mt-6 grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Role
            </p>
            <p className="mt-2 text-sm text-zinc-200">{project.role}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Showcase status
            </p>
            <p className="mt-2 text-sm text-zinc-200">{project.status}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Highlights
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs text-zinc-300"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-violet-400"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology badges */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {project.live ? (
            <a
              href={project.live}
              {...externalLinkProps}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Live demo
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : (
            <span
              className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-500"
              title="Add the deployed URL when this project is live"
            >
              Demo link not added
            </span>
          )}

          <a
            href={project.github}
            {...externalLinkProps}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-zinc-200 transition-colors hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <GitBranch size={16} aria-hidden="true" />
            Source code
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.filter === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] py-24 sm:py-28 lg:py-36"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-64 h-96 w-96 rounded-full bg-violet-700/[0.07] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-20 h-96 w-96 rounded-full bg-indigo-600/[0.06] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="mb-14 flex items-center gap-4 sm:mb-20"
        >
          <span className="font-mono text-sm text-violet-400">02</span>
          <span className="h-px w-10 bg-violet-400/50" />
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-400 sm:text-sm">
            Selected work
          </p>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-violet-300">
              <Sparkles size={15} aria-hidden="true" />
              Ideas turned into experiences.
            </p>
            <h2
              id="work-heading"
              className="text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Selected projects.
              <br />
              <span className="text-zinc-600">Built with purpose.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-zinc-300 sm:text-base">
            A collection of web experiences built with modern technologies,
            thoughtful interfaces, and a focus on usability.
          </p>
        </motion.div>

        {/* Project filters */}
        <div
          className="mb-12 flex flex-wrap gap-2 sm:mb-16"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={`min-h-10 rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:text-sm ${
                  isActive
                    ? "border-violet-400/40 bg-violet-400/15 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Project cards */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="mt-20 flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.045] to-transparent p-6 sm:mt-28 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <GitBranch size={21} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white sm:text-xl">
                Explore more of my work
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-400">
                Visit my GitHub profile to explore available repositories and
                development experiments.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/Baskar-Codevz"
            {...externalLinkProps}
            className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            View GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Contact CTA */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            Have an idea you'd like to build?
          </p>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-white transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Let's talk
            <ArrowDownRight
              size={17}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;