'use client'

import Post from '@/app/components/Post'
import { useQuery } from '@tanstack/react-query'
import { PostType } from '../../types/Post'
import axios from 'axios'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
			{post?.Comments?.map((comment) => (
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.8 }}
					transition={{ ease: 'easeOut' }}
					className='my-6 bg-white p-8 rounded-md'
					key={comment.id}
				>
					<div className='flex items-center gap-2'>
						<Image
							width={24}
							height={24}
							src={comment.user?.image}
							alt='avatar'
						/>
						<h3 className='font-bold'>{comment?.user?.name}</h3>
						<h2 className='text-sm'>{comment.createdAt}</h2>
					</div>
					<div className='py-4'>{comment.message}</div>
				</motion.div>
			))}
		</div>
	)
}
