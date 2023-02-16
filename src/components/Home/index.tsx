import {
  Container,
  Group,
  Header,
  TextInput,
  createStyles,
  MultiSelect,
  LoadingOverlay,
  Paper,
  Checkbox,
  Button
} from '@mantine/core';

import {
  Search
} from 'tabler-icons-react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  currentJwt,
  logout,
  goHome,
  fetchTypes,
  isStringLonger,
  isArrayEmpty,
  ABOUT_PATH,
  ASSET_CATALOG_PATH,
  QUERY_MIN_LENGTH,
  hasComponent,
  VISIBLE_COMPONENTS
} from '@lfai/egeria-js-commons';
import { RequirePermissions } from '../RequirePermissions';

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
}));

export const links = [
  {
    "link": "/",
    "label": "Home"
  },
  ...(hasComponent(VISIBLE_COMPONENTS.ASSET_CATALOG) ? [{
    "link": ASSET_CATALOG_PATH,
    "label": "Catalog"
  }] : []),
  {
    "link": ABOUT_PATH,
    "label": "About"
  }
];

const emptyTypesData: Array<any> = [];

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export function EgeriaHome(props: HeaderMiddleProps) {
  const {links} = props;
  const navigate = useNavigate();

  const [q, setQ] = useState({value: '', isValid: false, isPristine: true});
  const [types, setTypes]: [any, any] = useState({value: [], isValid: false, isPristine: true});

  const {classes} = useStyles();
  const isLoggedIn = currentJwt();

  const [exactMatch, setExactMatch] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const [typesData, setTypesData] = useState({
    isLoading: true,
    typesData: [...emptyTypesData]
  } as any);

  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    const bringTypes = async () => {
      const rawTypesData = await fetchTypes();

      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    };

    bringTypes();
  }, []);

  const items = links.map((link, index) => (
    <NavLink className={classes.link} to={link.link} key={index}>{link.label}</NavLink>
  ));

  const submit = () => {
    if (q.isValid && types.isValid) {
      navigate(`${ASSET_CATALOG_PATH}?q=${q.value}&types=${types.value.join(',')}&exactMatch=${exactMatch}&caseSensitive=${caseSensitive}`);
    }
  }

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      submit();
    }
  };

  return (<>
    <Header height={56} mb={100}>
      <Container className={classes.inner}>
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Group spacing={0} position="right" noWrap>
          { isLoggedIn && <Button variant="light" onClick={() => { logout(goHome); }}>
            Logout
          </Button> }

          { !isLoggedIn && <NavLink to={`/login`}>
            <Button variant="light">
              Login
            </Button>
          </NavLink> }
        </Group>
      </Container>
    </Header>

    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} mb={50}>
      <NavLink to={'/'}><img src="/egeria-logo.svg" alt="Egeria" title="Egeria" style={{height:150}}/></NavLink>
    </Container>

    <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_CATALOG} showAccessDenied={false} element={
      <Container>
        <Paper shadow="md" radius="lg">
          <div style={{display: 'flex', padding: 20, flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <TextInput
                style={{width: '69%'}}
                icon={<Search size={18}/>}
                radius="lg"
                size="md"
                value={q.value}
                disabled={typesData.typesData.length === 0}
                required
                error={!q.isPristine && !q.isValid ? 'Query must be at least ' + QUERY_MIN_LENGTH + ' characters' : ''}
                onKeyPress={handleKeyPress}
                onChange={(event: any) => setQ({
                  value: event.currentTarget.value,
                  isPristine: false,
                  isValid: isStringLonger(event.currentTarget.value, QUERY_MIN_LENGTH),
                })}
                placeholder="Search terms"
                rightSectionWidth={42}
            />

            <MultiSelect
                data={typesData.typesData}
                disabled={typesData.typesData.length === 0}
                value={types.value}
                error={!types.isPristine && !types.isValid ? 'At least one type has to be selected' : ''}
                onChange={(value: any) => setTypes({
                  value: [...value],
                  isPristine: false,
                  isValid: !isArrayEmpty(value)
                })}
                radius="lg"
                size="md"
                placeholder="Type"
                style={{width: '30%'}}
            />
          </div>
          <div style={{display: 'flex', padding: 20, paddingTop: 0, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{width: '40%', display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
              <Checkbox mr="xl"
                        label={'Exact match'}
                        checked={exactMatch}
                        disabled={typesData.typesData.length === 0}
                        onChange={(event) => setExactMatch(event.currentTarget.checked)}/>

              <Checkbox mr="xl"
                        label={'Case sensitive'}
                        checked={caseSensitive}
                        disabled={typesData.typesData.length === 0}
                        onChange={(event) => setCaseSensitive(event.currentTarget.checked)}/>
            </div>
            <div style={{width: '60%'}}>
              <Button fullWidth
                      onClick={() => submit()}
                      disabled={typesData.typesData.length === 0}>Search</Button>
            </div>
          </div>
          </Paper>
      </Container> }
    />
    <LoadingOverlay visible={typesData.isLoading} />
  </>);
}
