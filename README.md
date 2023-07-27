# API.BITSPACE.ORG.IN

### TO RUN

```bash
npm run start
```

### TO CREATE A MODULE

```bash
node create_module.mjs <module_name>
```
- Make sure to attach the MODULE to the APP

```ts
// Module name in import should always be capitalised
import ModuleName from "./<module_name>"

app.use(ModuleName.BASE_ROUTE, ModuleName.router);
```
