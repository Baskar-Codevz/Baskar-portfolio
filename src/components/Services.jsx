
import React from "react";
import {
  ArrowUpRight,
  Code2,
  ShoppingBag,
  Smartphone,
  Wrench,
  BrainCircuit,
  Zap,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Full-Stack Development",
    subtitle: "Ideas into real products",
    description:
      "Build complete web applications with polished interfaces, reliable backend systems, APIs, and database integration.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "E-commerce Solutions",
    subtitle: "Turn visitors into customers",
    description:
      "Create online stores with product catalogues, collections, admin management, and streamlined customer enquiry and order flows.",
    tags: ["Product Catalogues", "Admin Panels", "Order Flow"],
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "AI Integration & Automation",
    subtitle: "Make everyday work smarter",
    description:
      "Integrate AI APIs into websites, build chatbot experiences, and automate repetitive business tasks with practical AI-powered workflows.",
    tags: ["LLM APIs", "AI Chatbots", "Automation"],
  },
  {
    number: "04",
    icon: Smartphone,
    title: "UI/UX & Responsive Design",
    subtitle: "Designed for every screen",
    description:
      "Transform ideas into modern, accessible interfaces that look consistent and work smoothly across mobile, tablet, and desktop.",
    tags: ["Responsive UI", "Tailwind CSS", "Accessibility"],
  },
  {
    number: "05",
    icon: Wrench,
    title: "Website Care & Optimization",
    subtitle: "Improve what you already have",
    description:
      "Fix frontend issues, refine existing layouts, improve loading performance, and make websites easier to use and maintain.",
    tags: ["Bug Fixes", "Performance", "UI Updates"],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Modern Technology",
    description: "Practical tools for real business needs.",
  },
  {
    icon: ShieldCheck,
    title: "Clean Code",
    description: "Maintainable and scalable foundations.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description: "Solutions shaped around your goals.",
  },
];

const Services = () => {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      delay: reduceMotion ? 0 : delay,
    },
  });

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#070609] py-24 text-white sm:py-32"
    >
      {/* Purple ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-40 -z-10 size-[440px] rounded-full bg-violet-700/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[45%] -z-10 size-[420px] rounded-full bg-purple-600/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section label */}
        <motion.div
          {...reveal()}
          className="mb-14 flex items-center gap-4"
        >
          <span className="text-sm font-semibold text-violet-400">03</span>
          <span className="h-px w-10 bg-violet-400/60" />
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Services & solutions
          </span>
        </motion.div>

        {/* Intro and trust points */}
        <div className="mb-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <motion.div {...reveal()}>
            <p className="mb-5 text-sm font-medium text-violet-300">
              Development · Design · AI
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
              I build digital
              <span className="block">solutions that</span>
              <span className="block bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                make an impact.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              From modern websites to AI-powered experiences, I help turn
              business ideas into useful digital products through thoughtful
              design and development.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
            >
              Start a project
              <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <motion.div
            {...reveal(0.12)}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-7"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className={`flex gap-4 py-5 ${
                    index !== benefits.length - 1
                      ? "border-b border-white/[0.08]"
                      : ""
                  } ${index === 0 ? "pt-1" : ""} ${
                    index === benefits.length - 1 ? "pb-1" : ""
                  }`}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-zinc-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Services heading */}
        <motion.div {...reveal()} className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">
            How I can help
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Services built around your goals.
          </h3>
        </motion.div>

        {/* Service cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                {...reveal(index * 0.07)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0a10]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#100c17] sm:p-7"
              >
                <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full" />

                <div className="mb-7 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/20">
                    <Icon size={23} strokeWidth={1.6} />
                  </div>
                  <span className="text-sm tabular-nums text-zinc-600">
                    {service.number}
                  </span>
                </div>

                <p className="text-xs font-medium text-violet-300">
                  {service.subtitle}
                </p>

                <h4 className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-violet-200">
                  {service.title}
                </h4>

                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
                  {service.description}
                </p>

                <div className="my-6 h-px bg-white/[0.07]" />

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-zinc-400 transition-colors group-hover:border-violet-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  aria-label={`Discuss a ${service.title} project`}
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-white"
                >
                  Discuss a project
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Closing CTA */}
        <motion.div
          {...reveal()}
          className="relative mt-10 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/[0.12] via-purple-500/[0.06] to-transparent p-7 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-28 size-64 rounded-full bg-violet-500/10 blur-[90px]"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                Let's work together
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Got a project in mind?
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                Have a website idea or want to explore an AI solution? Let's
                discuss what you need and how we can build it.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-violet-300/30 bg-violet-500 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
            >
              Get in touch
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

