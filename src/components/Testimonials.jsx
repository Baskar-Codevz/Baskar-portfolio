
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  Send,
  Star,
  MessageCircle,
  LoaderCircle,
  Sparkles,
  AlertCircle,
} from "lucide-react";

  const API_URL ="https://baskar-portfolio-bh3r.onrender.com";

const emptyForm = {
  clientName: "",
  company: "",
  role: "",
  message: "",
  rating: 5,
};

const Testimonials = () => {
  const reduceMotion = useReducedMotion();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });
  const [form, setForm] = useState(emptyForm);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setLoadError(false);

        const response = await fetch(`${API_URL}/approved`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load testimonials.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected testimonials response.");
        }

        setTestimonials(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Testimonials loading error:", error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadTestimonials();

    return () => controller.abort();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "rating" ? Number(value) : value,
    }));

    if (notice.text) {
      setNotice({ type: "", text: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setNotice({ type: "", text: "" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          clientName: form.clientName.trim(),
          company: form.company.trim(),
          role: form.role.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed.");
      }

      setNotice({
        type: "success",
        text:
          data.message ||
          "Thank you! Your feedback has been submitted for review.",
      });

      setForm(emptyForm);
      setHoverRating(0);
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error.message ||
          "Unable to connect to the server. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-white/15 bg-transparent px-0 py-3.5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-zinc-600 focus:border-violet-400";

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#070709] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/[0.12] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 -z-10 h-80 w-80 rounded-full bg-indigo-600/[0.08] blur-[120px]"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div {...reveal()} className="mb-16 md:mb-24">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-violet-400" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">
              Client feedback
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <h2 className="max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl">
              Good work speaks.
              <br />
              <span className="text-zinc-500">
                People speak louder.
              </span>
            </h2>

            <div className="max-w-md lg:justify-self-end">
              <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                Every project is a collaboration. Read genuine experiences
                from people I've worked with, or share your own feedback.
              </p>

              <a
                href="#share-feedback"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-white"
              >
                Share your experience
                <ArrowDownRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-violet-400/60 via-white/10 to-transparent md:mt-14" />
        </motion.div>

        {/* Approved testimonials */}
        <div className="mb-24">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Selected words
            </p>

            {!loading && !loadError && testimonials.length > 0 && (
              <p className="text-xs text-zinc-500">
                {testimonials.length} approved{" "}
                {testimonials.length === 1 ? "review" : "reviews"}
              </p>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-3 py-12 text-sm text-zinc-400">
              <LoaderCircle size={18} className="animate-spin text-violet-400" />
              Loading client feedback...
            </div>
          )}

          {loadError && (
            <div className="flex flex-col items-start gap-3 border-y border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-300"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    Feedback couldn't be loaded
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Please check your connection and try again.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-sm text-violet-300 underline underline-offset-4 hover:text-white"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !loadError && testimonials.length === 0 && (
            <div className="border-y border-white/10 py-12 sm:py-16">
              <Quote
                size={30}
                strokeWidth={1}
                className="mb-5 text-violet-400"
              />

              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                The first words are yet to come.
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-500">
                Once a client shares feedback and it is approved, their
                testimonial will appear here. Every review is genuine.
              </p>

              <a
                href="#share-feedback"
                className="mt-6 inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white"
              >
                Leave feedback
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}

          {!loading && !loadError && testimonials.length > 0 && (
            <div className="grid gap-x-12 md:grid-cols-2">
              {testimonials.map((item, index) => (
                <motion.article
                  key={item._id}
                  {...reveal(index * 0.08)}
                  className="group relative border-b border-white/10 py-8 sm:py-10"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <Quote
                      size={27}
                      strokeWidth={1.4}
                      className="text-violet-400 transition-transform duration-300 group-hover:-translate-y-1"
                    />

                    {item.rating != null && (
                      <div
                        className="flex gap-1"
                        aria-label={`${item.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={13}
                            className={
                              starIndex < item.rating
                                ? "fill-violet-400 text-violet-400"
                                : "text-zinc-700"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="whitespace-pre-wrap break-words text-base leading-8 text-zinc-300 sm:text-lg">
                    “{item.message}”
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/[0.08] text-sm font-medium text-violet-200">
                      {(item.clientName || "?")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {item.clientName}
                      </p>

                      {(item.role || item.company) && (
                        <p className="mt-1 truncate text-xs text-zinc-500">
                          {[item.role, item.company]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-violet-400 transition-all duration-500 group-hover:w-full" />
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Feedback form */}
        <motion.div
          id="share-feedback"
          {...reveal()}
          className="scroll-mt-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          {/* Form introduction */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <MessageCircle size={19} className="text-violet-300" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Your experience matters
              </span>
            </div>

            <h3 className="max-w-md text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
              Worked together?
              <span className="mt-1 block text-zinc-500">
                Tell your story.
              </span>
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
              Your honest feedback helps build trust and improve future
              projects. Please submit a review only if you've genuinely
              worked with me.
            </p>

            <div className="mt-8 flex items-start gap-3 border-l border-violet-400/50 pl-4">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-violet-300"
              />
              <p className="text-xs leading-6 text-zinc-500">
                Your review stays unpublished until it has been reviewed
                and approved by the admin.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative border-t border-white/10 pt-7 lg:border-t-0 lg:pt-0"
          >
            <div className="grid gap-x-8 sm:grid-cols-2">
              <div className="mb-7">
                <label
                  htmlFor="clientName"
                  className="block text-xs text-zinc-400"
                >
                  Your name <span className="text-violet-300">*</span>
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your name"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="mb-7">
                <label
                  htmlFor="company"
                  className="block text-xs text-zinc-400"
                >
                  Company / project
                </label>
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Where we worked together"
                  maxLength={100}
                />
              </div>

              <div className="mb-7 sm:col-span-2">
                <label
                  htmlFor="role"
                  className="block text-xs text-zinc-400"
                >
                  Your role <span className="text-zinc-600">(optional)</span>
                </label>
                <input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Founder, Business Owner"
                  maxLength={100}
                />
              </div>
            </div>

            {/* Interactive rating */}
            <fieldset className="mb-8">
              <legend className="mb-3 text-xs text-zinc-400">
                How was your experience?
              </legend>

              <div className="flex flex-wrap items-center gap-4">
                <div
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setHoverRating(0);
                    }
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const highlighted = star <= (hoverRating || form.rating);

                    return (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5 stars`}
                        aria-pressed={form.rating === star}
                        onClick={() =>
                          setForm((previous) => ({
                            ...previous,
                            rating: star,
                          }))
                        }
                        onMouseEnter={() => setHoverRating(star)}
                        onFocus={() => setHoverRating(star)}
                        className="rounded-sm p-1 transition-transform duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <Star
                          size={23}
                          className={`transition-colors duration-200 ${
                            highlighted
                              ? "fill-violet-400 text-violet-400"
                              : "text-zinc-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs text-zinc-500" aria-live="polite">
                  {["", "Needs improvement", "Fair", "Good", "Very good", "Excellent"][
                    hoverRating || form.rating
                  ]}
                </span>
              </div>
            </fieldset>

            <div className="mb-7">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="message"
                  className="text-xs text-zinc-400"
                >
                  Your feedback{" "}
                  <span className="text-violet-300">*</span>
                </label>

                <span
                  className={`text-[11px] ${
                    form.message.length >= 950
                      ? "text-amber-300"
                      : "text-zinc-600"
                  }`}
                >
                  {form.message.length}/1000
                </span>
              </div>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} min-h-32 resize-y`}
                placeholder="What did you appreciate about working together?"
                minLength={10}
                maxLength={1000}
                required
              />
            </div>

            {notice.text && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role={notice.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mb-6 flex items-start gap-3 border p-4 text-sm leading-6 ${
                  notice.type === "success"
                    ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
                    : "border-red-400/20 bg-red-400/[0.06] text-red-300"
                }`}
              >
                {notice.type === "success" ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                )}
                <p>{notice.text}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-violet-400 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Submitting feedback...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit feedback
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>

            <p className="mt-4 text-[11px] leading-5 text-zinc-600">
              Feedback is reviewed before publication. Please share only
              genuine experiences.
            </p>
          </form>
        </motion.div>

        {/* Closing line */}
        <div className="mt-20 flex items-center gap-3 border-t border-white/10 pt-6">
          <Sparkles size={15} className="text-violet-400" />
          <p className="text-xs text-zinc-500">
            Built on collaboration, trust, and honest feedback.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

