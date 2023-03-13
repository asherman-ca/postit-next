'use client'

import Post from '@/app/components/Post'
import { useQuery } from '@tanstack/react-query'
import { PostType } from '../../types/Post'
import axios from 'axios'
import AddComment from '@/app/components/AddComment'

type URL = {
	params: {
		slug: string
	}
}

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`)
	return response.data
}

export default function PostDetail(url: URL) {
	const { data: post, isLoading } = useQuery<PostType>({
		queryKey: ['detail-post'],
		queryFn: () => fetchDetails(url.params.slug),
	})
	if (isLoading) return 'Loading...'
	console.log('postdetail data', post)

	return (
		<div>
			<Post
				comments={post!.Comments}
				key={post!.id}
				name={post!.user.name}
				avatar={post!.user.image}
				postTitle={post!.title}
				id={post!.id}
			/>
			<AddComment id={post!.id} />
		</div>
	)
}
