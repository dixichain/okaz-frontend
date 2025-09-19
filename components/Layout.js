export default function Layout({title='Okaz', children}){
  return (
    <div className="container">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h1 className="h1">{title}</h1>
        <nav className="row">
          <a className="btn" href="/">Home</a>
          <a className="btn" href="/deals">Deals</a>
          <a className="btn" href="/producer-statement">Producer statement</a>
        </nav>
      </div>
      <div className="card">
        {children}
      </div>
      <div className="small">API base: {process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'}</div>
    </div>
  );
}
