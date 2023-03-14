'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { AuthPosts } from '../types/AuthPosts'
import EditPost from './EditPost'

const fetchAuthPosts = async () => {
	const response = await axios.get('/api/posts/authPosts')
	return response.data
}

export default function MyPosts() {
	const { data, error, isLoading } = useQuery<AuthPosts>({
		queryFn: fetchAuthPosts,
		queryKey: ['auth-posts'],
	})

	if (isLoading) return <h1>Posts are loading...</h1>
	return (
		<div>
			{data?.post?.map((post) => (
				<EditPost
					id={post.id}
					key={post.id}
					avatar={data.image}
					name={data.name}
					title={post.title}
					comments={post.Comments}
				/>
			))}
		</div>
	)
}
