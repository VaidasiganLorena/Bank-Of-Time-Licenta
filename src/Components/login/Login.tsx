import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Center,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'cover',
    backgroundImage: '/logo.webp',
  },

  form: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colors.primary[0],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  buttonLogin: {
    background: theme.colors.primary[0],
    borderRadius: 10,
    marginTop: 30,
  },
  input: { backgroundColor: 'white' },
  anchor: {
    color: theme.colors.primary[0],
    fontWeight: 550,
  },
}))

export function Login() {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Center>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Bine ai revenit!
          </Title>

          <TextInput
            label="Adresa de email"
            variant="filled"
            placeholder="hello@gmail.com"
            size="md"
            radius={10}
            classNames={{ input: classes.input }}
          />
          <PasswordInput
            label="Parola"
            variant="filled"
            placeholder="Parola ta ..."
            mt="md"
            size="md"
            radius={10}
            classNames={{ input: classes.input }}
          />
          <Button fullWidth className={classes.buttonLogin}>
            Autentificare
          </Button>

          <Text align="center" mt="md">
            Nu ești membru ?{' '}
            <Anchor<'a'>
              href="#"
              className={classes.anchor}
              onClick={(event) => event.preventDefault()}
            >
              Crează-ți cont!
            </Anchor>
          </Text>
        </Paper>
      </Center>
    </div>
  )
}
