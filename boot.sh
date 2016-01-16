#!/bin/bash
docker run -d --name evaluation.worker.investments  \
 --link investmentsqueue:rabbitmq                   \
 --env-file=docker/env                              \
 lmyjo/evaluation-worker
