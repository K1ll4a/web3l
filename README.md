
  Web3L — Interactive Web Application (Java EE + SOAP + React)

  Учебный full-stack веб-проект с интерактивным пользовательским интерфейсом,
  реализующий клиент-серверное взаимодействие с использованием SOAP (JAX-WS)
  на backend и React + TypeScript на frontend.

  Проект разворачивается в Docker и использует MySQL для хранения данных.

  ФУНКЦИОНАЛЬНОСТЬ
  - Регистрация и авторизация пользователей
  - Интерактивный график
  - Выбор точки кликом по графику
  - Ввод координат вручную
  - Проверка попадания точки в область
  - Сохранение истории в базе данных
  - Отображение истории попаданий

  АРХИТЕКТУРА
  Frontend (React + Vite)
        |
        | SOAP (XML)
        v
  Backend (Java EE, JAX-WS)
        |
        v
      MySQL

  ИСПОЛЬЗУЕМЫЕ ТЕХНОЛОГИИ

  Backend:
  - Java 17
  - Java EE / Jakarta EE
  - JAX-WS (SOAP)
  - Hibernate (JPA)
  - MySQL
  - Maven

  Frontend:
  - React
  - TypeScript
  - Vite
  - @tanstack/react-store
  - Nginx

  Инфраструктура:
  - Docker
  - Docker Compose

  СТРУКТУРА ПРОЕКТА
  Web3L/
    backend/
      src/main/java/com/k1ll4a/
        ws/        SOAP endpoints
        service/   Бизнес-логика
        dao/       DAO слой
        model/     JPA сущности
        util/      Вспомогательные классы
      pom.xml

    frontend/
      src/
        pages/
        components/
        store/
        api/
        utils/
      nginx.conf
      frontend.Dockerfile
      .env

    docker-compose.yml
    backend.Dockerfile

  ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ
  frontend/.env:
    VITE_BACKEND_URL=/ws

  ЗАПУСК ПРОЕКТА
  1. Клонировать репозиторий
     git clone https://github.com/your-username/Web3L.git
     cd Web3L

  2. Запустить Docker
     docker-compose up --build

  3. Открыть в браузере
     Frontend: http://localhost/
     Backend (SOAP): http://localhost:8080/ws

  SOAP ENDPOINTS
  - /ws/users
  - /ws/geometry
  - /ws/history

  Важно: SOAP endpoints не являются пользовательским интерфейсом.
  Все взаимодействие происходит через frontend.

  ОСОБЕННОСТИ РЕАЛИЗАЦИИ
  - Backend реализован как standalone Java-приложение
  - Используется JPA + Hibernate
  - Frontend взаимодействует с backend через SOAP-клиент
  - Nginx используется для SPA и проксирования /ws запросов

  НАЗНАЧЕНИЕ ПРОЕКТА
  Проект разработан в учебных целях для демонстрации:
  - SOAP веб-сервисов
  - клиент-серверного взаимодействия
  - работы с базой данных
  - контейнеризации приложения

  АВТОР
  Михаил — студент, CV / ML Developer

  ЛИЦЕНЗИЯ
  Проект предназначен для учебного использования.
