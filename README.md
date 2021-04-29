# Fronted-End Final Project I Say

## Untuk Preview Bisa Akses Di :

- **STAGGING** [I Say Stagging](#)
- **MASTER/ DEPLOYED** [I Say Deployed](#)

## Pada Folder Structre, Perhatikan Baik-Baik Penempatan :

    1. API
    2. Components Common/ Pages
    3. Container Common/ Pages
    4. Action & Reducer setiap Feature
    5. Middleware, Store, Event Name, Root Reducer.

## Folder Structure yang Digunakan.

    src
    ├── api                             # Semua API dikumpulkan disini
        ├── apiHandler.js               # Nanti API dijadikan satu disini
        └── ...
    ├── common                          # Components/ container yang tidak terasosiasi dengan page utama/ yang umum dipakai
        ├── components
            └── ...
        └── containers
            └── ...
    ├── pages                           # Page utama yang digunakan
        ├── ThisPage
            ├── components
                └── ...
            └── ThisPageContainers.jsx
        └── ...
    ├── states                          # Untuk mengasosiasi setiap state, action, dan reducer
        ├── ThisFeature
            ├── ThisFeatureAction.js
            └── ThisFeatureReducer.js
        ├── ...
        ├── eventName.js
        ├── middleware.js               # Tempat middleware berada
        └── store.js                    # Tempat store berada
    ├── utils
        └── authUtils.js
    ├── App.js                          # Compilenya di App.js
    ├── App.test.js
    ├── index.js
    ├── reducer.js                      # Untuk combine Reducer dari setiap feature
    ├── reportWebVitals.js
    ├── routes.js
    └── setupTests.js

## CI/CD Structure

    1. Build
    2. Deploy

{- Karena cuma dua, build dan deploy dan posisinya di branch Master, kalau mau merge masukin dulu Stagging Area yak, nanti kita lihat bareng-bareng, kalo yang di Stagging Area ga ada error, kita lanjut merge ke Master -}

## Referensi Utama

- **Folder Structuring**: [PluralSight, How to Organize Your React + Redux](https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase)
- **CI/CD NodeJS Manteb Jobsnya Lengkap**: [Gitlab Node Deployments via Heroku](https://www.mayankmishra.me/gitlab-node-deployments-via-heroku/)
- **Handle Routing**: [Handle Routing Tips by Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router)
- **Redux Fundamental**: [Redux Fundamental Series](redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)

## Created By

- Alfian Alfian
- Tisadini Ossiana
- Candra Lorensia Ardiyanti
