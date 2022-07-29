import {
  AppShell,
  useMantineTheme
} from '@mantine/core';

import { EgeriaHeader } from '../Header';
import { EgeriaNavbar } from '../NavbarMinimal';

interface Props {
  main?: React.ReactNode;
  menu?: Array<Object>;
}

export function EgeriaApp(props: React.PropsWithChildren<Props>) {
  const theme = useMantineTheme();
  const { menu } = props;

  return <>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<EgeriaNavbar menu={menu ? menu : []} />}
      header={<EgeriaHeader />}
    >
      <div style={{width:'100%', height:'100%'}}>
        { props.main }
      </div>
    </AppShell>
  </>;
}
