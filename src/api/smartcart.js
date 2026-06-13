const BASE = 'https://smart-cart-backend-six.vercel.app/api'

export async function fetchClusters(k = 4, algorithm = 'kmeans') {
  const res = await fetch(`${BASE}/cluster`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ k, algorithm })
  })
  if (!res.ok) throw new Error('Cluster fetch failed')
  return res.json()
}

export async function fetchElbow() {
  const res = await fetch(`${BASE}/elbow`)
  if (!res.ok) throw new Error('Elbow fetch failed')
  return res.json()
}

export async function fetchSpending() {
  const res = await fetch(`${BASE}/spending`)
  if (!res.ok) throw new Error('Spending fetch failed')
  return res.json()
}