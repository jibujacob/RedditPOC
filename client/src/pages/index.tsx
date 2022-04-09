import { withUrqlClient } from 'next-urql';

import Navbar from "../components/navbar"
import { useGetPostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{data}] = useGetPostsQuery();
  
  return (
    <>
      <Navbar/>
      <div>hello world</div>
      <br/>
      {!data ? null : data.posts.map(post =>  <div key={post.id}>{post.title}</div>)}
    </>
  )
}


export default withUrqlClient(createUrqlClient,{ssr:true})(Index)
