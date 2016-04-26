# Standard-Pre-Generated-HTML-Site

Refer to the [project brief](https://hakkasan.atlassian.net/wiki/display/ENG/Pre-generated%2C+static+HTML+web+sites)
for an explanation of why we use pre-generated HTML sites.

This is the reference site for pre-generated HTML sites, according to the
Hakkasan Group web operations team SOP [SOP: Standard Pre-Generated HTML Site](https://hakkasan.atlassian.net/wiki/display/WOH/SOP%3A+Standard+Pre-Generated+HTML+Site)

This site uses [Jekyll](http://jekyllrb.com/), an static web site generator.

# Getting started

## Setup
1. If you haven't yet, download and install Docker Toolbox https://www.docker.com/products/docker-toolbox
2. If your default docker machine is not running start it with `docker-machine start default` and then run `eval $(docker-machine env default)`
4. cd into project
5. Run `docker-compose up` or `docker-compose up -d` to run in detached mode.

Running with Docker
==================

1. Run `docker-machine ip default` to find your docker machine ip
1. cd into project directory
2. `docker-compose up`
3. Go to `http://dockermachineip:4000` to test


# Running commands
Grunt and Jekyll commands can be run on the container via `docker-compose run web {command}`

# Building the site

Build the site and all of the responsive image sizes with:

    grunt build_all
    `docker-compose run web grunt build_all`

# Build only new images

Build all responsive image sizes for NEW images:

    grunt responsive_images
    `docker-compose run web grunt responsive_images`

# Running the site

Go to the project folder and run:

    `docker-compose up`

# Rebuilding the site

During development, you can also do a quick, one-time build of the site with:

    `docker-compose up`

The site will be generated in the `_site` folder.

# Fresh start

You can clean out the generated output with:

    grunt clean
    `docker-compose run web grunt clean`

You can clean and then rebuild all with:

    grunt build_clean
    `docker-compose run web grunt build_clean`

# Deploying the site

First, get the credentials for the deploy-herringboneeats AWS IAM user.  (Ask Derek Norrbom.)

Add a file to the root of your project folder called aws-credentials.json, with contents like this:

    {
      "AWSAccessKeyId": "...",
      "AWSSecretKey": "..."
    }

## Deploy to staging

Your Docker Container is already set up to deploy, as long as you have your credentials set up.  Just
open a terminal window to the project root and tell it:

    grunt aws_s3:staging
    `docker-compose run web grunt aws_s3:staging`
