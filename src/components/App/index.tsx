import { AppShell, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import { EgeriaHeader } from '../Header';
import { EgeriaNavbar } from '../NavbarMinimal';

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
    message: e.detail && e.detail.message ? `${e.detail.message}` : `Something went wrong, try reloading the page.`,
  });
};

export function EgeriaApp(props: React.PropsWithChildren<Props>) {
  const {single, menu, main} = props;
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const navigateTo = (e: any): void => {
    console.log('navigateTo');

    if(e.detail && e.detail.path) {
      navigate(e.detail.path);
    }
  };

  const egeriaEvents = (e: any): void => {
    switch(e.detail.type) {
      case 'EGERIA_NAVIGATE_TO':
        navigateTo(e);
        break;
      default:
        console.log(`EVENT ${e.detail.type} NOT MAPPED`);
    }
  };

  useEffect(() => {
    document.addEventListener('EGERIA_API_ERROR', listenForAPIErrors);
    document.addEventListener('EGERIA_EVENTS', egeriaEvents);

    return function cleanup() {
      document.removeEventListener('EGERIA_API_ERROR', listenForAPIErrors);
      document.removeEventListener('EGERIA_EVENTS', egeriaEvents);
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
