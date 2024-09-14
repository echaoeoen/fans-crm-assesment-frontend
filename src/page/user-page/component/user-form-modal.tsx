import React, { useState } from 'react';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { TextField } from '../../../component/form/text-field';
import { useCreateUser } from '../../../hook/use-user';

export interface UserFormModalProps {
  onSuccess?: () => void;
}

export default function UserFormModal({ onSuccess }: UserFormModalProps) {
  const { createUser, errorMessage, loading, setUser, user } = useCreateUser();
  const [open, setOpen] = useState(false);
  const save = async () => {
    const result = await createUser();
    if (result) {
      onSuccess && onSuccess();
      setOpen(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button loading={loading}>Add New</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add user</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add new user to the system
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              type="email"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Phone
            </Text>
            <TextField
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              placeholder="Enter your phone"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </label>
          {errorMessage &&
            errorMessage.map((message) => (
              <div key={message}>
                {' '}
                <Text color="red">{message}</Text>
              </div>
            ))}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={loading} onClick={save}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
