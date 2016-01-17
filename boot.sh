#!/bin/bash
docker run -d --name evaluation.worker.investments  \
 --link investmentsqueue:rabbitmq                   \
 --link utility.investments:utility.investments     \
 --env-file=docker/env                              \
 lmyjo/evaluation-worker
