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
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            AI insights for{" "}
            <span className="font-serif italic font-normal">
              business leaders
            </span>
          </h1>
          <p className="text-text-secondary max-w-lg text-[0.9375rem] leading-[1.8]">
            Practical advice on AI adoption, strategy, and ROI — written for
            CEOs and decision-makers, not engineers.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet. Check back soon.</p>
        ) : (
          <>
            {/* Featured post — large hero card */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block mb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {featuredPost.cover && (
                    <div className="lg:col-span-7 rounded-2xl overflow-hidden img-reveal">
                      <Image
                        src={featuredPost.cover}
                        alt={featuredPost.title}
                        width={900}
                        height={500}
                        className="w-full object-cover aspect-[16/9] rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className={featuredPost.cover ? "lg:col-span-5" : "lg:col-span-12"}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-accent bg-accent-muted px-2.5 py-1 rounded-md">
                        {featuredPost.tag}
                      </span>
                      <span className="font-mono text-xs text-text-muted">
                        {featuredPost.readingTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors leading-snug tracking-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-5">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-muted">
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Remaining posts */}
            {remainingPosts.length > 0 && (
              <div className="border-t border-border pt-16">
                <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-10">
                  More articles
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
                  {remainingPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-bg-card hover:bg-bg-card-hover transition-colors flex flex-col"
                    >
                      {post.cover && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.cover}
                            alt={post.title}
                            width={800}
                            height={450}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-8 flex flex-col flex-grow">
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
