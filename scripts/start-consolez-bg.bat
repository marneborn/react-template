@echo off

echo "Starting jobs that should run forever"

set cmd="%CONSOLEZ%" -c scripts\consoleZ\bg.xml

REM Make sure we know where various tools live.
IF NOT DEFINED CONSOLEZ (
   set CONSOLEZ=C:\Users\Mikael\Programming\Tools\ConsoleZ\Console.exe
)
IF NOT DEFINED PYCMDEXE (
   setx PYCMDEXE %USERPROFILE%\Programming\Tools\PyCmd\PyCmd.exe
)
IF NOT DEFINED GRUNTCMD (
   setx GRUNTCMD %USERPROFILE%\AppData\Roaming\npm\grunt.cmd
)

REM Make sure %MONGODB% is set
IF NOT DEFINED MONGODB ( 
    setx MONGODB=%USERPROFILE%\Programming\mongoDBs\common
)

IF NOT EXIST %MONGODB% (
  echo This mongodb doesn't exist: %MONGODB%
  GOTO END
)

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
