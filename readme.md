GENERATE PDF PREVIEWS:
top portion of page:
$ convert -density 150 'pdfs/3091-final-exam-cheat-sheet.pdf[0]' -quality 90 -gravity north -crop 100%x50%+0+0 pdf-previews/3091-final-exam-cheat-sheet-preview.png

START SERVER IN TERMINAL:
python -m http.server 8000
-> server will be on http://localhost:8000/

[python3 -m http.server 8000](http://127.0.0.1:55795/notes.html)
