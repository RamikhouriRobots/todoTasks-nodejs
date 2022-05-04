FROM node:12-alpine

RUN mkdir -p /node/app/
WORKDIR /node/app

RUN adduser -S app

COPY . .

ENV DB_USER=mongoUser
ENV DB_USER_PASSWORD=User@451973
ENV DB_SERVER=mongodb+srv
ENV DB_CLASTER=todoApp
ENV DB_NAME=todoApp
ENV TOKEN_KEY=todoapptokenjwtkey
ENV SENDGRID_API_KEY=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
ENV PORT=3003
ENV TWILIO_ACCOUNT_SID=AC881a77f1a8fc1c7365b426636fa365c6
ENV TWILIO_AUTH_TOKEN=6585f823c6e72c1a041ac32430d4cee6


COPY package*.json ./
RUN npm install
RUN chown -R app /node/app

USER app


EXPOSE 3003

CMD ["npm", "run", "start"]