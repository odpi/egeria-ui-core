import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EgeriaApp } from '../App';
import { eNavigateTo, menuIcons, VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';

import './index.scss';
import { EgeriaHome, links } from '../Home';
import { EgeriaAbout } from '../About';
import { EgeriaLogin } from '../Login';
import { RequirePermissions } from '../RequirePermissions';
import { EgeriaPageNotFound } from '../EgeriaPageNotFound';
import { EgeriaServerUnavailable } from '../EgeriaServerUnavailable';

export function Demo() {
  const menu = [
    {customIcon: menuIcons.assets, label: 'Asset Lineage', href: '/lineage', component: VISIBLE_COMPONENTS.ASSET_LINEAGE},
    {customIcon: menuIcons.glossary, label: 'Glossary View', href: '/glossary', component: VISIBLE_COMPONENTS.GLOSSARY},
    {customIcon: menuIcons.typeExplorer, label: 'Type Explorer', href: '/type-explorer', component: VISIBLE_COMPONENTS.TYPE_EXPLORER},
    {customIcon: menuIcons.assetCatalog, label: 'Asset Catalog', href: '/assets/catalog', component: VISIBLE_COMPONENTS.ASSET_CATALOG},
    {customIcon: menuIcons.repositoryExplorer, label: 'Repository Explorer', href: '/repository-explorer', component: VISIBLE_COMPONENTS.REPOSITORY_EXPLORER}
  ];

  console.log(process.env.REACT_APP_API_URL);

  return <>
    <div>
      <Router basename={`/`}>
        <Routes>
          <Route path="/assets/catalog" element={<EgeriaApp main={<>Test</>}/>}/>

          <Route path="/" element={<EgeriaApp single={true} main={<EgeriaHome links={links}/>}/>}/>
          <Route path="/login" element={<EgeriaApp single={true} main={<EgeriaLogin loginCallback={() => eNavigateTo('/')}/>}/>}/>
          <Route path="/about" element={<EgeriaApp menu={menu} main={
            <RequirePermissions showAccessDenied={true} component={VISIBLE_COMPONENTS.ABOUT} element={<EgeriaAbout/>}/>}/>
          }/>
          <Route path="/server-unavailable" element={<EgeriaApp single={true} main={
            <EgeriaServerUnavailable/>
          } /> } />

          <Route path="/*" element={<EgeriaPageNotFound/> } />
        </Routes>
    </Router>
  </div>
  </>;
}
