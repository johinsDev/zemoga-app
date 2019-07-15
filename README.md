<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/320px-JSON_vector_logo.svg.png"  alt="Logo" width="25%">
</div>

## Zemoga app JSON-PLACEHOLDER

Zemoga app for json placeholder api.

# run

Run yarn run start

[Yarn](https://github.com/yarnpkg/)

```sh
npx run start

```

and open simulator

# Demo

<div align="center">
    <img src="https://i.ibb.co/7WQrdxW/image.png"  alt="Logo" width="25%">
    <img src="https://i.ibb.co/8dJQXgs/image.png"  alt="Logo" width="25%">
    <img src="https://i.ibb.co/VLqzVBq/image.png"  alt="Logo" width="25%">
</div>

# Features

- **React navigation** [react-routing](https://github.com/ReactTraining/react-router) simple routing
- **Ramda** [ramda](https://github.com/ramda/ramda)
- **Native base** [NAtive-base](https://github.com/GeekyAnts/NativeBase)
- **Axios** [axios](https://github.com/axios/axios)
- **Travis** [travis](https://github.com/axios/axios)
- **expo** [expo](https://github.com/expo/expo)

Expo is a tool that facilitates the development and accelerates it, the problem is that you lose control over the native apis, but for a demo this is perfect

native base e suna very complete and customizable component library, for short-range projects it is perfect

react navigation is the library most used for navigation and routing in native react, although there are better alternatives to improve performance for small or medium projects is ideal

ramda is a functional programming utility that makes the code more legible, reusable and simple

# Organization

Modules structure

```
.
├──/src
│
│   ├──/modules -> a module is a set of views and components, for example the authentication module has submodules (login, forgot Password, and register)
│   │    ├──/module(example organization module)
|   |    |--/resource --> For example orders{create,list,show,edit}
│   │    │      │
│   │    │      ui -> these components is only used for the module
│   │    │      │     └──/component (example estrure for a component)
│   │    │      │         ├──index.tsx
│   │    │      │         └──styles.ts
│   │    │      __test__ -> Test for current module
│   │    │      │     └──/me.test.tsx
│   │    │      locales -> Locales for this module
│   │    │      │     └──/es.json
│   │    │      │     └──/en.json
│   │    │      utils -> utils for this module
│   │    │      │     └──/debounce.ts
│   │    │      ├──ModuleView.tsx
│   │    │      |__Navigaiton.tsx
│   │    │      └──styles.ts
│   │    └──/shared -> is a components shared between several modules
│   └── /utils
│   └── /theme
│   └── /config
│   └── /navigation --> navigaiton for main app
├── .env.example
├── .env
└── ...others configuration files
```

# Author

Johan Villamil

# License

MIT
