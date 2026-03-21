jimchen.me

- Blog: [jimchen.me](https://jimchen.me/) (English, Chinese, Russian)
- Profile: [Github](https://github.com/jimchen2), [LinkedIn](https://www.linkedin.com/in/jim-chen-588002255/)
- Social Media: [Telegram](https://t.me/Jimchen4214), [Instagram](https://www.instagram.com/jimchen_1), [WeChat](https://jimchen.me/weixin.jpg), [YouTube](https://www.youtube.com/@jimchen4214), [TikTok](https://www.tiktok.com/@jimchen.me)

![Thin photo](https://pub-0be4bc99725a45ac9b3be7ebcdc45895.r2.dev/portfolio/1.jpeg)

![Fat photo](https://pub-0be4bc99725a45ac9b3be7ebcdc45895.r2.dev/portfolio/2.JPEG)

## Computer Config

### Userscripts

- [video-sites-shortcuts.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/video-sites-shortcuts.user.js)
- [annoying-websites.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/annoying-websites.user.js)
- [youtube-subtitles-only.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/youtube-subtitles-only.user.js)
<!-- - [dual-subtitles.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/dual-subtitles.user.js) -->

### Telegram

- [telegram-bot](https://github.com/jimchen2/telegram-bot)

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
