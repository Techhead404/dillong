import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
//import NAV from "../components/nav";
import edc1 from "../assets/edc/edc1.webp";
import edc2 from "../assets/edc/edc2.webp";


const inter = Roboto_Mono({ subsets: ["latin"] });

export default function BlogPost() {
    const router = useRouter();
    const { blogname } = router.query;

    interface BlogPost {
        blogname: string;
        blogdate: string;
        blogbody: string;
    }





    const [post, setPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('Router is ready:', router.isReady); // Debugging router readiness
        console.log('Blogname from query:', blogname); // Debugging blogname

        // Wait until the router is ready and blogname is defined
        if (router.isReady && blogname) {
            // Fetch the specific blog post by blogname
            async function fetchBlogPost() {
                try {
                    console.log(`Fetching blog post with blogname: ${blogname}`); // Debugging fetch start
                    const response = await fetch(`/api/blog-api?blogname=${blogname}`);
                    
                    if (!response.ok) throw new Error('Failed to fetch blog post');
                    
                    const result = await response.json();
                    console.log('Fetch result:', result); // Log fetched data

                    if (result && result.blogname) {
                        setPost(result);
                    } else {
                        throw new Error('Blog post data format is incorrect');
                    }
                } catch (err) {
                    console.error('Error fetching blog post:', err);
                    setError('Failed to load blog post');
                }
            }

            fetchBlogPost();
        }
    }, [router.isReady, blogname]); // Depend on router.isReady and blogname

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!post) return <p>Loading...</p>;

    return (
        <main className="min-h-screen bg-gray-900 py-10 px-5">
            <article className="prose lg:prose-lg mx-auto text-gray-200">
        <span dangerouslySetInnerHTML={{ __html: post.blogbody }} />
        <style jsx>{`
            main {
              font-family: ${inter.style.fontFamily};
            }
            .prose {
              max-width: 800px;
              color: #e5e5e5;
              line-height: 1.7;
            }
            h1 {
              color: #f5f5f5;
            }
            .prose p {
              margin-top: 1rem;
              margin-bottom: 1.5rem;
            }
            .prose a {
              color: #63b3ed;
              text-decoration: underline;
            }
            .prose a:hover {
              color: #3182ce;
            }
            .prose p,
            .prose h1,
            .prose h2,
            .prose h3,
            .prose h4 {
              color: #d1d1d1;
            }
            pre {
              background-color: #333;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
              margin-bottom: 1rem;
            }
          `}</style>
          </article>
          </main>
    )
}
