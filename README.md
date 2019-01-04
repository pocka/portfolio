# portfolio

[![Build Status](https://travis-ci.com/pocka/portfolio.svg?branch=master)](https://travis-ci.com/pocka/portfolio)

My portfolio.

## Development

This project uses Yarn.
You can install dependencies by following command.

```sh
yarn
```

You can start dev server by this.

```sh
yarn dev
```

To build, use this.

```sh
yarn build
```

## Env

To deploy this project, we have to set some environment variables.

| Key                     | Description                              |
| ----------------------- | ---------------------------------------- |
| `AWS_BUCKET_NAME`       | Name of S3 bucket to deploy              |
| `AWS_CF_DIST_ID`        | Cloudfront distribution ID to invalidate |
| `AWS_ACCESS_KEY_ID`     | Deployment IAM user's access key id      |
| `AWS_SECRET_ACCESS_KEY` | Deployment IAM user's secret access key  |
