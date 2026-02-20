import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI adoption, strategy, and ROI for business leaders. Practical advice from the CloudAI Enterprise team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-wider text-accent uppercase">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            AI insights for{" "}
            <span className="font-serif italic">business leaders</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Practical advice on AI adoption, strategy, and ROI — written for
            CEOs and decision-makers, not engineers.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-secondary text-center">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-bg-card border border-border hover:border-border-hover rounded-2xl transition-all hover:bg-bg-card-hover flex flex-col overflow-hidden"
              >
                {/* Cover image */}
                {post.cover && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                  </div>
                )}

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-accent bg-accent-muted px-2.5 py-1 rounded-md">
                      {post.tag}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-mono text-xs text-text-muted">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
