@echo off
@REM 微信每次打开网页或小程序都会开一个进程还不关掉……

taskkill /f /t /im WeChatAppEx.exe
taskkill /f /t /im WechatBrowser.exe

@REM 但好像kill掉之后还是会自动恢复……即便没打开网页
pause