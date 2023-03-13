// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		// const session = await getServerSession(req, res, authOptions)
		// if (!session)
		// 	return res
		// 		.status(401)
		// 		.json({ message: 'please sign in to fetch user posts' })

		try {
			const data = await prisma.post.findUnique({
				where: { id: req.query.details },
				include: {
					user: true,
					Comments: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							user: true,
						},
					},
				},
			})
			console.log('server post detail', data)
			res.status(200).json(data)
		} catch (err) {
			res.status(403).json({ err: 'Error occured while fetching user posts' })
		}
	}
}