import matter from "gray-matter";

// Eagerly load all markdown files from the posts directory at build time.
// Vite resolves this glob statically — no dynamic imports at runtime.
const rawFiles = import.meta.glob("../blog/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export interface PostMeta {
    slug: string;
    title: string;
    date: string;         // ISO date string, e.g. "2026-05-11"
    description: string;
}

export interface Post extends PostMeta {
    content: string;      // raw markdown body (without frontmatter)
}

function parsePost(raw: string, filePath: string): Post {
    const { data, content } = matter(raw);
    const slug =
        data.slug ||
        filePath
            .split("/")
            .pop()!
            .replace(/\.md$/, "");
    return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ? String(data.date).slice(0, 10) : "",
        description: data.description ?? "",
        content,
    };
}

function getSortedPosts(): Post[] {
    return Object.entries(rawFiles)
        .map(([path, raw]) => parsePost(raw, path))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
    return getSortedPosts().map(({ content: _c, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
    return getSortedPosts().find((p) => p.slug === slug);
}
