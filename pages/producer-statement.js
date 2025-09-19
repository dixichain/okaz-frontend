import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Parties, Reports } from '../lib/api';

export default function ProducerStatement(){
  const [producers, setProducers] = useState([]);
  const [producerId, setProducerId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Parties.list({ role:'producer' }).then(setProducers).catch(err=>setError(err.message));
  }, []);

  async function load(){
    if(!producerId) return;
    setLoading(true);
    setError(null);
    try{
      const q = new URLSearchParams({ producer_id: producerId, ...(from && {from}), ...(to && {to}) });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'}/reports/statements/producer?${q}`);
      if(!res.ok){ throw new Error(await res.text()); }
      const json = await res.json();
      setData(json);
    }catch(e){
      setError(e.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <Layout title="Producer statement">
      <div className="row" style={{marginBottom:8}}>
        <select className="input" value={producerId} onChange={e=>setProducerId(e.target.value)}>
          <option value="">Select producer…</option>
          {producers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div>From: <input className="input" type="date" value={from} onChange={e=>setFrom(e.target.value)} /></div>
        <div>To: <input className="input" type="date" value={to} onChange={e=>setTo(e.target.value)} /></div>
        <button className="btn" onClick={load}>Load</button>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {data && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th><th>Doc</th><th>Commodity</th><th>Qty</th><th>Price</th><th>Gross</th><th>Fees</th><th>Comm</th><th>Net</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map(r => (
                <tr key={r.id}>
                  <td>{r.deal_date}</td>
                  <td>{r.doc_no || '-'}</td>
                  <td>{r.commodity || r.kind || '-'}</td>
                  <td>{r.qty}</td>
                  <td>{r.price}</td>
                  <td>{r.gross_amount}</td>
                  <td>{r.fees_amount}</td>
                  <td>{r.commission_amount}</td>
                  <td>{r.net_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card">
            <b>Subtotal</b><br/>
            Gross: {data.subtotal.gross} | Fees: {data.subtotal.fees} | Comm: {data.subtotal.commission} | Net: {data.subtotal.net}
          </div>
        </div>
      )}
    </Layout>
  );
}
