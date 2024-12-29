# Aquamarine
Сервис для удобной работы с PDF файлами, поддерживающий большие объемы пользователей и предоставляющий базовые операции с PDF файлами. Пользователь может использовать все инструменты бесплатно без регистрации. Для администрирования будут предусмотрены специальные аккаунты.

## 1. Цели проекта:
1. Практика работы с новыми инструментами
2. Практика с уже знакомыми
3. Изучить развертывание (настройку арендованного сервера, балансировщика нагрузки и CI/CD)
4. Реализовать готовый к демонстрации продукт - сервис работы с PDF документами для удобного и быстрого повседневного использования

## 2. Функциональные требования
_MVP_
#### Файлы
- Загрузка и скачивание файлов по одному (в зависимости от выбранного инструмента)
- Ограничение по типу файлов (в зависимости от выбранного инструмента)
- Проверка файла на повреждения
- Временное хранение файлов и фоновая обработка
- Генерация миниатюр

#### Работа с PDF
- объединить, разделить, удалить страницы, извлеч изображения

----
_Полная версия_

#### Роли и права доступа
- Администратор
  - Просмотр логов и статистики
- Пользователь **без регистрации**
  - Использование инструментов

#### Работа с PDF
- Сжатие
- Конвертация в PDF (из JPEG, WORD, POWERPOINT) и из PDF

#### Интерфейс
Web-интерфейс для использования сервиса

#### Логирование и статистика
- Логирование всех действий
- Предоставление статистики для администратора

## 3. Нефункциональные требования

#### Обработка и хранение файлов
- Лимит размера одного файла: 50 мБайт
- Инструменты, принимающие несколько файлов, имеют ограничение в 10 файлов
- Загруженные и обработанные файлы должны хранится не более 24 часов
#### Масштабируемость
- Сервис должен поддерживать запуск на нескольких серверах для обработки высокой нагрузки
- Логика приложения должна быть разделена на модули, чтобы в будущем их можно было выделить в микросервисы
#### Безопасность
- Ограничение числа запросов (Rate Limiting) для предотвращения DDoS-атак.
#### Удобство использования
- Уведомление пользователя о статусе обработки файла
#### Тестирование
- Сервер должен быть протестирован на нагрузку до 1000 запросов в минуту
- Наличие тестов для проверки основных операций через Swagger/Postman
#### Поддерживаемость
- Подробная Swagger-документация для API
- Код должен следовать стандартам (Eslint + Prettier)

## 4. Пользовательские сценарии

### 1. Загрузка и обработка одного PDF-файла
**Предыстория:** Пользователь хочет быстро удалить страницы из PDF-файла.  
**Шаги:**
1. Пользователь заходит на главную страницу веб-сервиса.
2. выбирает действие **"Удалить страницы"**.
3. Нажимает кнопку **"Загрузить файл"**.
4. Выбирает PDF-файл размером до 50 МБ на своем устройстве.
6. Указывает страницы для удаления.
7. Нажимает **"Обработать"**.
8. Дожидается завершения обработки (видит уведомление о статусе).
9. Скачивает обработанный PDF-файл, нажав кнопку **"Скачать файл"**.

---

### 2. Объединение нескольких PDF-файлов
**Предыстория:** Пользователь хочет объединить два документа в один.  
**Шаги:**
1. Пользователь открывает сервис в браузере.
2. Выбирает опцию **"Объединить PDF"**.
3. Нажимает кнопку **"Загрузить файлы"**.
4. Выбирает два PDF-файла (каждый не превышает 50 МБ).
6. Устанавливает порядок объединения (например, файл 1 → файл 2).
7. Нажимает **"Обработать"**.
8. После завершения обработки скачивает объединенный PDF-файл.

---

### 3. Извлечение изображений из PDF
**Предыстория:** Пользователь хочет извлечь изображения из нескольких PDF-файлов.  
**Шаги:**
1. Открывает интерфейс сервиса.
2. Выбирает действие **"Извлечь изображения"**.
3. Нажимает кнопку **"Загрузить файлы"**.
4. Нажимает **"Обработать"**.
6. Сервис уведомляет о завершении обработки.
7. Пользователь скачивает архив с извлеченными изображениями.

