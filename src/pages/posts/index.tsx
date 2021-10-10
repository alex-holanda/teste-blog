import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  excerpt: string;
  updateAt: string;
};

interface PostsPorps {
  posts: Post[];
}

export default function Posts({ posts }: PostsPorps) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main>
        <article className={styles.posts}>
          {posts.map((post) => {
            return (
              <Link href={`/posts/${post.slug}`} key={post.slug}>
                <a>
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    width={200}
                    height={100}
                    objectFit={'contain'}
                  />
                  <time>{post.updateAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            );
          })}
        </article>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'publication')],
    {
      fetch: ['publication.title', 'publication.content', 'publication.image'],
      pageSize: 100,
    }
  );

  const posts = response.results.map((publication) => ({
    slug: publication.uid,
    title: RichText.asText(publication.data.title),
    image: {
      url: publication.data.image.url,
      alt: publication.data.image.alt,
    },
    excerpt:
      publication.data.content.find(
        (content: any) => content.type === 'paragraph'
      )?.text ?? '',
    updateAt: new Date(
      String(publication.last_publication_date)
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return {
    props: {
      posts,
    },
  };
};
