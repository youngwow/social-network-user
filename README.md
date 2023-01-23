# Social network user

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

Было изучено основы языка TypeScript и особенностей применения фреймворка Angular для разработки web-приложений, реализация взаимодействия приложений с использованием web-сокетов, организации модульного тестирования web-приложений с использованием Jest.

## Задание.
Необходимо создать web-приложение, обеспечивающее использование пользователем социальной сети. Пользователь может зарегистрироваться в социальной сети. Может добавить или удалить свою фотографию, может управлять своими друзьями в социальной сети, может добавить сообщение (новость) на свою страницу, может просматривать список новостей своих друзей.

Основные требования:
1. Приложение получает исходные данные из модуля администрирования приложения «Социальная сеть» в виде JSON-файла и работает одновременно с [модулем администрирования приложения «Социальная сеть»](https://github.com/youngwow/social-network-admin).
2. В качестве сервера используется Node.JS с модулем express.
3. Предусмотрены:
– HTML-страница для регистрации пользователя;
– HTML-страница для просмотра ленты новостей (пользователя и его друзей);
– HTML-страница для добавления сообщения (новости).
4. Если пользователь является администратором, то у него есть возможность перехода в [модуль администрирования приложения «Социальная сеть»](https://github.com/youngwow/social-network-admin).
5. Переписка и страница новостей обновляются сразу после появления сообщений и новостей от пользователей без необходимости обновлять страницу целиком.
6. Разработаны тесты для [серверной части web-приложения](https://github.com/youngwow/social-network-admin) с использованием Jest.
7. Все элементы управления реализованы с использованием компонентов Angular. Взаимодействие между компонентами реализовано с использованием сервисов Angular.
8. Для реализации эффектов на HTML-страницах используются директивы Angular.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
