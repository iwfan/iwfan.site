import React from 'react';
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { getPostData, getAllPostSlugs } from '../../libs/posts'

interface Props {
  userAgent?: string;
}

const Post: NextPage<Props> = ({ postData }: any) => (
  <div>
    {postData.title}
    <br/>
    {postData.tags}
    <br/>
    {postData.date}
    <br/>
    <div dangerouslySetInnerHTML={{ __html: postData.content }} />
  </div>
);

export default Post;


export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // ...
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const paths = await getAllPostSlugs();
  return {
    paths,
    fallback: false
  };
};
