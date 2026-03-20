jimchen.me

- Blog: [jimchen.me](https://jimchen.me/) (English, Chinese, Russian)
- Profile: [Github](https://github.com/jimchen2), [LinkedIn](https://www.linkedin.com/in/jim-chen-588002255/)
- Social Media: [Telegram](https://t.me/Jimchen4214), [Instagaram](https://www.instagram.com/jimchen_1), [WeChat](https://jimchen.me/weixin.jpg), [YouTube](https://www.youtube.com/@jimchen4214), [TikTok](https://www.tiktok.com/@jimchen.me)

---

## Education

- **Bachelor of Engineering, Computer Science** — University of Science and Technology of China _(2021.9–2026.6)_
- **Visiting Student, Computer Science** — University of California, Berkeley _(2023.1-2023.12)_

---

## Projects and Blogs

### Web Hoarding Attempts

**Timeline:** August 2024 - October 2024  
Web Hoarding Attempts  
[Blog](https://jimchen.me/a/efabac)  
[Douban Scraping](https://github.com/jimchen2/archived-scripts/tree/master/douban-scraping-main)  
Bulk downloaded videos from YouTube channels. Processed 400 GB (1,360 hours) of content using OpenAI Whisper, Helsinki NLP, and ffmpeg to embed subtitles on Vast AI, then uploaded to S3. 


- 



### Markdown Doc Management

**Timeline:** June 2024 - August 2024  
A simple, clean note-taking and markdown converting tool built with NextJS, featuring a backend with MongoDB & S3 Bucket for media storage. Web-based with PWA support for mobile.

[Source Code](https://github.com/jimchen2/markdown-parser)

### Next.js Apps

**Timeline:** June 2024 - July 2024  
Applications with Docker containerization and Progressive Web App (PWA):

- [Link Tree](https://github.com/jimchen2/linktree) - Personal link platform featuring dynamic image backgrounds
- [Task Manager](https://github.com/jimchen2/task-manager-nextjs) - A personal task management system powered by MongoDB with backups every 30 minutes
- [LLM Frontend with Amazon Bedrock](https://github.com/jimchen2/vercel-bedrock) - A simple interface with Vercel AI for Amazon's Bedrock's LLM Models
- [S3 Public Frontend](https://github.com/jimchen2/s3-public-index) - A frontend for AWS S3 management

### Docker self-hosting on AWS

**Timeline:** May 2024 - September 2024  
I set up around 20 open source self hosting services on AWS EC2 node with docker through the subdomains of jimchen.me. I used Nginx for certificates. I used Lambda for monitoring. Services include Fediverse (Mastodon, Matrix, PeerTube), LLM frontends (LobeChat, NextChat), Gitea, Database (Postgres, MongoDB), Data Management (Metabase, NocoDB), and my own Next.js apps.

[Source Code](https://github.com/jimchen2/cloud-setup)

### Reinforcement Learning in Openai Gym

**Timeline:** Sep 2023 - Dec 2023  
Berkeley CS 285 course featuring 5 projects implementing different RL algorithms (model based and model free) to play different games (Cartpole, Humanoid, HalfCheetah, Pacman) in Openai Gym, including Imitation Learning, Policy Gradients, Actor-Critic and Q Learning, Model Based RL, and Offline RL.

[Source Code](https://github.com/jimchen2/cs285-reinforcement-learning) | [Policy Gradients](https://jimchen.me/a/b1574a) | [Q Learning and SAC](https://jimchen.me/a/154058) | [Offline RL](https://jimchen.me/a/c29987)

### ML-based Cleaning Bot

**Timeline:** Oct 2023 - Dec 2023  
The EE149 project is developing an ML-Based Trash Collector Bot, an autonomous robot that uses a YOLO v5 neural network and a Raspberry Pi for real-time trash detection and collection. This bot can do line following, accurate trash identification, and efficient operation of a robot arm for trash pickup. My role is to finetune Yolo network and implement python feedback code to work with the bot.

[Source Code](https://github.com/jimchen2/EECS-149-Final-Project)



### 2025

- **YouTube Dual Subtitles**: Chrome extension for language learning. | [Extension](https://chromewebstore.google.com/detail/youtube-dual-subtitles/kicgaahncmjpbgokkckmgglblgpjokmb) | [Source Code](https://github.com/jimchen2/youtube-dual-subtitles) _(2025.2)_

### 2024

- **Computer Networking Projects**: Self-study CS168, Distance vector routing, Pox SDN to implement TCP client. _(2024.10)_
- **Moving My Website to Next.js** | [Source Code](https://github.com/jimchen2/jimchen.me)| [Blog](http://jimchen.me/a/bf98b2)
- **AnonyTube**: Online multi-user video platform including automatic subtitle generation using Fast Whisper and nllb-200 with Argon2 password hashing | [Source Code](https://github.com/jimchen2/AnonyTube) | [Blog](https://jimchen.me/a/3638d8) _(2024.3)_

### 2023

- **End to End Secure File Sharing System**: CS161 project, secure filesystem for user storing, retrieving, appending files, sharing and revoking invitations with Golang | [Blog](https://jimchen.me/a/418191) _(2023.7)_
- **My Old Website**: React-based front end, Node.js and MongoDB backend (MERN stack) featuring a blog and user comments section |
  [Source Code](https://github.com/jimchen2/old-website-react) | [Blog](http://jimchen.me/a/3f773b) _(2023.6)_
- **2048 Game**: Game for practicing CSS, Javascript skills | [Source Code](https://github.com/jimchen2/archived-scripts/tree/master/2048) _(2023.6)_

### Before 2023

- **Generals.io Game**: GUI game in C | [Source Code](https://github.com/jimchen2/archived-scripts/tree/master/202111-generals.io) | [Blog](https://jimchen.me/a/940e56) _(2021.11)_

## Computer Config

### Userscripts

- [video-sites-shortcuts.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/video-sites-shortcuts.user.js)
- [annoying-websites.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/annoying-websites.user.js)
- [youtube-subtitles-only.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/youtube-subtitles-only.user.js)
<!-- - [dual-subtitles.user.js](https://github.com/jimchen2/jimchen2/raw/refs/heads/main/userscripts/dual-subtitles.user.js) -->

### ibus

```
rm -rf ~/.local/share/ibus-typing-booster/
rm -rf ~/.cache/ibus/libpinyin/
ibus reset-config
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin remember-every-input false
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin dynamic-adjust false
gsettings set com.github.libpinyin.ibus-libpinyin.libpinyin clear-user-data true
ibus restart
```
