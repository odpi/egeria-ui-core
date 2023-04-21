import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  inner: {
    position: 'relative',
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 30,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function EgeriaServerUnavailable() {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Something went wrong...</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            The server is unavailable at the moment, please wait a few more minutes and try again.
          </Text>
          <Group position="center">
            <Button size="md" onClick={() => navigate('/') }>Take me back to Egeria home</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
