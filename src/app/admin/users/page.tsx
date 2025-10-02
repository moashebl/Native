import { Metadata } from 'next'
import Link from 'next/link'

import { auth } from '@/../auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/db/models/user.model'
import { formatId } from '@/lib/utils'
import { isMainAdmin } from '@/lib/role-utils'
import { isCurrentUserMainAdmin } from '@/lib/role-server-utils'

export const metadata: Metadata = {
  title: 'Admin Users',
}

export default async function AdminUser(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const session = await auth()
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')
  const page = Number(searchParams.page) || 1
  const users = await getAllUsers({
    page,
  })
  const currentUserIsMainAdmin = await isCurrentUserMainAdmin()
  
  return (
    <div className='space-y-2'>
      <h1 className='h1-bold'>Users</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data.map((user: IUser) => {
              const userIsMainAdmin = isMainAdmin(user.email)
              const canEditThisUser = currentUserIsMainAdmin || !userIsMainAdmin
              const canDeleteThisUser = currentUserIsMainAdmin && !userIsMainAdmin && user.email !== session?.user?.email
              
              return (
                <TableRow key={user._id}>
                  <TableCell>{formatId(user._id)}</TableCell>
                  <TableCell>
                    {user.name}
                    {userIsMainAdmin && (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Main Admin
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className='flex gap-1'>
                    {canEditThisUser && (
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/users/${user._id}`}>Edit</Link>
                      </Button>
                    )}
                    {canDeleteThisUser && (
                      <DeleteDialog id={user._id} action={deleteUser} />
                    )}
                    {!canEditThisUser && !canDeleteThisUser && (
                      <span className="text-sm text-muted-foreground">No actions available</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {users?.totalPages > 1 && (
          <Pagination page={page} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  )
}