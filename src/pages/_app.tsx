import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={'l-wrapper'}>
      <header className={'l-header'}>
        <Header />
      </header>
      <main className={'l-main'}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
