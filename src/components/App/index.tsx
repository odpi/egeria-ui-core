import { EgeriaLogin } from '../Login';

import './index.scss';

export function App() {
  return <>
    <div>
      <h1>Egeria UI Core</h1>
    </div>

    <div>
      <h1>Login</h1>

      <EgeriaLogin loginCallback={() => {
                     window.location.href = `http://localhost:3001/`;
                   }}
                   apiUrl={`http://localhost:9000`} />
    </div>
  </>;
}
