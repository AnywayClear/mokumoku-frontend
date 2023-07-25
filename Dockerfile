FROM node:latest 
ENV APP_HOME=/app 
WORKDIR $APP_HOME 
COPY package.json ./ 
RUN npm i 
COPY ./ ./ 
RUN npm run build
CMD ["npm", "run", "start"]  

