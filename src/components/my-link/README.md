# `<my-link/>`

Internal link component.

When it's clicked, it changes current path using History API and fires `popstate` event.

You **CANNOT** change the value of `href` since it isn't be observed because of simplicity.

## Attributes

| Name   | Data type | Description                           |
| ------ | --------- | ------------------------------------- |
| `href` | String    | Target path. DO NOT specify full URL. |
