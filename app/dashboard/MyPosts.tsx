'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { AuthPosts } from '../types/AuthPosts'

const authPosts = async () => {
	const response = await axios.get('/api/posts/authPosts')
	return response.data
}

export default function MyPosts() {
	const { data, error, isLoading } = useQuery<AuthPosts[]>({
		queryFn: authPosts,
		queryKey: ['authPosts'],
	})

	console.log('data', data)

	return <div>My Posts</div>
}
