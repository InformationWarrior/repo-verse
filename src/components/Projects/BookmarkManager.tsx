"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  starred: boolean;
  createdAt: number;
};

type Draft = Omit<Bookmark, "id" | "createdAt" | "starred"> & {
  starred?: boolean;
};

const STORAGE_KEY = "repoverse:bookmarks:v1";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function normalizeUrl(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    // Allow user to paste without protocol
    const u = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return u.toString();
  } catch {
    return trimmed;
  }
}
function isValidUrl(u: string) {
  try {
    new URL(u);
    return true;
  } catch {
    return false;
  }
}
function faviconFor(url: string) {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${u.origin}`;
  } catch {
    return "";
  }
}

const seed: Bookmark[] = [
  {
    id: uid(),
    title: "Google",
    url: "https://www.google.com",
    category: "Search",
    tags: ["search", "tools"],
    starred: true,
    createdAt: Date.now() - 100000,
  },
  {
    id: uid(),
    title: "Huge Icons",
    url: "https://hugeicons.com",
    category: "Design",
    tags: ["icons", "ui"],
    starred: false,
    createdAt: Date.now() - 90000,
  },
  {
    id: uid(),
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "Dev",
    tags: ["docs", "web"],
    starred: true,
    createdAt: Date.now() - 80000,
  },
]; 

export default function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({
    title: "",
    url: "",
    category: "",
    tags: [],
    starred: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage (seed if empty)
  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        setBookmarks(JSON.parse(raw));
        return;
      } catch {}
    }
    setBookmarks(seed);
  }, []);
  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Derived: all tags / categories
  const allTags = useMemo(() => {
    const m = new Map<string, number>();
    bookmarks.forEach((b) =>
      b.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1))
    );
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]); // by freq
  }, [bookmarks]);

  const allCategories = useMemo(() => {
    const m = new Map<string, number>();
    bookmarks.forEach((b) =>
      m.set(
        b.category || "Unsorted",
        (m.get(b.category || "Unsorted") ?? 0) + 1
      )
    );
    return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [bookmarks]);

  // Filter & group
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookmarks.filter((b) => {
      if (q) {
        const hay = `${b.title} ${b.url} ${b.category} ${b.tags.join(
          " "
        )}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (tagFilter && !b.tags.includes(tagFilter)) return false;
      if (categoryFilter && (b.category || "Unsorted") !== categoryFilter)
        return false;
      return true;
    });
  }, [bookmarks, query, tagFilter, categoryFilter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Bookmark[]>();
    filtered.forEach((b) => {
      const key = b.category || "Unsorted";
      const arr = groups.get(key) ?? [];
      arr.push(b);
      groups.set(key, arr);
    });
    // Sort inside group: starred first, then alpha
    const sorted = Array.from(groups.entries()).map(([k, arr]) => [
      k,
      arr
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => Number(b.starred) - Number(a.starred)),
    ]) as [string, Bookmark[]][];
    // Sort categories alpha (keep Unsorted last)
    sorted.sort((a, b) => {
      if (a[0] === "Unsorted") return 1;
      if (b[0] === "Unsorted") return -1;
      return a[0].localeCompare(b[0]);
    });
    return sorted;
  }, [filtered]);

  // CRUD
  function openCreate() {
    setEditId(null);
    setDraft({ title: "", url: "", category: "", tags: [], starred: false });
    setModalOpen(true);
  }
  function openEdit(b: Bookmark) {
    setEditId(b.id);
    setDraft({
      title: b.title,
      url: b.url,
      category: b.category,
      tags: b.tags,
      starred: b.starred,
    });
    setModalOpen(true);
  }
  function saveDraft() {
    const t = draft.title.trim();
    const u = normalizeUrl(draft.url);
    const c = draft.category.trim();
    const tags = draft.tags.map((x) => x.trim()).filter(Boolean);
    if (!t || !u || !isValidUrl(u))
      return alert(
        "Please provide a valid Title and URL (e.g. https://example.com)."
      );

    if (editId) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === editId
            ? {
                ...b,
                title: t,
                url: u,
                category: c,
                tags,
                starred: !!draft.starred,
              }
            : b
        )
      );
    } else {
      setBookmarks((prev) => [
        ...prev,
        {
          id: uid(),
          title: t,
          url: u,
          category: c,
          tags,
          starred: !!draft.starred,
          createdAt: Date.now(),
        },
      ]);
    }
    setModalOpen(false);
  }
  function remove(id: string) {
    if (!confirm("Delete this bookmark?")) return;
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }
  function toggleStar(id: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, starred: !b.starred } : b))
    );
  }

  // Import / Export
  function exportJson() {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Bookmark[];
        if (!Array.isArray(data)) throw new Error("Invalid file");
        // Basic shape check
        setBookmarks(
          data
            .filter((b) => b.id && b.title && b.url)
            .map((b) => ({
              ...b,
              createdAt: b.createdAt ?? Date.now(),
              starred: !!b.starred,
              tags: Array.isArray(b.tags) ? b.tags : [],
              category: b.category ?? "",
            }))
        );
      } catch {
        alert("Invalid JSON file.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-2xl font-bold">Bookmark Manager</h1>
        <button
          onClick={openCreate}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          + Add
        </button>
        <button
          onClick={exportJson}
          className="rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-600"
        >
          Export
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-300">
          Import
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importJson}
            className="hidden"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, url, tag…"
          className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Tags:</span>
          <button
            onClick={() => setTagFilter(null)}
            className={`rounded-full px-3 py-1 text-xs ${
              tagFilter === null
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            All
          </button>
          {allTags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
              className={`rounded-full px-3 py-1 text-xs ${
                tagFilter === tag
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
              title={`${count} bookmark(s)`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Category:</span>
          <button
            onClick={() => setCategoryFilter(null)}
            className={`rounded-full px-3 py-1 text-xs ${
              categoryFilter === null
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            All
          </button>
          {allCategories.map(([cat]) => (
            <button
              key={cat}
              onClick={() =>
                setCategoryFilter(categoryFilter === cat ? null : cat)
              }
              className={`rounded-full px-3 py-1 text-xs ${
                categoryFilter === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-8">
        {grouped.map(([category, items]) => (
          <section key={category}>
            <header className="mb-2 flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {category}
              </h2>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700">
                {items.length}
              </span>
            </header>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((b) => (
                <li
                  key={b.id}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={faviconFor(b.url)}
                      alt=""
                      className="mt-0.5 size-5 rounded-sm"
                      onError={(e) =>
                        (e.currentTarget.style.visibility = "hidden")
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-sm font-semibold text-blue-700 hover:underline"
                          title={b.url}
                        >
                          {b.title}
                        </a>
                        {b.starred && (
                          <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-bold text-yellow-700">
                            ★
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1">
                        {b.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {b.url}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => toggleStar(b.id)}
                        title={b.starred ? "Unstar" : "Star"}
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          b.starred
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        ★
                      </button>
                      <button
                        onClick={() => openEdit(b)}
                        className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(b.id)}
                        className="rounded bg-rose-500 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-sm text-slate-500">No matches.</li>
              )}
            </ul>
          </section>
        ))}
        {grouped.length === 0 && (
          <p className="text-sm text-slate-500">
            No bookmarks yet. Click “Add”.
          </p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {editId ? "Edit Bookmark" : "Add Bookmark"}
            </h3>
            <div className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-600">
                  Title
                </span>
                <input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, title: e.target.value }))
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                  placeholder="My favorite site"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-600">URL</span>
                <input
                  value={draft.url}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, url: e.target.value }))
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-600">
                  Category
                </span>
                <input
                  value={draft.category}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, category: e.target.value }))
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                  placeholder="Dev / Design / Search …"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-600">
                  Tags (comma separated)
                </span>
                <input
                  value={draft.tags.join(", ")}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      tags: e.target.value
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                  placeholder="docs, ui, tools"
                />
              </label>
              <label className="mt-1 inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!draft.starred}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, starred: e.target.checked }))
                  }
                />
                Star this bookmark
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={saveDraft}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
