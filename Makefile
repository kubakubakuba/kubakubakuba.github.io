default:
	hugo -t hugo-theme-shell

server:
	hugo server -t hugo-theme-shell --buildDrafts --watch