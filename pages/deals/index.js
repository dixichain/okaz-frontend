import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Deals } from '../../lib/api';

export default function DealsPage(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    async function load(){
      try{
        const page = await Deals.list({ from, to, page:1, limit:20, sort:'-deal_date' });
        setData(page);
      }catch(e){ setError(e.message); } finally{ setLoading(false); }
    }
    load();
  }, [from, to]);

  return (
    <Layout title="Deals">
      <div className="row" style={{marginBottom:8}}>
        <div>From: <input className="input" type="date" value={from} onChange={e=>setFrom(e.target.value)} /></div>
        <div>To: <input className="input" type="date" value={to} onChange={e=>setTo(e.target.value)} /></div>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th><th>Doc</th><th>Commodity</th><th>Qty</th><th>Price</th><th>Gross</th><th>Net</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map(row => (
              <tr key={row.id}>
                <td>{row.deal_date}</td>
                <td>{row.doc_no || '-'}</td>
                <td>{row.commodity || row.kind || '-'}</td>
                <td>{row.qty}</td>
                <td>{row.price}</td>
                <td>{row.gross_amount}</td>
                <td>{row.net_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
