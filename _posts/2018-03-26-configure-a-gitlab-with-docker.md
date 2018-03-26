# Gitlab with docker

## Global Steps

1. Install docker
2. Create a ```docker-compose.yml``` file
3. Launch it
4. If you want LDAP authentication, create another ```docker-compose.yml```

## Detailed Steps

### 1. Installing docker
Just install it with a package manager, such as ```sudo apt install docker```

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

You'll have to replace the value of `hostname`.  
In `environment`, there are all the gitlab configuration variables (and they could also be in another file: `/etc/gitlab/gitlab.rb`): so change each variable values to the right one for you.
For example, `external_url`.

If you don't want to mount volumes and just have it all in the docker container, comment the line with "volumes:" and the ones below.

If you want it, then create the appropriate folders (here: ```mkdir -p /data/gitlab/{config,logs,data}```).
Same for postgresql volumes.
 
### 3. Commands
In order to launch it, just execute ```docker-compose up -d``` in the directory of the ```docker-compose.yml```.

Then, you'll be able to know the progression with ```docker ps -a```


### 4. With LDAP