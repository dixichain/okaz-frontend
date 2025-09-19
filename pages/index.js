import Layout from '../components/Layout';

export default function Home(){
  return (
    <Layout title="Okaz POC">
      <p>Welcome. Use the nav above to open <b>Deals</b> or <b>Producer statement</b>.</p>
      <p>This POC talks to your FastAPI backend.</p>
    </Layout>
  );
}
