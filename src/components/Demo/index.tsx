import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EgeriaApp } from '../App';
import { menuIcons } from '@lfai/egeria-js-commons';

import './index.scss';

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
      <h1>Egeria UI Core</h1>
    </div>

    <div>
      <Router basename={`/`}>
        <Routes>
          <Route path="/*" element={<EgeriaApp menu={menu} />} />
        </Routes>
      </Router>
    </div>
  </>;
}
