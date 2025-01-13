FROM nginx:stable-alpine3.20
EXPOSE 80
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# чтобы контейнер работал в режиме переднего плана (а не в фоновом режиме - в режиме демона)
# иначе он сразу завершит работу после запуска контейнера (хз, у меня итак норм все было)
CMD ["nginx", "-g", "daemon off;"]