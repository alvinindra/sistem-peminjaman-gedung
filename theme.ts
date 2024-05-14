import { Button, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'cyan',
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'md',
      },
    }),
  },
});
