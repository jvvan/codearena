FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app
USER root

COPY dist/apps/runner runner
RUN chown -R runner:runner .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix runner --omit=dev -f install

CMD [ "node", "runner" ]
