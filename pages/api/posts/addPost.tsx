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

		const title: string = req.body.title

		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email! },
		})

		if (title.length > 300)
			return res.status(403).json({ message: 'Please write a shorter post' })

		if (!title.length)
			return res.status(403).json({ message: 'Please include a post title' })

		// Create post
		try {
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser!.id,
				},
			})
			res.status(200).json(result)
		} catch (err) {
			res.status(403).json({ err: 'Error has occured whilst making a post' })
		}
	}
}
