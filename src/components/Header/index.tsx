import { ASSET_CATALOG_PATH, VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';
import {
  Center,
  Group,
  Header,
  createStyles
} from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';

import { MainSearch } from '../MainSearch';
import { RequirePermissions } from '../RequirePermissions';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  search: {
    width: 500,
    [theme.fn.smallerThan('sm')]: {
      width: 200,
    },
    [theme.fn.largerThan('md')]: {
      width: 800
    },
  },
}));

export function EgeriaHeader() {
  const location = useLocation();
  const { classes } = useStyles();

  return (
    <Header height={60} p="md" className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <NavLink to={'/'} style={{height:50}}><img src="/egeria-logo.svg" alt="Egeria" title="Egeria" style={{height:50}} /></NavLink>
        </Group>

        { location.pathname !== ASSET_CATALOG_PATH && <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_CATALOG} showAccessDenied={false} element={<Center style={{ width: '100%' }}>
          <MainSearch />
        </Center> } /> }
      </div>
    </Header>
  );
}