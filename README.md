## Computer Config

### Userscripts

- [video-sites-shortcuts.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/video-sites-shortcuts.user.js)
- [annoying-websites.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/annoying-websites.user.js)
- [old-reddit.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/old-reddit.user.js)
<!-- - [dual-subtitles.user.js](https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/dual-subtitles.user.js) -->

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