---

### 4. Обработка поврежденного файла
**Предыстория:** Пользователь случайно загрузил поврежденный файл.  
**Шаги:**
0. ...
1. Пользователь загружает PDF-файл через интерфейс.
2. Сервис проверяет файл на повреждения.
3. Если файл поврежден, пользователь видит сообщение: **"Файл поврежден или не поддерживается"**.
4. Пользователь загружает другой файл для обработки.

---

### 5. Сжатие PDF-файла
**Предыстория:** Пользователь хочет уменьшить размер файла для отправки по почте.  
**Шаги:**
1. Выбирает действие **"Сжать PDF"**.
2. Пользователь загружает PDF-файл.
3. Выбирает настройки сжатия (например, "Максимальная компрессия").
4. Нажимает **"Обработать"**.
5. Получает обработанный файл для скачивания.

---

### 6. Конвертация Word в PDF
**Предыстория:** Пользователю нужно преобразовать документ Word в PDF.  
**Шаги:** 
1. Выбирает действие **"Конвертировать в PDF"**.
2. Пользователь загружает Word-документ через интерфейс.
3. Нажимает **"Обработать"**.
4. После обработки скачивает готовый PDF-файл.

---

### 7. Генерация миниатюр страниц
**Предыстория:** Пользователь хочет увидеть миниатюры страниц перед удалением.  
**Шаги:**
0. ...
1. Пользователь загружает PDF-файл.
2. Сервис автоматически генерирует миниатюры страниц.
3. Пользователь выбирает нужные страницы для удаления.
4. Нажимает **"Обработать"** и скачивает итоговый файл.

---

### 8. Просмотр логов (администратор)
**Предыстория:** Администратор хочет проанализировать ошибки в системе.  
**Шаги:**
0. Администратор переходит на админскую панель (защищенный ресурс)
1. Проходит авторизацию
2. Заходит в раздел **"Логи"**.
3. Просматривает список операций:
   - Дата и время.
   - Тип операции.
   - Успешность.
4. При необходимости фильтрует логи по дате или типу операций.

---

### 9. Статистика использования (администратор)
**Предыстория:** Администратор анализирует использование сервиса.  
**Шаги:**
0. Администратор переходит на админскую панель (защищенный ресурс)
1. Проходит авторизацию
2. Администратор заходит в раздел **"Статистика"**.
3. Просматривает графики:
   - Количество обработанных файлов за неделю.
   - Среднее время выполнения операций.
   - Загруженность системы.

---

### 10. Обработка ошибки превышения лимита размера файла
**Предыстория:** Пользователь пытается загрузить файл больше 50 МБ.  
**Шаги:**
0. ...
1. Пользователь загружает файл через интерфейс.
2. Сервис проверяет размер файла.
3. Если файл превышает 50 МБ, пользователь видит сообщение: **"Файл превышает допустимый размер (50 МБ)"**.



## 5. Технические требования
### Технолоигческий стек
- Серверный фреймворк: NestJS
- БД: MySQL
- Хранилище файлов: MinIO
- Очереди задач: Redis + BullMQ
- Деплой: Docker, Github Actions, NGINX
### Интеграции
Библиотеки для работы с PDF: ???
### Архитектура
Монолитное приложение для MVP с возможностью переработки в микросервисы на следующем этапе

## 6. Схема данных

## 7. Архитектура приложения

### Модули:
#### MVP
- CoreModule
  - Настройка всего приложения
  - Содержит все глобальные сервисы и зависимости
- FileModule
  - Загрузка и скачивание файлов
  - Проверка типов и ограничения по размеру
  - Генерация миниатюр
  - Временное хранение и автоматическое удаление 
- QueueModule
  - Управляет фоновыми задачами (обработка, загрузка и скачивание файлов) 
- PdfProcessingModule
  - Операции, связанные с PDF
----
#### Полная версия    
- AuthModule
  - Управляет доступом к защищенным ресурсам
  - Реализует роли и проверку токенов
- DatabaseModule
  - Управляет подключением и взаимодействием с БД
