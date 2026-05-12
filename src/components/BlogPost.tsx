import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug } from "../lib/blog";
import { marked } from "marked";

function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = slug ? getPostBySlug(slug) : undefined;

    if (!post) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <p className="text-[#efefd1] text-xl mb-4">Post not found.</p>
                <button
                    onClick={() => navigate("/blog")}
                    className="text-[#d8bd8a] hover:underline text-sm"
                >
                    ← Back to Blog
                </button>
            </div>
        );
    }

    const html = marked(post.content) as string;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Link to="/blog" className="text-[#d8bd8a] hover:underline text-sm">
                ← Back to Blog
            </Link>
            <h1 className="text-3xl font-bold text-[#efefd1] mt-6 mb-2">
                {post.title}
            </h1>
            <p className="text-[#d8bd8a] text-xs mb-8">{post.date}</p>
            <div
                className="prose prose-sm max-w-none
                    text-[#efefd1]/90
                    prose-headings:text-[#efefd1]
                    prose-strong:text-[#efefd1]
                    prose-a:text-[#d8bd8a]
                    prose-hr:border-[#aa5042]
                    prose-li:marker:text-[#d8bd8a]"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

export default BlogPost;
