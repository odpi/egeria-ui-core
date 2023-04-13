import { Navbar, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Logout,
  InfoCircle,
  UserCircle
} from 'tabler-icons-react';
import { NavLink } from 'react-router-dom';
import { VISIBLE_COMPONENTS, logout, token } from '@lfai/egeria-js-commons';
import { RequirePermissions } from '../RequirePermissions';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon?: TablerIcon;
  customIcon?: string;
  href?: string;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, customIcon, label, href, active = false, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <NavLink style={{color: 'inherit'}} to={href || '#'}>
          { customIcon && <img src={`data:image/svg+xml;utf8,${encodeURIComponent(customIcon)}`} alt=""/>}

          { Icon && <Icon /> }
        </NavLink>
      </UnstyledButton>
    </Tooltip>
  );
}

interface Props {
  menu: any;
}

export function EgeriaNavbar(props: Props) {
  const { menu } = props;
  const isLoggedIn = token.getValue();

  const links = menu.map((link: any, index: any) => (
    <RequirePermissions key={index} component={link.component} showAccessDenied={false} element={
      <NavbarLink {...link} href={link.href} />
    } />
  ));

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar p="md" width={{ base: 80, sm: 80, lg: 80 }}>
      <Navbar.Section grow>
        <Group>
          {links}
        </Group>
      </Navbar.Section>

      <Navbar.Section>
        { isLoggedIn && <Group>
          <NavbarLink icon={UserCircle} label="Profile" href="/profile" />
        </Group> }

        <RequirePermissions component={VISIBLE_COMPONENTS.ABOUT} showAccessDenied={false} element={
          <Group>
            <NavbarLink icon={InfoCircle} label="About" href="/about" />
          </Group>
        } />

        { isLoggedIn && <Group>
          <NavbarLink icon={Logout} label="Logout" onClick={() => handleLogout()}/>
        </Group> }
      </Navbar.Section>
    </Navbar>
  );
}