
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  LogIn,
  LogOut,
  Star,
  CheckCircle,
  XCircle,
  LoaderCircle,
  MessageSquareQuote,
  RefreshCw,
  Search,
  Trash2,
  AlertTriangle,
  Clock3,
  CheckCheck,
  Eye,
  EyeOff,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/testimonials";

const AdminTestimonials = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    () => sessionStorage.getItem("testimonialAdminToken") || ""
  );

  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [deletingAll, setDeletingAll] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("info");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const request = useCallback(async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  }, []);

  const showNotice = (message, type = "info") => {
    setNotice(message);
    setNoticeType(type);
  };

  const logout = useCallback(() => {
    sessionStorage.removeItem("testimonialAdminToken");
    setToken("");
    setPassword("");
    setPending([]);
    setSearch("");
    setConfirmDelete(false);
    showNotice("You have been logged out.", "success");
  }, []);

  const loadPending = useCallback(
    async (authToken = token) => {
      if (!authToken) return;

      setLoading(true);
      setNotice("");

      try {
        const data = await request(`${API_URL}/admin/pending`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setPending(
          Array.isArray(data) ? data : data.testimonials || []
        );
      } catch (error) {
        if (
          error.message.toLowerCase().includes("token") ||
          error.message.toLowerCase().includes("unauthorized") ||
          error.message.toLowerCase().includes("expired")
        ) {
          logout();
        }

        showNotice(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [token, request, logout]
  );

  useEffect(() => {
    if (token) loadPending(token);
  }, [token, loadPending]);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const data = await request(`${API_URL}/admin/login`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (!data.token) {
        throw new Error("The server did not return an admin token.");
      }

      sessionStorage.setItem("testimonialAdminToken", data.token);
      setToken(data.token);
      setPassword("");
      showNotice("Admin login successful.", "success");
    } catch (error) {
      showNotice(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setBusyId(id);
    setNotice("");

    try {
      await request(`${API_URL}/admin/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });

      setPending((items) => items.filter((item) => item._id !== id));

      showNotice(
        status === "approved"
          ? "Testimonial approved successfully."
          : "Testimonial rejected successfully.",
        "success"
      );
    } catch (error) {
      showNotice(error.message, "error");
    } finally {
      setBusyId("");
    }
  };

  // Permanently deletes every testimonial in the database.
  // Requires the protected backend DELETE route shown below.
    const deleteAllReviews = async () => {
  console.log("DELETE BUTTON CLICKED");

  const confirmed = window.confirm(
    "Are you sure you want to delete ALL testimonials?"
  );

  if (!confirmed) {
    console.log("Deletion cancelled");
    return;
  }

  console.log("Confirmation accepted");
  console.log("Token exists:", Boolean(token));

  try {
    const response = await fetch(
      `${API_URL}/admin/all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Delete response status:", response.status);

    const data = await response.json().catch(() => ({}));
    console.log("Delete response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Delete request failed");
    }

    setPending([]);
    setConfirmDelete(false);
    showNotice(
      `Deleted ${data.deletedCount ?? "all"} testimonials.`,
      "success"
    );
  } catch (error) {
    console.error("Delete error:", error);
    showNotice(error.message || "Could not delete testimonials.", "error");
  }
};

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return pending;

    return pending.filter((item) =>
      [
        item.clientName,
        item.role,
        item.company,
        item.message,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [pending, search]);

  const noticeStyles = {
    info: "border-violet-400/20 bg-violet-400/10 text-violet-200",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    error: "border-red-400/20 bg-red-400/10 text-red-200",
  };

  return (
    <section className="min-h-screen bg-[#07070a] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <ShieldCheck size={15} />
              SECURE ADMIN PANEL
            </span>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Testimonials<span className="text-violet-400">.</span>
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-400">
              Manage submissions and decide which customer reviews
              appear on your portfolio.
            </p>
          </div>

          {token && (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </header>

        {/* Notifications */}
        <AnimatePresence>
          {notice && (
            <motion.div
              key={notice}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                noticeStyles[noticeType] || noticeStyles.info
              }`}
            >
              {noticeType === "error" ? (
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              ) : (
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
              )}

              <span className="flex-1">{notice}</span>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="text-current opacity-70 hover:opacity-100"
              >
                <XCircle size={17} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login */}
        {!token ? (
          <motion.form
            onSubmit={login}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#101015] p-6 shadow-2xl shadow-black/20 sm:p-9"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <ShieldCheck size={27} />
            </div>

            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="mb-7 mt-2 text-sm leading-6 text-zinc-400">
              Sign in to manage your portfolio feedback.
            </p>

            <label
              htmlFor="adminPassword"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Admin password
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-black/30 pr-3 transition focus-within:border-violet-400/60">
              <input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-zinc-600"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-zinc-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-semibold transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <LogIn size={18} />
              )}
              {loading ? "Signing in..." : "Sign in securely"}
            </button>
          </motion.form>
        ) : (
          <>
            {/* Dashboard summary */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#101015] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    Pending reviews
                  </span>
                  <span className="rounded-xl bg-amber-400/10 p-2 text-amber-300">
                    <Clock3 size={19} />
                  </span>
                </div>

                <p className="mt-3 text-4xl font-semibold">
                  {pending.length}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Reviews waiting for your decision
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#101015] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    Displayed in this list
                  </span>
                  <span className="rounded-xl bg-violet-400/10 p-2 text-violet-300">
                    <MessageSquareQuote size={19} />
                  </span>
                </div>

                <p className="mt-3 text-4xl font-semibold">
                  {filteredReviews.length}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Pending reviews matching your search
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#101015] p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative min-w-0 flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name, company, role or message..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-400/50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => loadPending()}
                  disabled={loading || deletingAll}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  disabled={deletingAll || loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete all reviews
                </button>
              </div>
            </div>

            {/* Review list */}
            {loading && pending.length === 0 ? (
              <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-zinc-400">
                <LoaderCircle size={20} className="animate-spin" />
                Loading pending testimonials...
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#101015] px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
                  <MessageSquareQuote size={26} />
                </div>

                <h2 className="text-lg font-semibold">
                  {search ? "No matching reviews" : "No pending testimonials"}
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                  {search
                    ? "Try a different search term."
                    : "You're all caught up. New submissions will appear here."}
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 text-sm text-violet-300 hover:text-violet-200"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredReviews.map((item, index) => (
                  <motion.article
                    key={item._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.2) }}
                    className="group rounded-2xl border border-white/10 bg-[#101015] p-5 transition duration-300 hover:border-violet-400/25 sm:p-6"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">
                          {item.clientName || "Anonymous"}
                        </h3>
                        <p className="mt-1 break-words text-xs leading-5 text-zinc-500">
                          {[item.role, item.company]
                            .filter(Boolean)
                            .join(" · ") || "No role or company provided"}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                        Pending
                      </span>
                    </div>

                    <div
                      className="mb-4 flex gap-1 text-violet-300"
                      aria-label={`${Number(item.rating) || 0} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={
                            index < (Number(item.rating) || 0)
                              ? "fill-violet-400 text-violet-400"
                              : "text-zinc-700"
                          }
                        />
                      ))}
                    </div>

                    <blockquote className="min-h-20 whitespace-pre-wrap break-words text-sm leading-7 text-zinc-300">
                      “{item.message}”
                    </blockquote>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => updateStatus(item._id, "approved")}
                        disabled={busyId === item._id || deletingAll}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400/10 px-3 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50"
                      >
                        {busyId === item._id ? (
                          <LoaderCircle size={17} className="animate-spin" />
                        ) : (
                          <CheckCheck size={17} />
                        )}
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(item._id, "rejected")}
                        disabled={busyId === item._id || deletingAll}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-400/10 px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/20 disabled:opacity-50"
                      >
                        <XCircle size={17} />
                        Reject
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Permanent deletion confirmation */}
      <AnimatePresence>
        {confirmDelete && token && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !deletingAll) {
                setConfirmDelete(false);
              }
            }}
          >
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              aria-describedby="delete-description"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-md rounded-3xl border border-red-400/20 bg-[#111115] p-6 shadow-2xl sm:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
                <AlertTriangle size={24} />
              </div>

              <h2 id="delete-title" className="text-xl font-semibold">
                Delete every testimonial?
              </h2>

              <p
                id="delete-description"
                className="mt-3 text-sm leading-6 text-zinc-400"
              >
                This permanently deletes all reviews from the database,
                including approved, pending, and rejected testimonials.
                This action cannot be undone.
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  disabled={deletingAll}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteAllReviews}
                  disabled={deletingAll}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingAll ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Trash2 size={17} />
                  )}
                  {deletingAll ? "Deleting..." : "Yes, delete all"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminTestimonials;