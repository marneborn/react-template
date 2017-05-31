@echo off

echo "Starting jobs that should run forever"

set cmd="%CONSOLEZ%" -c scripts\consoleZ\bg.xml

REM add a mongoDB tab unless mongo's already running.

REM simply add all of these tabs
set cmd=%cmd% -t server
set cmd=%cmd% -t build
set cmd=%cmd% -t webTests

echo Running: %cmd%
%cmd%

exit

:setsize
set size=%~z1
goto :eof
