import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EgeriaApp } from '../App';
import { menuIcons } from '@lfai/egeria-js-commons';

import './index.scss';
import { EgeriaHome, links } from '../Home';
import { EgeriaAbout } from '../About';

export function Demo() {

const menu = [
  { customIcon: menuIcons.assets, label: 'Asset Lineage', href: '/lineage' },
  { customIcon: menuIcons.glossary, label: 'Glossary View', href: '/glossary' },
  { customIcon: menuIcons.typeExplorer, label: 'Type Explorer', href: '/type-explorer' },
  { customIcon: menuIcons.assetCatalog, label: 'Asset Catalog', href: '/assets/catalog' },
  { customIcon: menuIcons.repositoryExplorer, label: 'Repository Explorer', href: '/repository-explorer' }
];

  console.log(process.env.REACT_APP_API_URL);

  return <>
    <div>
      <Router basename={`/`}>
        <Routes>
          <Route path="/" element={<EgeriaHome links={links} />}/>
          <Route path="/*" element={<EgeriaApp menu={menu} main={
            <Routes>
              <Route path={"/about"} element={<EgeriaAbout />} />
            </Routes> } />} />
        </Routes>
      </Router>
    </div>
  </>;
}
