---
layout: post
title: "Configure gitlab with docker"
date: 2018-03-26 19:30:00 +0100
categories: docker
tags: docker gitlab ldap git
---

How to configure gitlab in order for it to run on a docker container?

## Summary

1. Install docker
2. Create a ```docker-compose.yml``` file
3. Launch it
4. If you want LDAP authentication, create another ```docker-compose.yml```
5. Encountered problem

<!-- more -->
## Detailed Steps

### 1. Installing docker
Just install it with any package manager, like so ```sudo apt install docker```

### 2. Docker-compose file
```yaml
---
gitlab:
  image: 'gitlab/gitlab-ce:9.1.0-ce.0'
  restart: always
  hostname: 'gitlab.my-host.com'
  links:
    - postgresql:postgresql
    - redis:redis
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      postgresql['enable'] = false
      gitlab_rails['db_username'] = "gitlab"
      gitlab_rails['db_password'] = "gitlab"
      gitlab_rails['db_host'] = "postgresql"
      gitlab_rails['db_port'] = "5432"
      gitlab_rails['db_database'] = "gitlabhq_production"
      gitlab_rails['db_adapter'] = 'postgresql'
      gitlab_rails['db_encoding'] = 'utf8'
      redis['enable'] = false
      gitlab_rails['redis_host'] = 'redis'
      gitlab_rails['redis_port'] = '6379'
      external_url 'http://gitlab.my-host.com:30080'
      gitlab_rails['gitlab_shell_ssh_port'] = 30022
  ports:
    # both ports must match the port from external_url above
    - "30080:30080"
    # the mapped port must match ssh_port specified above.
    - "30022:22"
    # the following are hints on what volumes to mount if you want to persist data
  volumes:
    - /data/gitlab/config:/etc/gitlab:rw
    - /data/gitlab/logs:/var/log/gitlab:rw
    - /data/gitlab/data:/var/opt/gitlab:rw

postgresql:
  restart: always
  image: postgres:9.6.2-alpine
  environment:
    - POSTGRES_USER=gitlab
    - POSTGRES_PASSWORD=gitlab
    - POSTGRES_DB=gitlabhq_production
  # the following are hints on what volumes to mount if you want to persist data
  volumes:
    - /data/postgresql:/var/lib/postgresql:rw

redis:
  restart: always
  image: redis:3.0.7-alpine
```

You'll have to replace the value of `<hostname>`.  
In `environment`, there are all the gitlab configuration variables (and they could also be in another file: `/etc/gitlab/gitlab.rb`): so change each variable values to the right one for you.
For example, you'll have to change `<external_url>`, and the usernames/passwords.

If you don't want to mount volumes and just have it all in the docker container, comment the line with "volumes:" and the ones below.

If you want it, then create the appropriate folders (here: ```mkdir -p /data/gitlab/{config,logs,data}```).
Same for postgresql volumes.
 
### 3. Commands
In order to launch it, just execute ```docker-compose up -d``` in the directory of the ```docker-compose.yml```.

Then, you'll be able to know the progression with ```docker ps -a```.
You'll get an output like this:

```bash
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                  PORTS                                                              NAMES
36e07429efb8        gitlab/gitlab-ce:9.1.0-ce.0   "/assets/wrapper"        19 hours ago        Up 19 hours (healthy)   80/tcp, 443/tcp, 0.0.0.0:30080->30080/tcp, 0.0.0.0:30022->22/tcp   usr_gitlab_1
0f09ec794ba4        postgres:9.6.2-alpine         "docker-entrypoint.s…"   4 days ago          Up 19 hours             5432/tcp                                                           usr_postgresql_1
a701cdb01ce9        redis:3.0.7-alpine            "docker-entrypoint.s…"   4 days ago          Up 19 hours             6379/tcp                                                           usr_redis_1
```


In order to see the logs, you just have to execute ```docker logs -f usr_gitlab_1```



### 4. With LDAP

