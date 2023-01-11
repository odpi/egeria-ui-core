import {
  AppShell,
  useMantineTheme
} from '@mantine/core';
import {NotificationsProvider, showNotification} from '@mantine/notifications';
import {useEffect} from 'react';

import {EgeriaHeader} from '../Header';
import {EgeriaNavbar} from '../NavbarMinimal';

interface Props {
  main?: React.ReactNode;
  menu?: Array<Object>;
  single?: boolean;
}

const listenForAPIErrors = (e: any) => {
  showNotification({
    autoClose: 10000,
    color: 'red',
    title: `${e.detail.status}: ${e.detail.statusText}` || 'Server Error',
    message: `Something went wrong, try reloading the page.`,
  });
};

export function EgeriaApp(props: React.PropsWithChildren<Props>) {
  const {single, menu, main} = props;
  const theme = useMantineTheme();

  useEffect(() => {
    document.addEventListener('EGERIA_API_ERROR', listenForAPIErrors);

    return function cleanup() {
      document.removeEventListener('EGERIA_API_ERROR', listenForAPIErrors);
    };
  }, []);

  return <>
    <NotificationsProvider>
      {single && <>
        {main}
      </>}

      {!single && <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
            }
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={<EgeriaNavbar menu={menu ? menu : []}/>}
          header={<EgeriaHeader/>}
      >
        <div style={{width: '100%', height: '100%', zIndex: 50, position: 'relative'}}>
          {main}
        </div>
      </AppShell>}
    </NotificationsProvider>
  </>;
}
