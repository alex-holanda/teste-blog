import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={'l-wrapper'}>
      <Header />
      <main className={'l-main'}>
        <Component {...pageProps} />
      </main>
      <footer className={'l-footer'}>
        <div></div>
      </footer>
    </div>
  );
}
export default MyApp;
