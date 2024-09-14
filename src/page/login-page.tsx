import { Box, Card, Container, Text, Button } from '@radix-ui/themes';
import { PersonIcon, LockClosedIcon } from '@radix-ui/react-icons';
import React from 'react';
import { TextField } from '../component/form/text-field';
import { useLogin } from '../hook/use-login';
export default function LoginPage() {
  const {
    doLogin,
    email,
    errorMessage,
    loading,
    password,
    setEmail,
    setPassword,
  } = useLogin();

  return (
    <Box>
      <Container size="1" align={'center'}>
        <Box py="9">
          <Card className="mx-auto max-w-sm">
            <Text className="m-2" size="5" data-testid="login-text">
              Login
            </Text>
            <div className="mt-2">
              <TextField
                value={email}
                onChange={({ currentTarget: { value } }) => setEmail(value)}
                placeholder="email"
                icon={<PersonIcon />}
              />
            </div>
            <div className="mt-2">
              <TextField
                value={password}
                onChange={({ currentTarget: { value } }) => setPassword(value)}
                placeholder="password"
                icon={<LockClosedIcon />}
              />
            </div>
            <div className="mt-2">
              <Button
                loading={loading}
                onClick={doLogin}
                data-testid="login-button"
              >
                Login
              </Button>
            </div>
            {errorMessage &&
              errorMessage.map((message) => (
                <div key={message}>
                  {' '}
                  <Text color="red">{message}</Text>
                </div>
              ))}
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
