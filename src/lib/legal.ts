// Eagerly load all legal markdown files at build time.
const rawFiles = import.meta.glob("../legal/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export interface LegalDoc {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw };
    const data: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const colon = line.indexOf(":");
        if (colon === -1) continue;
        const key = line.slice(0, colon).trim();
        const value = line.slice(colon + 1).trim();
        // eslint-disable-next-line security/detect-object-injection -- key parsed from build-time markdown frontmatter
        if (key) data[key] = value;
    }
    return { data, content: match[2] };
}

function parseDoc(raw: string, filePath: string): LegalDoc {
    const { data, content } = parseFrontmatter(raw);
    const slug = filePath.split("/").pop()!.replace(/\.md$/, "");
    return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        content,
    };
}

const docs: Record<string, LegalDoc> = Object.fromEntries(
    Object.entries(rawFiles).map(([path, raw]) => {
        const doc = parseDoc(raw, path);
        return [doc.slug, doc];
    }),
);

export function getLegalDoc(slug: string): LegalDoc | undefined {
    // eslint-disable-next-line security/detect-object-injection -- docs is a build-time map of known slugs
    return docs[slug];
}
