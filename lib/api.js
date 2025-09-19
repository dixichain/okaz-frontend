const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';

async function api(path, opts = {}){
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {'Content-Type': 'application/json'},
    cache: 'no-store',
    ...opts,
  });
  if(!res.ok){
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export const Deals = {
  list: (params={}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/deals${q ? '?' + q : ''}`);
  },
  get: (id) => api(`/deals/${id}`),
  create: (payload) => api(`/deals`, {method:'POST', body: JSON.stringify(payload)}),
  update: (id, payload) => api(`/deals/${id}`, {method:'PUT', body: JSON.stringify(payload)}),
};

export const Parties = {
  list: (params={}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/parties${q ? '?' + q : ''}`);
  }
};

export const Reports = {
  salesSummary: (params={}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/reports/sales-summary${q ? '?' + q : ''}`);
  },
  producerStatement: (params={}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/reports/statements/producer${q ? '?' + q : ''}`);
  }
};

export default api;
