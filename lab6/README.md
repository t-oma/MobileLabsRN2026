# Лабораторна робота №6

Мобільний застосунок на Expo SDK 57 із Firebase Authentication та Cloud Firestore. Інтерфейс український, основна платформа iOS, також підтримується Android.

## Що реалізовано

- реєстрація через email і пароль;
- вхід та вихід;
- збереження сесії після перезапуску застосунку;
- створення й редагування профілю з ім’ям, віком і містом;
- збереження профілю в `users/{uid}`;
- клієнтська перевірка активного UID;
- Firestore Security Rules із доступом лише до власного документа;
- відновлення пароля через email;
- повторна автентифікація перед видаленням акаунта;
- видалення профілю Firestore та користувача Firebase Authentication;
- захищені групи маршрутів `(auth)` і `(app)` через `Redirect` у `_layout.tsx`.

## Що потрібно встановити

- Node.js 22.13 або новіший;
- pnpm;
- Expo Go на iPhone або Android-пристрої;
- Google-акаунт для Firebase Console.

Версії Expo 57 і React Native вже зафіксовані в `package.json`. Перед роботою з проєктом можна звіритися з [документацією Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/).

## 1. Створення Firebase-проєкту

1. Відкрийте [Firebase Console](https://console.firebase.google.com/).
2. Натисніть **Create a project**.
3. Введіть назву, наприклад `react-native-lab6`.
4. Google Analytics для цієї лабораторної не потрібний, його можна вимкнути.
5. Натисніть **Create project** і дочекайтеся завершення.

Офіційна інструкція: [створення Firebase-проєкту](https://firebase.google.com/docs/web/setup#create-firebase-project-and-register-app).

## 2. Реєстрація застосунку у Firebase

Цей проєкт використовує Firebase JavaScript SDK усередині Expo Go. Тому у Firebase Console потрібно зареєструвати **Web App**, навіть якщо застосунок запускається на iOS та Android.

1. На сторінці **Project Overview** натисніть іконку Web `</>`.
2. Введіть назву, наприклад `lab6-expo`.
3. Не вмикайте Firebase Hosting.
4. Натисніть **Register app**.
5. Збережіть показаний об’єкт `firebaseConfig`.

Він матиме такий вигляд:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Для цієї реалізації не потрібні `GoogleService-Info.plist`, `google-services.json` або власна development build.

## 3. Увімкнення Authentication

1. У лівому меню Firebase відкрийте **Build → Authentication**.
2. Натисніть **Get started**.
3. Відкрийте вкладку **Sign-in method**.
4. Оберіть **Email/Password**.
5. Увімкніть звичайний **Email/Password**. Email link вмикати не потрібно.
6. Натисніть **Save**.

Офіційна інструкція: [авторизація через email і пароль](https://firebase.google.com/docs/auth/web/password-auth).

## 4. Створення Firestore

1. У Firebase Console відкрийте **Build → Firestore Database**.
2. Натисніть **Create database**.
3. Залиште стандартний ідентифікатор бази `(default)`.
4. Оберіть **Start in production mode**.
5. Для роботи з України зручно обрати європейський регіон, наприклад `europe-central2`, якщо він доступний.
6. Підтвердьте створення бази.

Регіон Firestore не можна просто змінити після створення, тому перевірте вибір перед підтвердженням. Офіційна інструкція: [створення Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart#create).

## 5. Налаштування `.env.local`

Встановіть залежності:

```bash
pnpm install
```

Створіть локальний файл конфігурації з прикладу:

```bash
cp .env.example .env.local
```

Перенесіть значення з `firebaseConfig`:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=значення-apiKey
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=значення-authDomain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=значення-projectId
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=значення-storageBucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=значення-messagingSenderId
EXPO_PUBLIC_FIREBASE_APP_ID=значення-appId
```

Не додавайте лапки й коми. Після зміни `.env.local` повністю перезапустіть Expo.

`.env.local` уже виключено з Git. Значення `EXPO_PUBLIC_*` потрапляють у мобільний bundle, тому Firebase API key не вважається серверним секретом. Доступ до даних контролюють Authentication і Firestore Rules.

## 6. Публікація Firestore Rules

1. Відкрийте файл `firestore.rules` у корені цього репозиторію.
2. У Firebase Console перейдіть до **Firestore Database → Rules**.
3. Замініть правила в редакторі повним вмістом файла.
4. Натисніть **Publish**.

Правила дозволяють операції `get`, `create`, `update` і `delete` лише тоді, коли UID авторизованого користувача збігається з ID документа:

```text
request.auth != null && request.auth.uid == userId
```

Запит списку всієї колекції `users` не дозволений. Запис також перевіряє поля `name`, `age`, `city`, `updatedAt` і діапазон віку від 1 до 120.

Офіційна документація: [умови Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-conditions).

## 7. Запуск на iOS або Android

Запустіть Metro:

```bash
pnpm start
```

Далі:

- на iOS відкрийте камеру, відскануйте QR-код і підтвердьте запуск в Expo Go;
- на Android відкрийте Expo Go та відскануйте QR-код у застосунку;
- комп’ютер і телефон мають бути в одній локальній мережі.

Якщо локальна мережа блокує підключення, спробуйте:

```bash
pnpm exec expo start --tunnel
```

## Як продемонструвати лабораторну

1. Зареєструйте нового користувача.
2. Покажіть автоматичний перехід із `(auth)` до захищеного профілю.
3. Заповніть ім’я, вік і місто та натисніть **Зберегти зміни**.
4. У Firebase Console відкрийте Firestore і покажіть документ `users/{uid}`.
5. Змініть місто та переконайтеся, що оновився той самий документ.
6. Вийдіть і покажіть перенаправлення на екран входу.
7. Увійдіть знову й покажіть завантажений профіль.
8. Надішліть лист для зміни пароля.
9. Натисніть **Видалити акаунт**, введіть неправильний пароль і покажіть відмову.
10. Введіть правильний пароль та покажіть видалення документа й користувача.

## Структура даних

```text
users
└── {uid}
    ├── name: string
    ├── age: number
    ├── city: string
    └── updatedAt: timestamp
```

Email не дублюється у Firestore. Він уже зберігається у Firebase Authentication. UID використовується як ID документа.

## Як працює захист маршрутів

`AuthContext` слухає `onAuthStateChanged` і надає всьому застосунку `user` та `isLoading`.

- `(auth)/_layout.tsx` виконує `Redirect` до `/profile`, якщо користувач уже ввійшов.
- `(app)/_layout.tsx` виконує `Redirect` до `/login`, якщо сесії немає.
- `index.tsx` обирає початковий маршрут після завершення перевірки сесії.

Під час першої перевірки показується індикатор завантаження, тому екран входу не миготить перед відновленням збереженої сесії.

## Поширені помилки

### `auth/operation-not-allowed`

У Firebase Console не ввімкнений провайдер Email/Password. Повторіть крок 3.

### `permission-denied`

Перевірте, що:

- правила з `firestore.rules` опубліковані;
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID` належить тому самому проєкту;
- користувач авторизований;
- документ має ID, рівний UID користувача.

### Застосунок повідомляє про відсутню змінну

Перевірте назву `.env.local`, усі шість значень і повністю перезапустіть Metro.

### Лист для зміни пароля не видно

Перевірте папку «Спам». Шаблон і адресу відправника можна переглянути у **Authentication → Templates → Password reset**.

### Видалення акаунта не проходить

У модальному вікні потрібно ввести поточний пароль саме цього акаунта. Застосунок спочатку повторно автентифікує користувача, а вже потім видаляє дані.
