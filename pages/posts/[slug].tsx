import React from 'react';
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { getAllPostIds, getPostData } from '../../libs/posts';

interface Props {
  userAgent?: string;
}

const Post: NextPage<Props> = ({ postData }: any) => (
  <div>
    {postData.title}
    <br/>
    {postData.id}
    <br/>
    {postData.date}
    <br/>
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </div>
);

export default Post;


export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // ...
  console.log(params);
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};
