import React from 'react';
import { useRouter } from 'next/router';

import Loading from '../components/Loading';

const IndexPage: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/prepair');
  }, [router]);

  return <Loading />;
};

export default IndexPage;
