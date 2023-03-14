// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/client'

export default async function handler(req, res) {
	if (req.method === 'GET') {
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
