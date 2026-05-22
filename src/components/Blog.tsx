import { getAllPosts } from "../lib/blog";
import { Link } from "react-router-dom";

function Blog() {
    const posts = getAllPosts();

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-[#efefd1] mb-8">Blog</h1>
            {posts.length === 0 ? (
                <p className="text-[#efefd1]/60">No posts yet. Check back soon.</p>
            ) : (
                <ul className="space-y-6">
                    {posts.map((post) => (
                        <li
                            key={post.slug}
                            className="border border-[#aa5042] rounded-lg p-5 hover:bg-[#aa5042]/20 transition-colors"
                        >
                            <Link to={`/blog/${post.slug}`} className="group block">
                                <p className="text-[#d8bd8a] text-xs mb-1">{post.date}</p>
                                <h2 className="text-[#efefd1] text-xl font-semibold group-hover:underline mb-2">
                                    {post.title}
                                </h2>
                                {post.description && (
                                    <p className="text-[#efefd1]/70 text-sm leading-relaxed">
                                        {post.description}
                                    </p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Blog;
