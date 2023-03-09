// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions)
		if (!session)
			return res
				.status(401)
				.json({ message: 'please sign in to fetch user posts' })

		try {
			const data = await prisma.user.findUnique({
				where: { email: session?.user?.email! },
				include: {
					post: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							Comments: true,
						},
					},
				},
			})
			res.status(200).json(data)
		} catch (err) {
			res.status(403).json({ err: 'Error occured while fetching user posts' })
		}
	}
}