```yaml
---
gitlab:
  image: 'gitlab/gitlab-ce:9.1.0-ce.0'
  restart: always
  hostname: 'gitlab.my-host.com'
  links:
    - postgresql:postgresql
    - redis:redis
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      postgresql['enable'] = false
      gitlab_rails['db_username'] = "gitlab"
      gitlab_rails['db_password'] = "gitlab"
      gitlab_rails['db_host'] = "postgresql"
      gitlab_rails['db_port'] = "5432"
      gitlab_rails['db_database'] = "gitlabhq_production"
      gitlab_rails['db_adapter'] = 'postgresql'
      gitlab_rails['db_encoding'] = 'utf8'
      # email
      gitlab_rails['gitlab_email_enabled'] = true
      gitlab_rails['gitlab_email_from'] = 'my-email@my-comp.com'
      gitlab_rails['gitlab_email_display_name'] = 'First name NAME'
      gitlab_rails['gitlab_email_reply_to'] = 'noreply@my-comp.com'
      # authorizations
      gitlab_rails['gitlab_default_can_create_group'] = false
      gitlab_rails['gitlab_username_changing_enabled'] = true
      gitlab_rails['gitlab_signup_enabled'] = false
      # LDAP
      ## For setting up LDAP
      ## see https://gitlab.com/gitlab-org/omnibus-gitlab/blob/629def0a7a26e7c2326566f0758d4a27857b52a3/README.md#setting-up-ldap-sign-in
      ## Be careful not to break the indentation in the ldap_servers block. It is in
      ## yaml format and the spaces must be retained. Using tabs will not work.
      gitlab_rails['ldap_enabled'] = true
      gitlab_rails['ldap_servers'] = YAML.load <<-'EOS' # remember to close this block with 'EOS' below
         main: #'main' is the GitLab 'provider ID' of this LDAP server
           label: 'LDAP'
           host: 'ldap.my-host.com'
           port: 389
           uid: 'uid'
           method: 'plain' # "tls" or "ssl" or "plain"
           bind_dn: 'cn=admin,dc=organisation,dc=fr'
           password: 'mypwd'
           active_directory: false
           allow_username_or_email_login: false
           block_auto_created_users: false
           base: 'ou=Users,dc=organisation,dc=fr'
           user_filter: ''
      EOS
      redis['enable'] = false
      gitlab_rails['redis_host'] = 'redis'
      gitlab_rails['redis_port'] = '6379'
      external_url 'http://gitlab.my-host.com:30080'
      gitlab_rails['gitlab_shell_ssh_port'] = 30022
  ports:
    # both ports must match the port from external_url above
    - "30080:30080"
    # the mapped port must match ssh_port specified above.
    - "30022:22"
  # the following are hints on what volumes to mount if you want to persist data
  volumes:
    - /data/gitlab/config:/etc/gitlab:rw
    - /data/gitlab/logs:/var/log/gitlab:rw
    - /data/gitlab/data:/var/opt/gitlab:rw

postgresql:
  restart: always
  image: postgres:9.6.2-alpine
  environment:
    - POSTGRES_USER=gitlab
    - POSTGRES_PASSWORD=gitlab
    - POSTGRES_DB=gitlabhq_production
  # the following are hints on what volumes to mount if you want to persist data
  volumes:
    - /data/postgresql:/var/lib/postgresql:rw

redis:
  restart: always
  image: redis:3.0.7-alpine

```

### 5. Encountered problem

#### Problem
When signup is disabled and a user connects for the first time using LDAP, they encounter a 403 error. (cf. [this issue](https://gitlab.com/gitlab-org/gitlab-ce/issues/31294))


#### Workaround solution 1

1. Temporarily enable sign up (in Admin area > Settings (icon) > Sign-up enabled to check)
2. Let all users sign up
3. Disable sign up 

#### Workaround solution 2

1. As an admin, add a new user (with the right email address and username)
2. The user can connect using LDAP directly
