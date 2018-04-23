@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\polyfill-service" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\polyfill-service" %*
)
