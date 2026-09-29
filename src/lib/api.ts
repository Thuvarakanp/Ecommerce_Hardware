export type Product = {
  id: number; sku: string; name: string; brand: string; category: string
  price_cents: number; stock: number; description: string; featured: number
}
export type Order = {
  code: string; name: string; email: string; address: string; total_cents: number; status: string; created_at: string
  items: { name: string; unit_cents: number; qty: number }[]
}

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init)
  const body = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(body.error ?? `Request failed (${r.status})`)
  return body as T
}

export const api = {
  products: (params: Record<string, string> = {}) => req<Product[]>('/api/products?' + new URLSearchParams(params)),
  product: (id: string) => req<Product>(`/api/products/${id}`),
  categories: () => req<{ name: string; count: number }[]>('/api/categories'),
  order: (code: string) => req<Order>(`/api/orders/${code}`),
  placeOrder: (body: { name: string; email: string; address: string; items: { productId: number; qty: number }[] }) =>
    req<{ code: string; total_cents: number }>('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
}

export const money = (cents: number) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
