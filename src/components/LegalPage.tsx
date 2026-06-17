import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { getLegalDoc } from "../lib/legal";

interface Props {
    slug: string;
}

function LegalPage({ slug }: Props) {
    const doc = getLegalDoc(slug);

    useEffect(() => {
        if (!doc) return;
        const previous = document.title;
        document.title = `${doc.title} \u2014 Prefire`;
        return () => {
            document.title = previous;
        };
    }, [doc]);

    if (!doc) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <p className="text-[#efefd1] text-xl">Page not found.</p>
            </div>
        );
    }

    const html = marked(doc.content) as string;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-[#efefd1] mb-2">{doc.title}</h1>
            <p className="text-[#d8bd8a] text-xs mb-8">Last updated: {doc.date}</p>
            <div
                className="prose prose-sm max-w-none
                    text-[#efefd1]/90
                    prose-headings:text-[#efefd1]
                    prose-strong:text-[#efefd1]
                    prose-a:text-[#d8bd8a]
                    prose-hr:border-[#aa5042]
                    prose-li:marker:text-[#d8bd8a]
                    prose-table:text-[#efefd1]/90
                    prose-th:text-[#efefd1]
                    prose-th:border-[#aa5042]
                    prose-td:border-[#aa5042]"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

// Wrapper that reads slug from the URL; lets routes use either a fixed slug
// (e.g. <LegalPage slug="terms" />) or a dynamic /:slug param.
export function LegalPageRoute() {
    const { slug } = useParams<{ slug: string }>();
    return <LegalPage slug={slug ?? ""} />;
}

export default LegalPage;
