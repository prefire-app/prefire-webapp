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

/**
 * Minimal YAML frontmatter parser — handles simple key: value pairs only.
 * Avoids gray-matter / js-yaml which require Buffer (Node.js only).
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw };
    const data: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const colon = line.indexOf(":");
        if (colon === -1) continue;
        const key = line.slice(0, colon).trim();
        const value = line.slice(colon + 1).trim();
        if (key) data[key] = value;
    }
    return { data, content: match[2] };
}

function parsePost(raw: string, filePath: string): Post {
    const { data, content } = parseFrontmatter(raw);
    const slug =
        data.slug ||
        filePath
            .split("/")
            .pop()!
            .replace(/\.md$/, "");
    return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
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
