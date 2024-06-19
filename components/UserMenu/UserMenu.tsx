import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Text, UnstyledButton } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  deskripsi: string;
  icon?: React.ReactNode;
}

const UserMenu = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, deskripsi, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        {/* <Avatar src={image} size={32} radius="xl" /> */}

        <div style={{ flex: 1 }}>
          <Text size="sm" lineClamp={1} fw={500} tt="capitalize">
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {deskripsi}
          </Text>
        </div>

        {icon || <IconChevronDown size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

export default UserMenu;
