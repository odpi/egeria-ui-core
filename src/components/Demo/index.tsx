import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EgeriaApp } from '../App';
import { menuIcons } from '@lfai/egeria-js-commons';

import './index.scss';
import { EgeriaHome } from '../Home';

export function Demo() {

const menu = [
  { customIcon: menuIcons.assets, label: 'Asset Lineage', href: '/lineage' },
  { customIcon: menuIcons.glossary, label: 'Glossary View', href: '/glossary' },
  { customIcon: menuIcons.typeExplorer, label: 'Type Explorer', href: '/type-explorer' },
  { customIcon: menuIcons.assetCatalog, label: 'Asset Catalog', href: '/assets/catalog' },
  { customIcon: menuIcons.repositoryExplorer, label: 'Repository Explorer', href: '/repository-explorer' }
];

  return <>
    <div>
      <Router basename={`/`}>
        <Routes>
          <Route path="/" element={<EgeriaHome links={[]} apiUrl={'http://localhost:9000'} />}/>
          <Route path="/*" element={<EgeriaApp menu={menu} />} />
        </Routes>
      </Router>
    </div>
  </>;
}
