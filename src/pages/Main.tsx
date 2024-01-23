import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';

const App: FC = () => {
  return (
    <>
      <Layout>
        <Header onLangClick={() => {}} />
      </Layout>
    </>
  );
};

export default App;
