# from base image node
FROM node:19.7.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

COPY . .

RUN npm run build

# command to run when intantiate an image
CMD ["npm","start"]