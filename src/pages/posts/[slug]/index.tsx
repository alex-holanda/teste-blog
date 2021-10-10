import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';

import { ParsedUrlQuery } from 'querystring';

import { getPrismicClient } from '../../../services/prismic';

import styles from './styles.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>

        <meta property='og:title' content={post.title} />
        <meta property='og:site_name' content={'sitename'} />
        <meta property='og:url' content={'sitename.com'} />
        <meta property='og:description' content={post.content.slice(0, 54)} />
        <meta property='og:type' content={'article'} />
        <meta property='og:image' content={''} />
      </Head>
      <main>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
  async ({ params, req }) => {
    if (!params) return { notFound: true };
    const { slug } = params;

    const prismic = getPrismicClient(req);
    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
      slug: '',
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(
        String(response.last_publication_date)
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };

    return {
      props: {
        post,
      },
    };
  };
