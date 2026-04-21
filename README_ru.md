# Nocturnal Architect

[English version](./README.md)

Совместное пространство для планирования задач, идей и командной работы. Проект сочетает в себе визуальный canvas, доски в стиле Trello, заметки и структуру в духе Notion, но остаётся достаточно простым, чтобы его можно было развивать в одиночку.

## О проекте

Nocturnal Architect — это веб-приложение для совместного планирования. Пользователь создаёт board, добавляет задачи, наполняет их todo-элементами, назначает дедлайны, теги и работает над всем этим вместе с друзьями в реальном времени.

Основная идея:

* тёмный интерфейс
* совместная работа в реальном времени
* canvas-подход к организации планов
* быстрый CRUD для задач и todo
* аналитика и календарь дедлайнов

## Возможности

* Регистрация и вход через email/password
* Авторизация через OAuth
* Создание и редактирование board
* Tasks с вложенными todos
* Drag and drop карточек и todo
* Дедлайны
* Теги
* Приглашения по ссылке
* Страница календаря с дедлайнами
* Базовая аналитика по доске
* Адаптивный интерфейс
* Realtime-обновления

## Стек

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase
* lucide-react
* Zustand
* Recharts
* FullCalendar
* Pragmatic Drag and Drop

## Структура проекта

```txt
app/
  app/
    boards/
      [id]/
        page.tsx
        calendar/page.tsx
        stats/page.tsx
    invite/
      [token]/page.tsx
    onboarding/page.tsx
    settings/page.tsx
  auth/
    callback/
    login/
    register/
  info/
    check-email/
    error/
  onboarding/page.tsx
  page.tsx
components/
  App/
  Auth/
  Landing/
  Onboarding/
  ui/
actions/
store/
hooks/
helpers/
types/
consts/
utils/
```

## Установка

```bash
npm install
```

## Переменные окружения

Создай файл `.env.local` и добавь:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Запуск проекта

```bash
npm run dev
```

## Сборка

```bash
npm run build
npm run start
```

## Основные сценарии

### 1. Создание board

Пользователь создаёт новую доску и попадает в рабочее пространство, где можно добавлять задачи и todo.

### 2. Работа с задачами

Каждая задача может содержать:

* заголовок
* цвет
* дедлайн
* позиции на canvas
* todo-элементы
* теги

### 3. Совместная работа

Пользователь может создать invite-link и поделиться им с друзьями. После входа участники получают доступ к board.

### 4. Аналитика

Проект собирает базовую статистику:

* количество задач
* количество активных задач
* процент завершения
* team size
* распределение тегов
* график активности

## API / Actions

В проекте используется server actions и Supabase actions для:

* создания board
* создания и обновления tasks
* создания и удаления todos
* работы с invite-links
* получения статистики
