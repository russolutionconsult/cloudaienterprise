import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import ReadingProgress from "@/components/ReadingProgress";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen pt-24 pb-16">
        {/* Cover image — full bleed */}
        {post.cover && (
          <div className="max-w-4xl mx-auto px-6 mb-10">
            <div className="rounded-2xl overflow-hidden relative">
              <Image
                src={post.cover}
                alt={post.title}
                width={900}
                height={480}
                className="w-full object-cover rounded-2xl aspect-[16/8]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent rounded-2xl" />
            </div>
          </div>
        )}

        <article className="max-w-[680px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-accent bg-accent-muted px-2.5 py-1 rounded-md">
                {post.tag}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Author line */}
            <div className="flex items-center gap-3 pb-8 border-b border-border">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                alt="CloudAI Enterprise"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">CloudAI Enterprise</p>
                <time className="text-text-muted text-xs">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="blog-content">
            <MDXRemote source={post.content} />
          </div>

          {/* Quiz CTA Block */}
          <div className="mt-16 bg-bg-card border border-border rounded-2xl p-8 md:p-10">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                Free Assessment
              </span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                How AI-ready is your business?
              </h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md">
                Take our free 2-minute quiz and get a personalized score with
                actionable recommendations for your company.
              </p>
              <Link
                href="/#quiz"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Take the Free Assessment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="text-lg font-bold mb-6">Keep reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-bg-card border border-border rounded-xl p-5 hover:border-border-hover hover:bg-bg-card-hover transition-all"
                  >
                    <span className="font-mono text-[10px] text-accent bg-accent-muted px-2 py-0.5 rounded">
                      {related.tag}
                    </span>
                    <h4 className="text-sm font-semibold mt-3 mb-2 group-hover:text-accent transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <span className="font-mono text-xs text-text-muted">
                      {related.readingTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
