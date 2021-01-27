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

We use [rsuits](https://rsuitejs.com) for UI styles.
Please use this component for Button, Input and all element given for us.

To style a `div` or `p` :

```js
import styled from '@emotion/styled';

const MyCustomDiv = styled.div(
  // style not depend on props
  {
    display: 'flex',
    alignItems: 'center',
  },
  // style depent on props with function
  // give the props
  (props) => ({
    backgroundColor: props.color,
  })
);

function Test() {
  return (
    // pass the props
    <MyCustomDiv color="red">
      <p>My element</p>
    </MyCustomDiv>
  );
}
```

OR

```js
// warn : import must be exactly like this
// @emtion/core export too a css, but not the correct
import { css } from '@emotion/css';

function Test() {
  return (
    // create a class with this css values
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <p>My element</p>
    </div>
  );
}
```

To style a `Button`, `Input` etc... from `rsuite` :

```js
import styled from '@emotion/styled';
import { Button } from 'rsuite';

const StyledButton = styled(Button)({
  fontSize: 18,
});

function Test() {
  return (
    <StyledButton /* props of `Button` can be used here https://rsuitejs.com/components/button/*/
    >
      My button
    </StyledButton>
  );
}
```
