'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { getAdminUsers, type AdminUser } from '@/services/adminUserService'

import Table from '@/components/ui/Table'
import THead from '@/components/ui/Table/THead'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        getAdminUsers().then(setUsers)
    }, [])

    const filteredUsers = useMemo(() => {
        const q = search.toLowerCase()

        return users.filter(
            (u) =>
                (u.name ?? '').toLowerCase().includes(q) ||
                (u.email ?? '').toLowerCase().includes(q),
        )
    }, [users, search])

    return (
        <AdminGuard>
            <AdminPageHeader title="Users" />

            {/* Search */}
            <div className="mb-6 max-w-sm">
                <Input
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <Table>
                <THead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Signup Date</Th>
                        <Th>Courses</Th>
                        <Th>Paid</Th>
                        <Th>Status</Th>
                    </Tr>
                </THead>

                <TBody>
                    {filteredUsers.map((user) => (
                        <Tr key={user._id}>
                            <Td className="font-medium">{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </Td>
                            <Td>{user.ordersCount}</Td>
                            <Td>₹ {user.totalPaid}</Td>
                            <Td>
                                {user.ordersCount > 0 ? (
                                    <Badge color="green">Paid</Badge>
                                ) : (
                                    <Badge color="gray">Not Purchased</Badge>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </AdminGuard>
    )
}
