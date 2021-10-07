FROM ubuntu:latest

LABEL maintainer "user"

ENV USER user
ENV HOME /home/${USER}
ENV SHELL /bin/bash

RUN useradd -m ${USER}
RUN gpasswd -a ${USER} sudo
RUN echo "${USER}:work" | chpasswd
SHELL ["/bin/bash", "-c"]

RUN dpkg-divert --local --rename --add /sbin/initctl
ADD my.cnf /etc/mysql/my.cnf
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y
RUN apt-get install -y git sudo curl gcc make
RUN sudo apt-get install -y --no-install-recommends mariadb-server
RUN sudo service mysql start
RUN (/usr/bin/mysqld_safe &); sleep 3; echo "USE mysql;UPDATE user SET plugin='mysql_native_password' WHERE User='root';FLUSH PRIVILEGES;" | sudo mysql -u root
RUN sudo service mysql restart


RUN curl -O https://dl.google.com/go/go1.17.1.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.1.linux-amd64.tar.gz
ENV PATH $PATH:/usr/local/go/bin
ENV PATH $PATH:${HOME}/go/bin
RUN go version

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs
RUN npm install npm@latest -g

WORKDIR /home/${HOME}
COPY . .

WORKDIR /home/${HOME}/frontend
RUN npm install

WORKDIR /home/${HOME}
RUN go install github.com/rubenv/sql-migrate/...
