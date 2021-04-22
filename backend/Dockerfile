FROM python:3.9 as builder

WORKDIR /urs/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get upgrade -y && apt-get -y install postgresql gcc python3-dev musl-dev

RUN pip install --upgrade pip

COPY ./prod.req.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r prod.req.txt
# --no-cache-dir --no-deps --wheel-dir 

FROM python:3.9

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y netcat supervisor

COPY --from=builder /usr/src/app/wheels /wheels
RUN pip install --no-cache /wheels/*

RUN mkdir -p /home/app

RUN groupadd app
RUN useradd -m -g app app -p PASSWORD
RUN usermod -aG app app

ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir /run/daphne
WORKDIR $APP_HOME

COPY ./entrypoint.sh $APP_HOME
RUN chmod +x entrypoint.sh

COPY . $APP_HOME

RUN chown -R app:app $APP_HOME

ENTRYPOINT [ "/home/app/web/entrypoint.sh" ]