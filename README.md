# Official Cloud RAMP SDK

This package exists to help users write their code for cloud-ramp applications. A user must write their code using this package before uploading it to [our website](cloudramp.org) to assure it can be properly deployed.

Your code will be compiled using AssemblyScript, which is a subset of TypeScript that can be safely compiled to a WebAssembly module. This can be done using the command `npm run asbuild`, and your module will be located in the `outFile` location, as listed in the `asconfig.json` file.

## Usage

1. Download the module

A user must first initialize a new project and run `npm i cloud-ramp-sdk`. If no `package.json` file exists in your project, we will initialize a blank one for you. In addition, we will add a number of scripts that are to be run when building your code. Those are: `asbuild`, `asbuild:release`, and `asbuild:debug`.

2. Write the code

Once you have installed our package, you should see a directory structure as follows:
```
assembly/
| env.ts 
| index.ts
| sdk.ts
| tsconfig.json
| user.ts
node_modules/
asconfig.json
package-lock.json
package.json
```

You should only need to worry about modifying the code within `user.ts`, as it contains the necessary functions to run a Cloud-RAMP applications. If you do not care about running code on one or more of these events, simply leave it blank.

In order to write you code, you will need to access the set of exported functions that we give you in `sdk.ts`. An example function can be seen below:

```typescript
export function onJoin(event: WSEvent): void {
  log("User " + event.connectionId + " called onJoin");

  const ctx = new Context();
  const setRes = ctx.db.set("userId", event.connectionId);
  if (setRes.isError()) {
    log("Error setting userId: " + setRes.error);
    return;
  }

  const getRes = ctx.db.get("userId");
  if (getRes.isError()) {
    log("Error getting userId: " + getRes.error);
    return;
  }

  log("User ID fetched from database: " + getRes.data);
}
```

3. Compile your module

Once you have written your code, you will need to compile it to a WebAssembly module so that we can properly run it. To do this, run the command `npm run asbuild`. Once this is complete, you can find your module where the `release.outFile` property of the `asconfig.json` file points. By default, it will be in `build/release.wasm`.

4. Upload your code

If you have not already made an account on [our website](cloudramp.org), that will be the first step. Once this is complete, navigate to the dashboard, hit the "Create new service" button, and upload your code. You can also modify existing services by selecting the name of a previous upload, and uploading a new module.