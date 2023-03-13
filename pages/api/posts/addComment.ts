// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions)
		if (!session)
			return res.status(401).json({ message: 'please sign in to make post' })

		console.log('body', req.body)

		const message: string = req.body.title

		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email! },
		})

		if (message.length > 300)
			return res.status(403).json({ message: 'Please write a shorter comment' })

		if (!message.length)
			return res.status(403).json({ message: 'Please include a comment' })

		// Create post
		try {
			const result = await prisma.comment.create({
				data: {
					message: message,
					userId: prismaUser!.id,
					postId: req.body.postId,
				},
			})
			res.status(200).json(result)
		} catch (err) {
			res.status(403).json({ err: 'Error has occured whilst making a comment' })
		}
	}
}
