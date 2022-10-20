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
function Test() {
  return (
    // pass the sx props https://next.material-ui.com/system/the-sx-prop
    // https://next.material-ui.com/system/basics/#responsive-values
    <Box sx={{ display: 'flex', width: { xs: 10, sm: 20 } }} color="red">
      <p>My element</p>
    </Box>
  );
}
```
