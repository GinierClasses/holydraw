# Run this APP

In a Terminal, go in Folder `thyrel-web`.

Run :

```bash
npm i
npm run start
```

## File structure

`Routes.tsx` : file to display component depends on the current route

## Style

We use [material-i](https://material-ui.com) for UI styles. Please use this
component for Button, Input and all element given for us.

To style a `div` or `p` :

```js
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  div: {
    backgroundColor: 'red',
  },
}));

function Test() {
  const classes = useStyles();
  return (
    // pass the props
    <div className={classes.div} color="red">
      <p>My element</p>
    </div>
  );
}
```

OR with propre

```tsx
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, { isSelected: boolean }>(theme => ({
  div: {
    backgroundColor: props => (props.isSelected ? 'red' : 'green'),
    // theme has all style for the app stored on `theme.ts`
    border: theme.palette.primary.main,
  },
}));

function Test({ isSelected }) {
  const classes = useStyles({ isSelected });
  return (
    // pass the props
    <div className={classes.div} color="red">
      <p>My element</p>
    </div>
  );
}
```
