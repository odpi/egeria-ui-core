import {
  ActionIcon,
  Container,
  Group,
  Header,
  TextInput,
  createStyles,
  useMantineTheme,
  MultiSelect,
  LoadingOverlay,
  Paper,
  Title,
  Text
} from '@mantine/core';

import {
  Search,
  ArrowRight,
  ArrowLeft,
  BrandGithub,
  BrandSlack,
  Logout,
  Login
} from 'tabler-icons-react';

import { FeaturesGrid } from '../Features';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { currentJwt, logout, goHome, fetchTypes } from '@lfai/egeria-js-commons';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },

  innerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  }
}));

export const links = [
  {
    "link": "/",
    "label": "Home"
  },
  {
    "link": "/assets/catalog",
    "label": "Catalog"
  },
  {
    "link": "/about",
    "label": "About"
  }
];

const emptyTypesData: Array<any> = [];

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
  apiUrl?: string;
}

export function EgeriaHome(props: HeaderMiddleProps) {
  const { links, apiUrl } = props;
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [types, setTypes]: [any, any] = useState([]);

  const theme = useMantineTheme();
  const { classes} = useStyles();
  const isLoggedIn = currentJwt();

  const [typesData, setTypesData] = useState({
    isLoading: true,
    typesData: [...emptyTypesData]
  } as any);

  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    const bringTypes = async () => {
      const rawTypesData = await fetchTypes(apiUrl);

      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    };

    bringTypes();
  }, [apiUrl]);

  const items = links.map((link, index) => (
    <NavLink className={classes.link} to={link.link} key={index}>{link.label}</NavLink>
  ));

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      navigate(`/assets/catalog?q=${q}&types=${types.join(',')}`)
    }
  };

  return (<>
    <Header height={56} mb={15}>
      <Container className={classes.inner}>
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <img src="/egeria-logo.svg" alt="Egeria" title="Egeria" style={{height:40}}/>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg"
                      title="Github"
                      onClick={() => { window.open('https://github.com/odpi', '_blank'); }}>
            <BrandGithub size={18} />
          </ActionIcon>
          <ActionIcon size="lg"
                      title="Slack"
                      onClick={() => { window.open('https://lfaifoundation.slack.com', '_blank'); }}>
            <BrandSlack size={18} />
          </ActionIcon>

          { isLoggedIn && <ActionIcon size="lg" title={'Logout'} onClick={() => { logout(goHome); }}>
                            <Logout size={18} />
                          </ActionIcon> }

          { !isLoggedIn && <NavLink to={`/login`}>
                            <ActionIcon size="lg" title={`Login`}>
                              <Login size={18} />
                            </ActionIcon>
                          </NavLink> }
        </Group>
      </Container>
    </Header>

    <Container>
      <div className={classes.innerHeader}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Egeria Project
          </Title>
          <Text color="dimmed" mt="md" style={{textAlign: 'justify'}}>
            Open source project dedicated to enabling teams to collaborate by making metadata open and automatically exchanged between tools and platforms, no matter which vendor they come from.
          </Text>
        </div>

        <Paper shadow="md" style={{width: 560}} className={classes.image}>
          <iframe width="560"
                height="315"
                src="https://www.youtube.com/embed/dgeOAJF6jq8?controls=0&amp;start=1464"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </Paper>
      </div>
    </Container>

    <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      <MultiSelect
        data={typesData.typesData}
        value={types}
        onChange={(value: any) => setTypes([...value])}
        radius="xl"
        size="md"
        placeholder="Type"
        style={{width:'30%'}}
      />
      <TextInput
        style={{width:'69%'}}
        icon={<Search size={18} />}
        radius="xl"
        size="md"
        value={q}
        onKeyPress={handleKeyPress}
        onChange={(event: any) => setQ(event.currentTarget.value)}
        rightSection={
          <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
            {theme.dir === 'ltr' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </ActionIcon>
        }
        placeholder="Search terms"
        rightSectionWidth={42}
      />
    </Container>

    <FeaturesGrid />

    <LoadingOverlay visible={typesData.isLoading} />
  </>);
}
