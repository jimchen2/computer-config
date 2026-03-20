# Projects & Builds

### YouTube Dual Subtitles
**Timeline:** Feb 2025  
[Source Code](https://github.com/jimchen2/youtube-dual-subtitles)

### Computer Networking Projects
**Timeline:** Oct 2024  
Computer networking projects.  
Project 2: Distance vector routing  
Project 3: Pox SDN to implement TCP client

### Web Hoarding Attempts
**Timeline:** August 2024 - October 2024  
Web Hoarding Attempts  
[Project Details](https://jimchen.me/a/efabac)  
[Douban Scraping](https://github.com/jimchen2/archived-scripts/tree/master/douban-scraping-main)  
Bulk downloaded videos from YouTube channels. Processed 400 GB (1,360 hours) of content using OpenAI Whisper, Helsinki NLP, and ffmpeg to embed subtitles on Vast AI, then uploaded to S3. Scraped Douban discussions for 170k comments into a searchable site.

### Markdown Doc Management
**Timeline:** June 2024 - August 2024  
A simple, clean note-taking and markdown converting tool built with NextJS, featuring a backend with MongoDB & S3 Bucket for media storage. Web-based with PWA support for mobile.  

[Source Code](https://github.com/jimchen2/markdown-parser)

### Next.js Apps
**Timeline:** June 2024 - July 2024  
Applications with Docker containerization and Progressive Web App (PWA):  

* [Link Tree](https://github.com/jimchen2/linktree) - Personal link platform featuring dynamic image backgrounds
* [Task Manager](https://github.com/jimchen2/task-manager-nextjs) - A personal task management system powered by MongoDB with backups every 30 minutes
* [LLM Frontend with Amazon Bedrock](https://github.com/jimchen2/vercel-bedrock) - A simple interface with Vercel AI for Amazon's Bedrock's LLM Models
* [S3 Public Frontend](https://github.com/jimchen2/s3-public-index) - A frontend for AWS S3 management

### Docker self-hosting on AWS
**Timeline:** May 2024 - September 2024  
I set up around 20 open source self hosting services on AWS EC2 node with docker through the subdomains of jimchen.me. I used Nginx for certificates. I used Lambda for monitoring. Services include Fediverse (Mastodon, Matrix, PeerTube), LLM frontends (LobeChat, NextChat), Gitea, Database (Postgres, MongoDB), Data Management (Metabase, NocoDB), and my own Next.js apps.  

[Source Code](https://github.com/jimchen2/cloud-setup)

### AnonyTube
**Timeline:** March 2024  
A sharing platform including automatic subtitle generation using Faster Whisper and video translation capabilities (English/Chinese) powered by nllb-200 with secure Argon2 password hashing. It support processing different quality levels in the background, integrated dark theme, and one-click signup process.  

[Source Code](https://github.com/jimchen2/AnonyTube) | [Building a Full Stack Video Platform](https://jimchen.me/a/3638d8)

### Reinforcement Learning in Openai Gym
**Timeline:** Sep 2023 - Dec 2023  
Berkeley CS 285 course featuring 5 projects implementing different RL algorithms (model based and model free) to play different games (Cartpole, Humanoid, HalfCheetah, Pacman) in Openai Gym, including Imitation Learning, Policy Gradients, Actor-Critic and Q Learning, Model Based RL, and Offline RL.  

[Source Code](https://github.com/jimchen2/cs285-reinforcement-learning) | [Policy Gradients](https://jimchen.me/a/b1574a) | [Q Learning and SAC](https://jimchen.me/a/154058) | [Offline RL](https://jimchen.me/a/c29987)

### ML-based Cleaning Bot
**Timeline:** Oct 2023 - Dec 2023  
The EE149 project is developing an ML-Based Trash Collector Bot, an autonomous robot that uses a YOLO v5 neural network and a Raspberry Pi for real-time trash detection and collection. This bot can do line following, accurate trash identification, and efficient operation of a robot arm for trash pickup. My role is to finetune Yolo network and implement python feedback code to work with the bot.  

[Source Code](https://github.com/jimchen2/EECS-149-Final-Project)

### AI Pacman
**Timeline:** June 2023 - Aug 2023  
CS188 Projects, including Search, Multiagent Search, RL, Bayes Nets and HMMs, and Machine Learning.

### Secure File Sharing System
**Timeline:** July 2023  
File-system with Golang focusing on security, privacy, and efficiency (like Dropbox). Using cryptographic methods to secure user data by encrypting it with keys derived from username and password. Functions include user storing, retrieving, appending files, sharing and revoking invitations.  

[End to End Secure File Sharing System](https://jimchen.me/a/418191)

### My Website
**Timeline:** June 2023  
React-based front end, Express.js and MongoDB backend, featuring a blog, user comments section, with backend efficiently handling data storage for posts, comments.  
[MERN Stack Conclusion](http://jimchen.me/a/3f773b)  
[Moving My Website to Next.js](http://jimchen.me/a/bf98b2)  

[Old React Version](https://github.com/jimchen2/old-website-react) | [Current Next.js Version](https://github.com/jimchen2/jimchen.me)

### 2048 Game
**Timeline:** June 2023  
Game for practicing CSS, Javascript skills  

[Source Code](https://github.com/jimchen2/archived-scripts/tree/master/2048)

### C Language Generals.io Game
**Timeline:** Nov 2021  
[Source Code](https://github.com/jimchen2/archived-scripts/tree/master/202111-generals.io) | [Project Details](https://jimchen.me/a/940e56)

## Userscripts

- [video-sites-shortcuts.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/video-sites-shortcuts.user.js) 
- [annoying-websites.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/annoying-websites.user.js)
- [youtube-subtitles-only.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/youtube-subtitles-only.user.js)
<!-- - [dual-subtitles.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/dual-subtitles.user.js) -->

## ibus

```
rm -rf ~/.local/share/ibus-typing-booster/
rm -rf ~/.cache/ibus/libpinyin/
ibus reset-config
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin remember-every-input false
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin dynamic-adjust false
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin clear-user-data true
ibus restart
```
