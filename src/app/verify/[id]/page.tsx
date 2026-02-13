'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function VerifyPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/certificate/verify/${id}`)
      .then(res => res.json())
      .then(setData)
  }, [id])

  if (!data) return <div>Loading...</div>

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Certificate Verified ✅
      </h1>

      <p className="mt-4">
        <strong>{data.student}</strong> successfully completed
      </p>

      <p className="font-semibold">{data.course}</p>
      <p>Issued on {new Date(data.issuedAt).toDateString()}</p>
    </div>
  )
}
