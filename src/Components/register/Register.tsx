import { BackgroundImage, Container, createStyles, Paper } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 80,
    borderRadius: 30,
    width: '80%',
    height: 'auto',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '100%',
      height: 'auto',
    },
  },
}))
const Register = () => {
  const { classes } = useStyles()
  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper} fluid>
        <Paper className={classes.form} radius={0} p={30}>
          {' '}
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Register
