@echo off
D: && cd D:\Gits\FishCode\Web\vue\HashPW\dist



@REM start "live" /min cmd /c "live-server --no-browser --port=2333"

@REM 管理员运行来开放防火墙端口
@REM netsh advfirewall firewall add rule name="allowPort1" dir=in action=allow protocol=UDP localport=2333

@REM lt --port 2333 -subdomain=fisher -o