- AdminModule
  - Доступ к статистике и логам
- LoggingModule
  - Управление логами
- AnalyticsModule
  - Предоставляет аналитические данные

## 8. Развертывание

## Тестирование

## Этапы реализации
### **MVP**
---
##### **1. Проектирование**
- [ ] Определение функционала сервиса:
  - Подробное описание операций с PDF и файлов.
  - Уточнение лимитов и ограничений (например, 50 МБ, 10 файлов одновременно).
- [ ] Составление ТЗ:
  - Уточнение требований, пользовательских сценариев и структуры данных.
- [ ] Определение структуры API, БД и взаимодействия с MinIO:
  - Проектирование схем базы данных.
  - Составление спецификации API (основные эндпоинты).
  - Проработка взаимодействия с MinIO (загрузка, скачивание, удаление файлов).
- [ ] Прототипирование архитектуры приложения:
  - Разделение приложения на модули.
  - Определение взаимодействия модулей.

---

##### **2. Разработка API**
- [ ] Настройка проекта:
  - Инициализация проекта NestJS.
  - Настройка ESLint, Prettier, и других инструментов для соблюдения стандартов кода.
  - Интеграция Redis, MinIO, и других зависимостей.
- [ ] Реализация операций с PDF:
  - Реализация базовых операций (объединение, разделение, удаление страниц, извлечение изображений).
  - Поддержка массовой обработки файлов.
- [ ] Swagger-документация:
  - Описание всех эндпоинтов API.
  - Примеры запросов и ответов.

---

##### **3. Установка и настройка файлового хранилища**
- [ ] Установка MinIO:
  - Настройка локального и серверного хранилища.
  - Определение временных директорий и политик удаления.
- [ ] Интеграция MinIO с приложением:
  - Тестирование загрузки, скачивания и автоматического удаления файлов.

---

##### **4. Реализация очередей задач**
- [ ] Настройка Redis + BullMQ:
  - Установка Redis.
  - Реализация очередей для фоновой обработки файлов (например, сжатие или генерация миниатюр).
- [ ] Обработка задач:
  - Написание воркеров для выполнения долгих операций.

---

##### **5. Деплой MVP**
- [ ] Установка и настройка балансировщика нагрузки:
  - Настройка NGINX для распределения запросов.
- [ ] Развертывание на сервере:
  - Установка всех зависимостей (Node.js, Docker, MySQL, Redis, MinIO).
  - Настройка переменных окружения.
- [ ] Настройка CI/CD:
  - Настройка автоматического деплоя через GitHub Actions.
  - Проверка сборки и развертывания приложения.
- [ ] Тестирование на сервере:
  - Проведение тестов API (Swagger/Postman).
  - Проверка загрузки, обработки и скачивания файлов.

### **Полная версия**
---

##### **6. Расширение функционала**
- [ ] Реализация сжатия PDF:
  - Разработка сервиса для сжатия с выбором настроек (качество, компрессия).
- [ ] Конвертация в PDF и из PDF:
  - Интеграция библиотеки для конвертации (например, Word → PDF, PDF → JPEG).

---

##### **7. Реализация ролей и прав доступа**
- [ ] Авторизация через OAuth:
  - Добавление авторизации для административного интерфейса.
- [ ] Создание интерфейса администратора:
  - Реализация просмотра логов и статистики.

---

##### **8. Создание веб-интерфейса**
- [ ] Разработка веб-интерфейса для взаимодействия с сервисом:
  - Функции загрузки, настройки обработки и скачивания файлов.
  - Поддержка мобильных устройств.

---

##### **9. Добавление логов и аналитики**
- [ ] Логирование операций:
  - Запись операций в базу данных или файл.
- [ ] Реализация аналитики:
  - Графики и отчёты (например, через Prometheus/Grafana).

---

##### **10. Тестирование полной версии**
- [ ] Нагрузочное тестирование:
  - Проверка работы сервиса при высокой нагрузке (до 1000 запросов в минуту).
- [ ] Финальные интеграционные тесты:
  - Проверка всех функциональностей, включая работу очередей и API.

