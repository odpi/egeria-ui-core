import {
  Center,
  Group,
  Header,
  createStyles
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

import { MainSearch } from '../MainSearch';

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

interface Props {
  apiUrl?: string;
}

export function EgeriaHeader(props: Props) {
  const { classes } = useStyles();
  const { apiUrl } = props;

  return (
    <Header height={60} p="md" className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <NavLink to={'/'} style={{height:50}}><img src="/egeria-logo.svg" alt="Egeria" title="Egeria" style={{height:50}} /></NavLink>
        </Group>

        <Center style={{ width: '100%' }}>
          <MainSearch apiUrl={apiUrl} />
        </Center>
      </div>
    </Header>
  );
}