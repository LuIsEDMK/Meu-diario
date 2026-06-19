Set WshShell = CreateObject("WScript.Shell")
Dim appPath
appPath = Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\"))
WshShell.CurrentDirectory = appPath
WshShell.Run "npx electron .", 0, False
Set WshShell = Nothing
