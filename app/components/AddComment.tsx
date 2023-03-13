'use client'

import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type props = {
	id: string
}

type Comment = {
	postId: string
	title: string
}

export default function AddComment({ id }: props) {
	const [message, setMessage] = useState('')
	const [isDisabled, setIsDisabled] = useState(false)
	let addCommentID = useRef<string | undefined>()
	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		async (data: Comment) => await axios.post('/api/posts/addComment', data),
		{
			onSuccess: (data) => {
				console.log(data)
				queryClient.invalidateQueries(['detail-post'])
				setMessage('')
				setIsDisabled(false)
				toast.success('Comment created', { id: addCommentID.current })
			},
			onError: (error) => {
				console.log(error)
			},
		}
	)

	const addComment = (e: React.FormEvent) => {
		e.preventDefault()
		setIsDisabled(true)
		addCommentID.current = toast.loading('Creating comment...')
		mutate({ title: message, postId: id })
	}

	return (
		<form className='my-8' onSubmit={addComment}>
			<h3>Add Comment</h3>
			<div className='flex flex-col my-2'>
				<input
					type='text'
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					name='title'
					className='p-4 text-lg rounded-md my-2'
				/>
			</div>

			<div className='flex items-center gap-2'>
				<button
					disabled={isDisabled}
					className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
					type='submit'
				>
					Add Comment 🚀
				</button>
				<p
					className={`font-bold ${
						message.length > 300 ? 'text-red-700' : 'text-gray-700'
					}`}
				>
					{`${message.length}/300`}
				</p>
			</div>
		</form>
	)
}
