import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

import { Headers, TabNavigation } from '../components';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Headers test="test" />
      <TabNavigation />
    </div>
  );
}
