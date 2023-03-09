import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin')
	}
	return (
		<main>
			<h1 className='text-2x1 font-bold'>Welcome back</h1>
		</main>
	)
}
