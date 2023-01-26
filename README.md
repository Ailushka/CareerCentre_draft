### Небольшая инструкция по сборке Docker контейнера
____________________________________
И так вам сказочно повезло в вашем репозитории появился `Dockerfile`.  
Это значит можно собрать образ текущего проекта.
Запустить его не получиться, так как это просто сборка набора статических файлов и внутри контейнера который будет собран на основании образа нет активного процесса.

Здесь описан порядок действий для первичной сборки образа и загрузки на DockerHub.

#### 1. Cобираем образ (`image`)
Если ```Docker``` установлен нужно будет выполнить из директории проекта следующую команду (прочитайте пояснение ниже)
```bash
docker build -t login/image_name:tag .
```
***Примечание:*** точка в конце не ошибка)))
- **login** - ваш логин на DockerHub
- **image_name** - название для вашего образа (как пример *career_centre_frontend*)
- **tag** - тег подразумевает наличие версионности нашего образа, если нам это не нужно можно установить **latest**

***Example***
```bash
docker build potter/lumus_maxima:latest .
```

#### 2. Загружаем образ на DockerHub
Все образы хранятся на вашем DockerHub, соответственно перед загрузкой нужно авторизоваться на 
сервисе выполнив в консоли команду:
```bash
docker login
```
- введите **username**
- введите **password**

После успешной авторизации загрузим наш образ на DockerHub
Для этого нам необходимо выполнить следующую команду
```bash
docker push login/image_name:tag
```
Здесь нужно указать полное имя нашего образа который мы собрали.
Если вы забыли как называется ваш образ, выполните команду 
```bash
docker images
```
Результатом выполнения будет список всех образов которые сейчас есть у вас в системе.
Так же можно воспользоваться **Docker Desktop**

#### 3. Обновление локального и удалённого образа
1) Для обновления удалённого образа на DockerHub при условии, что локальный образ на вашей машине 100% верен просто выполните первый и второй шаг.
2) Для случая обновления локального образа выполните команду
```bash
docker pull name:tag
```
***Примечание:*** `name` здесь это всё та же связка `login/image_name`
3) Скачать образ из DockerHub так же как обновить локальный
```bash
docker pull name:tag
```

#### 4. Настройка CI
После первого пуша в ветку `master` запуститься набор действий **GithubActions**. 
Для того чтобы всё заработало хорошо необходимо добавить в **SECRETS** *github* следующие переменные.
```shell
DOCKER_PASSWORD
DOCKER_USERNAME
DOCKER_IMAGE_NAME
```
